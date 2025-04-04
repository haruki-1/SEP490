import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getAllAmenity } from 'pages/api/amenity/getAmenity';
import { getAllHomeStay } from 'pages/api/homestay/getAllHomeStay';
import React, { useState, useEffect } from 'react';
import MainLayout from '../layout';

const HomeStay = () => {
	const [searchParams, setSearchParams] = useState({
		amenityNames: [],
		minPrice: 0,
		maxPrice: 5000000,
		standard: [],
	});

	const {
		data: DataHomeStay,
		isLoading: loadingHomeStay,
		error: errorHomeStay,
	} = useQuery({
		queryKey: ['homeStays', searchParams],
		queryFn: () => getAllHomeStay(searchParams),
	});

	const {
		data: DataAmenity,
		isLoading: loadingAmenity,
		error: errorAmenity,
	} = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
	});

	// Get amenities from API response
	const availableAmenities = DataAmenity?.map((amenity) => amenity.name) || [];

	// List of standard options
	const standardOptions = [1, 2, 3, 4, 5];

	// Format date for comparison (YYYY-MM-DD format)
	const formatDateForComparison = (date) => {
		const d = new Date(date);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
			2,
			'0'
		)}`;
	};

	// Get price for today from calendar
	const getPriceForToday = (calendar) => {
		// If no calendar array or empty, return null (Decommission)
		if (!calendar || calendar.length === 0) return null;

		const currentDate = formatDateForComparison(new Date());

		// Find today's price entry
		const todayPrice = calendar?.find((item) => formatDateForComparison(new Date(item.date)) === currentDate);

		// If there's no calendar entry for today, check if all calendar entries are expired
		if (!todayPrice) {
			// Check if all calendar entries are in the past
			const allExpired = calendar.every((item) => {
				const entryDate = new Date(item.date);
				entryDate.setHours(0, 0, 0, 0);
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				return entryDate < today;
			});

			// If all entries are expired, return null (Decommission)
			if (allExpired) return null;

			// If there's no entry for today but some future entries exist,
			// find the next valid entry (first future date)
			const futureEntries = calendar
				.filter((item) => {
					const entryDate = new Date(item.date);
					entryDate.setHours(0, 0, 0, 0);
					const today = new Date();
					today.setHours(0, 0, 0, 0);
					return entryDate >= today;
				})
				.sort((a, b) => new Date(a.date) - new Date(b.date));

			// Return the price of the next valid date or null if none found
			return futureEntries.length > 0 ? { price: futureEntries[0].price, calenderID: futureEntries[0].id } : null;
		}

		// If there's a calendar entry for today, return its price and ID
		return { price: todayPrice.price, calenderID: todayPrice.id };
	};

	// Handle amenity checkbox change
	const handleAmenityChange = (amenity) => {
		setSearchParams((prev) => {
			if (prev.amenityNames.includes(amenity)) {
				return {
					...prev,
					amenityNames: prev.amenityNames.filter((item) => item !== amenity),
				};
			} else {
				return {
					...prev,
					amenityNames: [...prev.amenityNames, amenity],
				};
			}
		});
	};

	// Handle standard checkbox change
	const handleStandardChange = (standard) => {
		setSearchParams((prev) => {
			if (prev.standard.includes(standard)) {
				return {
					...prev,
					standard: prev.standard.filter((item) => item !== standard),
				};
			} else {
				return {
					...prev,
					standard: [...prev.standard, standard],
				};
			}
		});
	};

	// Handle price range change
	const handlePriceChange = (e, type) => {
		const value = parseInt(e.target.value, 10) || 0;
		setSearchParams((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	// Get homestays from API response
	const homestays = DataHomeStay || [];

	// Apply filters to homestays
	const filteredHomestays = homestays.filter((homestay) => {
		// Get the minimum price from the calendar (if available)
		const prices = homestay.calendar.map((item) => item.price);
		const minHomestayPrice = prices.length > 0 ? Math.min(...prices) : 0;
		const maxHomestayPrice = prices.length > 0 ? Math.max(...prices) : 0;

		// Filter by price - check if any of the calendar prices are within range
		if (maxHomestayPrice < searchParams.minPrice || minHomestayPrice > searchParams.maxPrice) {
			return false;
		}

		// Filter by standard (using standar from API)
		if (searchParams.standard.length > 0 && !searchParams.standard.includes(homestay.standar)) {
			return false;
		}

		// Filter by amenities
		if (searchParams.amenityNames.length > 0) {
			// If homestay has no amenities, filter it out when amenities are selected
			if (!homestay.amenities || homestay.amenities.length === 0) {
				return false;
			}

			// Check if all selected amenities are included in the homestay
			return searchParams.amenityNames.every((selectedAmenity) =>
				homestay.amenities.some((amenity) => amenity.name === selectedAmenity)
			);
		}

		return true;
	});

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 20000);
	};

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='flex flex-col gap-6 lg:flex-row'>
						{/* Left Sidebar - Search Filters */}
						<div className='w-full lg:w-1/4 shrink-0'>
							<div className='sticky overflow-hidden bg-white rounded-lg shadow-md top-20'>
								{/* Sidebar Header */}
								<div className='px-6 py-4 bg-indigo-600'>
									<h2 className='text-xl font-semibold text-white'>Search</h2>
								</div>

								<div className='p-6 space-y-6'>
									{/* Price Range */}
									<div>
										<h3 className='mb-3 text-lg font-medium text-gray-900'>Price</h3>
										<div className='space-y-4'>
											<div>
												<label className='block mb-1 text-sm font-medium text-gray-700'>
													Minimum Price:
												</label>
												<input
													type='number'
													className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
													value={searchParams.minPrice}
													onChange={(e) => handlePriceChange(e, 'minPrice')}
												/>
											</div>
											<div>
												<label className='block mb-1 text-sm font-medium text-gray-700'>
													Maximum Price:
												</label>
												<input
													type='number'
													className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
													value={searchParams.maxPrice}
													onChange={(e) => handlePriceChange(e, 'maxPrice')}
												/>
											</div>
										</div>
									</div>

									{/* Divider */}
									<hr className='border-gray-200' />

									{/* Amenities */}
									<div>
										<h3 className='mb-3 text-lg font-medium text-gray-900'>Amenities</h3>
										{loadingAmenity ? (
											<p className='text-sm text-gray-500'>Loading amenities...</p>
										) : errorAmenity ? (
											<p className='text-sm text-red-500'>Error loading amenities</p>
										) : (
											<div className='space-y-2'>
												{availableAmenities.map((amenity, index) => (
													<div className='flex items-center' key={index}>
														<input
															id={`amenity-${index}`}
															type='checkbox'
															className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															checked={searchParams.amenityNames.includes(amenity)}
															onChange={() => handleAmenityChange(amenity)}
														/>
														<label
															htmlFor={`amenity-${index}`}
															className='ml-3 text-sm text-gray-700'
														>
															{amenity}
														</label>
													</div>
												))}
											</div>
										)}
									</div>

									{/* Divider */}
									<hr className='border-gray-200' />

									{/* Standard */}
									<div>
										<h3 className='mb-3 text-lg font-medium text-gray-900'>Standard</h3>
										<div className='space-y-2'>
											{standardOptions.map((option) => (
												<div className='flex items-center' key={option}>
													<input
														id={`standard-${option}`}
														type='checkbox'
														className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
														checked={searchParams.standard.includes(option)}
														onChange={() => handleStandardChange(option)}
													/>
													<label
														htmlFor={`standard-${option}`}
														className='flex items-center ml-3'
													>
														<span className='mr-1 text-sm text-gray-700'>{option}</span>
														<div className='flex items-center'>
															{[...Array(option)].map((_, i) => (
																<svg
																	key={i}
																	className='w-4 h-4 text-yellow-400'
																	fill='currentColor'
																	viewBox='0 0 20 20'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
																</svg>
															))}
														</div>
													</label>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Content - Homestay Listings */}
						<div className='flex-1'>
							{loadingHomeStay ? (
								<div className='p-10 text-center bg-white rounded-lg shadow-md'>
									<svg
										className='w-10 h-10 mx-auto text-indigo-600 animate-spin'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
									<h3 className='mt-4 text-lg font-medium text-gray-900'>Loading homestays...</h3>
								</div>
							) : errorHomeStay ? (
								<div className='p-10 text-center bg-white rounded-lg shadow-md'>
									<svg
										className='w-12 h-12 mx-auto text-red-500'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
										/>
									</svg>
									<h3 className='mt-2 text-lg font-medium text-gray-900'>Error Loading Data</h3>
									<p className='mt-1 text-gray-500'>Could not load homestay listings.</p>
								</div>
							) : filteredHomestays.length > 0 ? (
								<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
									{filteredHomestays.map((homestay) => {
										// Get price for today or the next available day
										const priceData = getPriceForToday(homestay.calendar);
										const priceForToday = priceData ? priceData.price : null;

										return (
											<div
												key={homestay.id}
												className='flex flex-col h-full transition-transform duration-300 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1'
											>
												<div className='relative'>
													<div className='h-48 bg-gray-200 rounded-tr-md rounded-tl-md'>
														<Image
															src={homestay.mainImage}
															width={200}
															height={200}
															alt='homestay img'
															className='object-cover w-full h-full rounded-tr-md rounded-tl-md'
														/>
													</div>
													<div className='absolute top-0 right-0 flex items-center px-3 py-1 font-medium text-gray-900 bg-yellow-400 rounded-bl-lg rounded-tr-md'>
														{[...Array(homestay.standar)].map((_, i) => (
															<svg
																key={i}
																className='w-4 h-4 text-gray-900'
																fill='currentColor'
																viewBox='0 0 20 20'
																xmlns='http://www.w3.org/2000/svg'
															>
																<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
															</svg>
														))}
													</div>
													{homestay.isBooked && (
														<div className='absolute top-0 left-0 px-3 py-1 font-medium text-white bg-red-500 rounded-br-lg'>
															Booked
														</div>
													)}
												</div>

												<div className='flex flex-col flex-grow p-4'>
													<div className='flex flex-col flex-grow gap-2'>
														<h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
															{homestay.name}
														</h3>
														<p className='text-sm text-gray-500'>
															<span className='font-medium'>Location:</span>{' '}
															{homestay.city}
														</p>
														<div className='font-bold text-blue-600'>
															{priceForToday !== null ? (
																<p className='text-lg text-green-600 md:text-xl'>
																	${priceForToday.toLocaleString()}
																</p>
															) : (
																<p className='text-lg md:text-base'>Decommission</p>
															)}
														</div>

														<div className='flex flex-wrap gap-2 mb-4 overflow-hidden max-h-16'>
															{homestay.amenities &&
																homestay.amenities.map((amenity, index) => (
																	<span
																		key={index}
																		className='px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full'
																	>
																		{amenity.name}
																	</span>
																))}
														</div>
													</div>
													<div className='mt-auto'>
														<Link href={`/home-stay/${homestay.id}`}>
															<button className='w-full py-2 font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
																View Details
															</button>
														</Link>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className='p-10 text-center bg-white rounded-lg shadow-md'>
									<svg
										className='w-12 h-12 mx-auto text-gray-400'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
									<h3 className='mt-2 text-lg font-medium text-gray-900'>No Results Found</h3>
									<p className='mt-1 text-gray-500'>No results match your search criteria.</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default HomeStay;