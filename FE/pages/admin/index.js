import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import AdminLayout from './layout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getAllHomeStay } from '@/pages/api/homestay/getAllHomeStay';
import dynamic from 'next/dynamic';
import { Input } from '@/components/components/ui/input';
import { Checkbox } from '@/components/components/ui/checkbox';
import { Button } from '@/components/components/ui/button';
import { Label } from '@/components/components/ui/label';
import { Badge } from '@/components/components/ui/badge';
import { getAllAmenity } from '@/pages/api/amenity/getAmenity';
import { getHomeStayRevenueStatistics } from '@/pages/api/booking/getHomeStayRevenueStatistics ';

const DynamicChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });

if (typeof window !== 'undefined') {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
}

const Admin = () => {
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
	} = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
		enabled: mounted && isAuthenticated,
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
				data: revenueData
					? [
							revenueData.january || 0,
							revenueData.february || 0,
							revenueData.march || 0,
							revenueData.april || 0,
							revenueData.may || 0,
							revenueData.june || 0,
							revenueData.july || 0,
							revenueData.august || 0,
							revenueData.september || 0,
							revenueData.october || 0,
							revenueData.november || 0,
							revenueData.december || 0,
					  ]
					: Array(12).fill(0),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
						return '$' + value.toLocaleString();
					},
				},
			},
		},
	};

	const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

	return (
		<AdminLayout>
			<div className='p-4'>
				<h1 className='text-2xl font-bold mb-6'>Welcome, {dataProfile?.fullName}</h1>

				<div className='grid grid-cols-1 gap-6 mb-6'>
					<Card>
						<CardHeader>
							<CardTitle>Filter Homestays</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-5'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<div>
										<h3 className='text-sm font-medium mb-2'>Price Range</h3>
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
										<h3 className='text-sm font-medium mb-2'>Standard</h3>
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
									<h3 className='text-sm font-medium mb-2'>Amenities</h3>
									{loadingAmenity ? (
										<div className='py-2 text-sm'>Loading amenities...</div>
									) : errorAmenity ? (
										<div className='text-red-500 py-2 text-sm'>Error loading amenities</div>
									) : (
										<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
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
										<h3 className='text-sm font-medium mb-2'>Active Filters</h3>
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
									<label className='block text-sm font-medium mb-1'>Select Homestay</label>
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
									<label className='block text-sm font-medium mb-1'>Select Year</label>
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
								<div className='flex justify-center items-center h-80'>
									<div className='w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin'></div>
								</div>
							) : isLoading ? (
								<div className='flex justify-center items-center h-80'>
									<div className='w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin'></div>
								</div>
							) : homestays.length === 0 ? (
								<div className='flex justify-center items-center h-80 text-gray-500'>
									No homestays available to display revenue statistics
								</div>
							) : revenueError ? (
								<div className='flex justify-center items-center h-80 text-red-500'>
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
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Total Revenue</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									${revenueData.totalRevenue?.toLocaleString() || 0}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Highest Month</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{revenueData.highestMonth || 'N/A'}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Average Monthly</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									$
									{(revenueData.totalRevenue / 12)?.toLocaleString(undefined, {
										maximumFractionDigits: 2,
									}) || 0}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<div className='text-sm font-medium text-gray-500'>Total Bookings</div>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{revenueData.totalBookings || 0}</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default Admin;
