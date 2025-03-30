import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	Filler,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaHotel, FaMoneyBillWave } from 'react-icons/fa';
import { analyzeRevenueSystem } from '@/pages/api/booking/analyzeRevenueSystem';
import AdminLayout from './layout';

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	Filler
);

const Admin = () => {
	const { isAuthenticated, dataProfile } = useAuth();
	const [isClient, setIsClient] = useState(false);

	// Fetch revenue data
	const {
		data: revenueData,
		isLoading: isLoadingRevenue,
		isError: isErrorRevenue,
		error: revenueError,
	} = useQuery({
		queryKey: ['systemRevenue'],
		queryFn: analyzeRevenueSystem,
		enabled: isClient && isAuthenticated,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setIsClient(true);
		if (!isAuthenticated) {
			window.location.href = '/auth/login';
		}
	}, [isAuthenticated]);

	if (!isClient || !isAuthenticated) {
		return null;
	}

	// Process the API response data - handle both array and single object formats
	const processApiData = (apiResponse) => {
		if (!apiResponse) return null;

		// Create array from response - handle different response formats
		let homestays = [];
		if (Array.isArray(apiResponse)) {
			homestays = apiResponse;
		} else if (apiResponse.json && Array.isArray(apiResponse.json)) {
			homestays = apiResponse.json;
		} else {
			// Handling single object case
			homestays = [apiResponse];
		}

		// Calculate total revenue across all homestays
		const totalSystemRevenue = homestays.reduce((sum, homestay) => sum + homestay.totalRevenue, 0);

		return {
			totalRevenue: totalSystemRevenue,
			totalHomestays: homestays.length,
			homestays: homestays,
		};
	};

	// Prepare the chart data based on the processed API response
	const prepareHomestayRevenueData = (processedData) => {
		if (!processedData || !processedData.homestays) return null;

		const baseColors = [
			'rgba(255, 99, 132, 0.7)',
			'rgba(54, 162, 235, 0.7)',
			'rgba(255, 206, 86, 0.7)',
			'rgba(75, 192, 192, 0.7)',
			'rgba(153, 102, 255, 0.7)',
			'rgba(255, 159, 64, 0.7)',
		];

		const borderColors = [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)',
		];

		return {
			labels: processedData.homestays.map((homestay) => homestay.homeStayName),
			datasets: [
				{
					label: 'Revenue',
					data: processedData.homestays.map((homestay) => homestay.totalRevenue),
					backgroundColor: baseColors.slice(0, processedData.homestays.length),
					borderColor: borderColors.slice(0, processedData.homestays.length),
					borderWidth: 1,
					borderRadius: 4,
					maxBarThickness: 60,
					hoverOffset: 10,
				},
			],
		};
	};

	// Process the data from the API response
	const processedData = revenueData ? processApiData(revenueData) : null;

	// Prepare chart data
	const homestayRevenueData = processedData ? prepareHomestayRevenueData(processedData) : null;

	return (
		<AdminLayout>
			<div className='p-6'>
				<div className='flex flex-col mb-6 md:flex-row md:justify-between md:items-center'>
					<div className='mb-4 md:mb-0'>
						<h1 className='text-xl font-bold text-gray-800 md:text-2xl'>Homestay Revenue Dashboard</h1>
						<p className='text-sm text-gray-600 md:text-base'>Welcome back, {dataProfile?.fullName}</p>
					</div>
					<div className='px-3 py-2 text-sm bg-white border border-gray-100 rounded-lg shadow-sm'>
						<span className='text-gray-500'>Today's Date:</span>
						<span className='ml-2 font-medium'>{new Date().toLocaleDateString()}</span>
					</div>
				</div>

				{isLoadingRevenue ? (
					<div className='flex items-center justify-center h-64'>
						<div className='flex flex-col items-center animate-pulse'>
							<div className='w-12 h-12 mb-2 bg-blue-200 rounded-full'></div>
							<div className='w-32 h-4 bg-blue-100 rounded'></div>
						</div>
					</div>
				) : isErrorRevenue ? (
					<div className='p-4 mb-4 border-l-4 border-red-500 rounded bg-red-50'>
						<div className='flex'>
							<div className='flex-shrink-0'>
								<svg className='w-5 h-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<div className='ml-3'>
								<p className='text-sm text-red-700'>
									Error loading revenue data: {revenueError?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : processedData ? (
					<>
						{/* Summary Cards */}
						<div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:gap-6'>
							<div className='p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl md:p-6 hover:shadow-md'>
								<div className='flex items-center'>
									<div className='p-2 text-blue-500 rounded-full md:p-3 bg-blue-50'>
										<FaMoneyBillWave className='w-5 h-5 md:w-6 md:h-6' />
									</div>
									<div className='ml-3 md:ml-4'>
										<p className='text-xs font-medium text-gray-500 md:text-sm'>Total Revenue</p>
										<p className='text-lg font-bold text-gray-800 md:text-xl'>
											{processedData.totalRevenue.toLocaleString()} VND
										</p>
									</div>
								</div>
								<div className='flex items-center mt-3 text-xs text-gray-400 md:mt-4'>
									<span>
										From {processedData.totalHomestays} homestay
										{processedData.totalHomestays > 1 ? 's' : ''}
									</span>
								</div>
							</div>

							<div className='p-4 transition-all bg-white border border-gray-100 shadow-sm rounded-xl md:p-6 hover:shadow-md'>
								<div className='flex items-center'>
									<div className='p-2 rounded-full md:p-3 bg-amber-50 text-amber-500'>
										<FaHotel className='w-5 h-5 md:w-6 md:h-6' />
									</div>
									<div className='ml-3 md:ml-4'>
										<p className='text-xs font-medium text-gray-500 md:text-sm'>Active Homestays</p>
										<p className='text-lg font-bold text-gray-800 md:text-xl'>
											{processedData.totalHomestays}
										</p>
									</div>
								</div>
								<div className='flex items-center mt-3 md:mt-4'>
									<div className='flex-1 h-1 overflow-hidden bg-gray-100 rounded-full'>
										<div className='h-1 rounded-full bg-amber-500' style={{ width: '100%' }}></div>
									</div>
									<span className='ml-2 text-xs text-gray-400'>All active</span>
								</div>
							</div>
						</div>

						{/* Revenue Chart */}
						{homestayRevenueData && processedData.homestays.length > 0 && (
							<div className='mb-6'>
								<div className='p-4 bg-white border border-gray-100 shadow-sm md:p-6 rounded-xl'>
									<h3 className='mb-4 text-base font-medium text-gray-800 md:text-lg'>
										Revenue by Homestay
									</h3>
									<div className='h-60 md:h-80'>
										<Bar
											data={homestayRevenueData}
											options={{
												responsive: true,
												maintainAspectRatio: false,
												indexAxis: 'x',
												plugins: {
													legend: {
														display: false,
													},
													tooltip: {
														backgroundColor: 'rgba(17, 24, 39, 0.9)',
														callbacks: {
															label: function (context) {
																return `Revenue: ${context.parsed.y.toLocaleString()} VND`;
															},
														},
													},
												},
												scales: {
													y: {
														beginAtZero: true,
														grid: {
															display: true,
															color: 'rgba(156, 163, 175, 0.1)',
														},
														ticks: {
															callback: function (value) {
																return value.toLocaleString() + 'VND';
															},
														},
													},
													x: {
														grid: {
															display: false,
														},
														ticks: {
															maxRotation: 45,
															minRotation: 45,
														},
													},
												},
											}}
										/>
									</div>
								</div>
							</div>
						)}

						{/* Homestay Cards */}
						<div className='mt-6 md:mt-10'>
							<h3 className='mb-4 text-base font-medium text-gray-800 md:text-lg md:mb-6'>
								Homestay Details
							</h3>
							<div className='grid grid-cols-1 gap-4 md:gap-6'>
								{processedData.homestays.map((homestay) => (
									<div
										key={homestay.homeStayID}
										className='flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl sm:flex-row'
									>
										<div className='relative h-48 sm:h-auto sm:w-1/3'>
											<img
												src={homestay.mainImage}
												alt={homestay.homeStayName}
												className='object-cover w-full h-full'
											/>
										</div>
										<div className='flex-1 p-4 md:p-6'>
											<h4 className='mb-2 text-base font-semibold text-gray-800 md:text-lg'>
												{homestay.homeStayName}
											</h4>
											<p className='mb-4 text-xs text-gray-600 md:text-sm'>
												{homestay.address.replace('\n', ', ')}
											</p>
											<div className='pt-3 mt-auto border-t border-gray-100 md:pt-4'>
												<div className='flex items-center'>
													<span className='text-xs text-gray-500 md:text-sm'>
														Total Revenue:
													</span>
													<span className='ml-auto font-semibold text-blue-600'>
														{homestay.totalRevenue.toLocaleString()} VND
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<div className='p-6 text-center bg-white shadow md:p-8 rounded-xl'>
						<div className='inline-block p-3 mb-4 bg-gray-100 rounded-full md:p-4'>
							<svg
								className='w-6 h-6 text-gray-400 md:h-8 md:w-8'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h3 className='mb-2 text-base font-medium text-gray-800 md:text-lg'>
							No Revenue Data Available
						</h3>
						<p className='text-sm text-gray-500 md:text-base'>
							We couldn't find any revenue data to display. This could be because your system is new or
							there haven't been any bookings yet.
						</p>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default Admin
