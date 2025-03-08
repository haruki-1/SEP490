'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { searchHomeStayByCity } from '../api/city/searchHomeStayByCity';
import MainLayout from '../layout';

export default function SearchList() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [error, setError] = useState(null);

	// Get search parameters from URL
	const city = searchParams.get('city');
	const fromDate = searchParams.get('from') ? new Date(searchParams.get('from')) : null;
	const toDate = searchParams.get('to') ? new Date(searchParams.get('to')) : null;

	// Function to get price for today based on calendar data
	const getPriceForToday = (calendar) => {
		// Current date in ISO format (YYYY-MM-DD)
		const currentDate = new Date().toISOString().slice(0, 10);

		// If no calendar array or empty, return null (Decommission)
		if (!calendar || calendar.length === 0) return null;

		// Find today's price entry
		const todayPrice = calendar.find((item) => item.date.slice(0, 10) === currentDate);

		// If there's no calendar entry for today, check if all calendar entries are expired
		if (!todayPrice) {
			// Check if all calendar entries are in the past
			const allExpired = calendar.every((item) => {
				const entryDate = new Date(item.date.slice(0, 10));
				const today = new Date(currentDate);
				return entryDate < today;
			});

			// If all entries are expired, return null (Decommission)
			if (allExpired) return null;

			// If there's no entry for today but some future entries exist,
			// find the next valid entry (first future date)
			const futureEntries = calendar
				.filter((item) => {
					const entryDate = new Date(item.date.slice(0, 10));
					const today = new Date(currentDate);
					return entryDate >= today;
				})
				.sort((a, b) => new Date(a.date) - new Date(b.date));

			// Return the price of the next valid date or null if none found
			return futureEntries.length > 0 ? futureEntries[0].price : null;
		}

		// If there's a calendar entry for today, return its price
		return todayPrice.price;
	};

	useEffect(() => {
		// Redirect back to search if no city is provided
		if (!city) {
			router.push('/');
			return;
		}

		// Fetch results
		const fetchResults = async () => {
			setIsLoading(true);
			try {
				const data = await searchHomeStayByCity(city);
				setResults(data);
			} catch (err) {
				console.error('Error fetching search results:', err);
				setError('Failed to fetch homestays. Please try again.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchResults();
	}, [city, router]);

	// Function to go back to search
	const handleBackToSearch = () => {
		router.push('/');
	};

	if (isLoading) {
		return (
			<div className='container mx-auto py-16 px-4'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#006CE4] mx-auto'></div>
					<p className='mt-4 text-lg'>Loading homestays in {city}...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='container mx-auto py-16 px-4'>
				<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
					<p>{error}</p>
					<Button variant='outline' className='mt-4' onClick={handleBackToSearch}>
						Back to Search
					</Button>
				</div>
			</div>
		);
	}

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					{/* Search summary */}
					<div className='bg-white rounded-lg shadow-md p-4 mb-8'>
						<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
							<div className='flex flex-col'>
								<h1 className='text-2xl font-bold'>Search Results</h1>
								<div className='flex items-center mt-2'>
									<MapPin className='h-5 w-5 text-gray-500 mr-2' />
									<span className='font-medium'>{city}</span>

									{fromDate && toDate && (
										<div className='flex items-center ml-4'>
											<CalendarIcon className='h-5 w-5 text-gray-500 mr-2' />
											<span>
												{format(fromDate, 'dd/MM/yyyy')} - {format(toDate, 'dd/MM/yyyy')}
											</span>
										</div>
									)}
								</div>
							</div>
							<Button
								variant='outline'
								className='border-[#006CE4] text-[#006CE4]'
								onClick={handleBackToSearch}
							>
								Modify Search
							</Button>
						</div>
					</div>

					{/* Results count */}
					<div className='mb-6'>
						<p className='text-lg'>{results.length} homestays found</p>
					</div>

					{/* Results list */}
					{results.length === 0 ? (
						<div className='text-center py-16'>
							<h2 className='text-xl font-semibold mb-4'>No homestays found</h2>
							<p className='text-gray-600 mb-6'>Try searching with different criteria</p>
							<Button onClick={handleBackToSearch}>Back to Search</Button>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{results.map((homestay) => {
								// Get today's price using the new function
								const priceForToday = getPriceForToday(homestay.calendar);

								return (
									<div key={homestay.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
										{/* Homestay image */}
										<div className='h-48 bg-gray-200 relative'>
											{homestay.mainImage ? (
												<img
													src={homestay.mainImage}
													alt={homestay.name}
													className='w-full h-full object-cover'
												/>
											) : (
												<div className='flex items-center justify-center h-full bg-gray-100 text-gray-400'>
													No image available
												</div>
											)}
										</div>

										{/* Homestay details */}
										<div className='p-4'>
											<h3 className='font-bold text-lg mb-2'>{homestay.name}</h3>
											<p className='text-gray-600 mb-2 flex items-center'>
												<MapPin className='h-4 w-4 mr-1' />
												{homestay.address || homestay.city || 'Address not available'}
											</p>

											{/* Show description if available */}
											{homestay.description && (
												<p className='text-gray-700 text-sm mt-2 line-clamp-2'>
													{homestay.description}
												</p>
											)}

											{/* Display ratings if available */}
											{homestay.standar && (
												<div className='flex items-center mt-2'>
													{[...Array(homestay.standar)].map((_, i) => (
														<svg
															key={i}
															className='w-4 h-4 text-yellow-400'
															fill='currentColor'
															viewBox='0 0 20 20'
														>
															<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
														</svg>
													))}
												</div>
											)}

											<div className='mt-4 flex justify-between items-center'>
												<div className='font-bold text-lg'>
													{/* Use the new priceForToday value */}
													{priceForToday !== null ? (
														<span className='text-green-600'>
															${priceForToday.toLocaleString()}
														</span>
													) : (
														<span className='text-gray-600'>Decommission</span>
													)}
												</div>
												<Button
													size='sm'
													onClick={() => router.push(`/home-stay/${homestay.id}`)}
												>
													View Details
												</Button>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
}
