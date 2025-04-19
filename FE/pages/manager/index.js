import React, { useEffect, useState } from 'react';
import ManagerLayout from './layout';
import { useAuth } from 'context/AuthProvider';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Input } from '@/components/components/ui/input';
import { Checkbox } from '@/components/components/ui/checkbox';
import { Button } from '@/components/components/ui/button';
import { Label } from '@/components/components/ui/label';
import { Badge } from '@/components/components/ui/badge';
import { getAllAmenity } from 'pages/api/amenity/getAmenity';
import { getHomeStayRevenueStatistics } from 'pages/api/booking/getHomeStayRevenueStatistics ';
import { getHomeStayByUser } from 'pages/api/booking/bookingByUser';

const DynamicChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });

if (typeof window !== 'undefined') {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
}

const Manager = () => {
	const { isAuthenticated, dataProfile } = useAuth();
	const [homestayId, setHomestayId] = useState('');
	const [homestays, setHomestays] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear());
	const [mounted, setMounted] = useState(false);

	const [filters, setFilters] = useState({
		amenityNames: [],
		minPrice: 0,
		maxPrice: 5000000,
		standard: [],
	});

	const {
		data: DataAmenity,
		isLoading: loadingAmenity,
		error: errorAmenity,
	} = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
		enabled: mounted,
	});

	const availableAmenities = DataAmenity?.map((amenity) => amenity.name) || [];

	const standardOptions = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		data: DataHomeStay,
		isLoading: loadingHomeStay,
		refetch: refetchHomeStays,
		error: homeStayError,
	} = useQuery({
		queryKey: ['homeStaysByUser', dataProfile?.id],
		queryFn: () => getHomeStayByUser(dataProfile?.id),
		enabled: mounted && isAuthenticated && !!dataProfile?.id,
	});

	useEffect(() => {
		if (DataHomeStay && DataHomeStay.length > 0) {
			const formattedHomestays = DataHomeStay.map((homestay) => ({
				id: homestay.homeStayId || homestay.id,
				name: homestay.name || homestay.title || 'Unnamed Homestay',
			}));

			setHomestays(formattedHomestays);

			if (!homestayId && formattedHomestays.length > 0) {
				setHomestayId(formattedHomestays[0].id);
			}
		}
	}, [DataHomeStay, homestayId]);

	const {
		data: revenueData,
		isLoading: isLoadingRevenue,
		error: revenueError,
	} = useQuery({
		queryKey: ['revenueStatistics', homestayId, year],
		queryFn: () => getHomeStayRevenueStatistics(homestayId, year),
		enabled: mounted && isAuthenticated && !!homestayId,
	});

	const isLoading = loadingHomeStay || isLoadingRevenue;

	const handleAmenityChange = (amenity) => {
		setFilters((prev) => {
			const newAmenities = prev.amenityNames.includes(amenity)
				? prev.amenityNames.filter((a) => a !== amenity)
				: [...prev.amenityNames, amenity];

			return { ...prev, amenityNames: newAmenities };
		});
	};

	const handleStandardChange = (standard) => {
		setFilters((prev) => {
			const newStandards = prev.standard.includes(standard)
				? prev.standard.filter((s) => s !== standard)
				: [...prev.standard, standard];

			return { ...prev, standard: newStandards };
		});
	};

	const handleResetFilters = () => {
		setFilters({
			amenityNames: [],
			minPrice: 0,
			maxPrice: 5000000,
			standard: [],
		});
	};

	const applyFilters = () => {
		refetchHomeStays();
	};

	const chartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Revenue',
				data: revenueData ? revenueData.map((item) => item.revenue) : Array(12).fill(0),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	// Optional: Add a second dataset for bookings if you want to display that as well
	const chartDataWithBookings = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Revenue',
				data: revenueData ? revenueData.map((item) => item.revenue) : Array(12).fill(0),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
			{
				label: 'Bookings',
				data: revenueData ? revenueData.map((item) => item.booking) : Array(12).fill(0),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				// Use a secondary y-axis for bookings if needed
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: `Monthly Revenue for ${year}`,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return 'VND' + value.toLocaleString();
					},
				},
			},
		},
	};

	// Calculate summary statistics for revenue data if available
	const totalRevenue = revenueData ? revenueData.reduce((sum, item) => sum + item.revenue, 0) : 0;
	const totalBookings = revenueData ? revenueData.reduce((sum, item) => sum + item.booking, 0) : 0;
	const highestMonth = revenueData
		? revenueData.reduce((highest, item) => (item.revenue > (highest?.revenue || 0) ? item : highest), null)?.month
		: 'N/A';
	const averageMonthly = revenueData ? totalRevenue / 12 : 0;

	const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

	return (
		<ManagerLayout>
			<div className='p-4'>
				<h1 className='mb-6 text-2xl font-bold'>Welcome, {dataProfile?.fullName}</h1>

				<div className='grid grid-cols-1 gap-6 mb-6'>
					<Card>
						<CardHeader>
							<CardTitle>Filter Homestays</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-5'>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<div>
										<h3 className='mb-2 text-sm font-medium'>Price Range</h3>
										<div className='flex items-center space-x-2'>
											<Input
												type='number'
												placeholder='Min'
												value={filters.minPrice}
												onChange={(e) =>
													setFilters((prev) => ({
														...prev,
														minPrice: Number(e.target.value),
													}))
												}
												className='w-full'
												min={0}
											/>
											<span>to</span>
											<Input
												type='number'
												placeholder='Max'
												value={filters.maxPrice}
												onChange={(e) =>
													setFilters((prev) => ({
														...prev,
														maxPrice: Number(e.target.value),
													}))
												}
												className='w-full'
												min={0}
											/>
										</div>
									</div>

									<div>
										<h3 className='mb-2 text-sm font-medium'>Standard</h3>
										<div className='flex flex-wrap gap-2'>
											{standardOptions.map((standard) => (
												<div key={standard} className='flex items-center space-x-2'>
													<Checkbox
														id={`standard-${standard}`}
														checked={filters.standard.includes(standard)}
														onCheckedChange={() => handleStandardChange(standard)}
													/>
													<Label htmlFor={`standard-${standard}`} className='text-sm'>
														{standard}
													</Label>
												</div>
											))}
										</div>
									</div>

									<div className='flex items-end justify-end space-x-2'>
										<Button variant='outline' onClick={handleResetFilters} size='sm'>
											Reset
										</Button>
										<Button onClick={applyFilters} size='sm'>
											Apply Filters
										</Button>
									</div>
								</div>

								<div>
									<h3 className='mb-2 text-sm font-medium'>Amenities</h3>
									{loadingAmenity ? (
										<div className='py-2 text-sm'>Loading amenities...</div>
									) : errorAmenity ? (
										<div className='py-2 text-sm text-red-500'>Error loading amenities</div>
									) : (
										<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
											{availableAmenities.map((amenity) => (
												<div key={amenity} className='flex items-center space-x-2'>
													<Checkbox
														id={`amenity-${amenity}`}
														checked={filters.amenityNames.includes(amenity)}
														onCheckedChange={() => handleAmenityChange(amenity)}
													/>
													<Label htmlFor={`amenity-${amenity}`} className='text-sm'>
														{amenity}
													</Label>
												</div>
											))}
										</div>
									)}
								</div>

								{(filters.amenityNames.length > 0 ||
									filters.standard.length > 0 ||
									filters.minPrice > 0 ||
									filters.maxPrice < 5000000) && (
									<div>
										<h3 className='mb-2 text-sm font-medium'>Active Filters</h3>
										<div className='flex flex-wrap gap-2'>
											{filters.minPrice > 0 && (
												<Badge variant='outline'>Min Price: ${filters.minPrice}</Badge>
											)}
											{filters.maxPrice < 5000000 && (
												<Badge variant='outline'>Max Price: ${filters.maxPrice}</Badge>
											)}
											{filters.amenityNames.map((amenity) => (
												<Badge key={amenity} variant='outline'>
													{amenity}
												</Badge>
											))}
											{filters.standard.map((standard) => (
												<Badge key={standard} variant='outline'>
													{standard}
												</Badge>
											))}
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-col gap-3'>
							<CardTitle>Homestay Revenue Statistics</CardTitle>
							<div className='flex flex-wrap gap-4'>
								<div className='min-w-[200px]'>
									<label className='block mb-1 text-sm font-medium'>Select Homestay</label>
									<Select
										value={homestayId}
										onValueChange={setHomestayId}
										disabled={!mounted || loadingHomeStay || homestays.length === 0}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select a homestay' />
										</SelectTrigger>
										<SelectContent>
											{loadingHomeStay ? (
												<SelectItem value='loading' disabled>
													Loading homestays...
												</SelectItem>
											) : homestays.length === 0 ? (
												<SelectItem value='none' disabled>
													No homestays available
												</SelectItem>
											) : (
												homestays.map((homestay) => (
													<SelectItem key={homestay.id} value={homestay.id}>
														{homestay.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
								</div>
								<div className='min-w-[120px]'>
									<label className='block mb-1 text-sm font-medium'>Select Year</label>
									<Select
										value={year.toString()}
										onValueChange={(value) => setYear(parseInt(value))}
										disabled={!mounted}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select year' />
										</SelectTrigger>
										<SelectContent>
											{years.map((year) => (
												<SelectItem key={year} value={year.toString()}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							{!mounted ? (
								<div className='flex items-center justify-center h-80'>
									<div className='w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin'></div>
								</div>
							) : isLoading ? (
								<div className='flex items-center justify-center h-80'>
									<div className='w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin'></div>
								</div>
							) : homestays.length === 0 ? (
								<div className='flex items-center justify-center text-gray-500 h-80'>
									No homestays available to display revenue statistics
								</div>
							) : revenueError ? (
								<div className='flex items-center justify-center text-red-500 h-80'>
									Error loading revenue data: {revenueError.message}
								</div>
							) : (
								<div className='h-80'>
									{mounted && <DynamicChart data={chartData} options={chartOptions} />}
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{mounted && revenueData && (
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Total Revenue</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{totalRevenue.toLocaleString() || 0}VND</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Highest Month</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{highestMonth}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Average Monthly</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{averageMonthly.toLocaleString(undefined, {
										maximumFractionDigits: 2,
									}) || 0}VND
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Total Bookings</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{totalBookings || 0}</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</ManagerLayout>
	);
};

export default Manager;
