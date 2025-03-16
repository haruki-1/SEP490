'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Wifi, Car, PocketIcon as Pool, Star, Check, Coffee } from 'lucide-react';
import AdminLayout from '../../layout';
import { getHomeStayDetail } from '@/pages/api/homestay/getHomeStayDetail';

// Helper function to format dates consistently for comparison
const formatDateForComparison = (dateInput) => {
	const date = new Date(dateInput);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
		2,
		'0'
	)}`;
};

const getPriceForToday = (calendar) => {
	// If no calendar array or empty, return null (Decommission)
	if (!calendar || calendar.length === 0) return null;

	const currentDate = formatDateForComparison(new Date());

	// Find today's price entry
	const todayPrice = calendar?.find((item) => formatDateForComparison(item.date) === currentDate && !item.isDeleted);

	// If there's no calendar entry for today, check if all calendar entries are expired
	if (!todayPrice) {
		// Check if all calendar entries are in the past
		const allExpired = calendar.every((item) => {
			const entryDate = new Date(item.date);
			entryDate.setHours(0, 0, 0, 0);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			return entryDate < today || item.isDeleted;
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
				return entryDate >= today && !item.isDeleted;
			})
			.sort((a, b) => new Date(a.date) - new Date(b.date));

		// Return the price of the next valid date or null if none found
		return futureEntries.length > 0 ? futureEntries[0].price : null;
	}

	// If there's a calendar entry for today, return its price
	return todayPrice.price;
};

// Get appropriate icon for an amenity
const getAmenityIcon = (name) => {
	const lowercaseName = name.toLowerCase();
	if (lowercaseName.includes('wifi')) return <Wifi className='w-5 h-5' />;
	if (lowercaseName.includes('parking')) return <Car className='w-5 h-5' />;
	if (lowercaseName.includes('pool') || lowercaseName.includes('swimming')) return <Pool className='w-5 h-5' />;
	if (lowercaseName.includes('coffee') || lowercaseName.includes('breakfast')) return <Coffee className='w-5 h-5' />;
	// Default icon for other amenities
	return <Check className='w-5 h-5' />;
};

const DetailHomeStay = () => {
	const { id } = useParams() ?? {};

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStayDetail', id],
		queryFn: () => getHomeStayDetail(id),
		enabled: !!id,
	});

	return (
		<AdminLayout>
			<div>
				{isLoading ? (
					<p className='h-screen py-8 text-center'>Loading...</p>
				) : error ? (
					<p className='py-8 text-center text-red-500'>Error fetching details</p>
				) : (
					<div className='p-4 space-y-6 bg-white shadow-lg sm:p-6 lg:p-8 rounded-2xl'>
						<h2 className='mb-6 text-2xl font-bold text-center text-gray-800 sm:text-3xl'>{data?.name}</h2>

						<PhotoProvider>
							{data?.mainImage && (
								<PhotoView src={data.mainImage}>
									<img
										src={data.mainImage}
										alt='Main Homestay'
										className='object-cover w-full h-64 transition rounded-md cursor-pointer sm:h-80 lg:h-96 hover:opacity-90'
									/>
								</PhotoView>
							)}

							<div className='grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8'>
								{data?.homeStayImage?.map((img, index) => (
									<PhotoView key={index} src={img.image}>
										<div className='border rounded-md'>
											<img
												src={img.image}
												alt={`Image ${index + 1}`}
												className='object-cover w-full h-full transition rounded-lg cursor-pointer hover:opacity-90'
											/>
										</div>
									</PhotoView>
								))}
							</div>
						</PhotoProvider>

						<div className='flex flex-col gap-3'>
							<p className='text-base leading-relaxed text-gray-600 sm:text-lg'>{data?.description}</p>

							<div className='grid grid-cols-1 gap-4 text-gray-700 sm:grid-cols-2'>
								<p>
									<strong>Address:</strong> {data?.address}
								</p>
								<p>
									<strong>City:</strong> {data?.city}
								</p>
							</div>

							<div className='grid grid-cols-1 gap-4 text-gray-700 sm:grid-cols-2'>
								<p>
									<strong>Check-In:</strong> {data?.checkInTime}
								</p>
								<p>
									<strong>Check-Out:</strong> {data?.checkOutTime}
								</p>
							</div>

							<div className='flex items-center gap-2'>
								<strong className='text-gray-800'>Price for Today:</strong>
								{getPriceForToday(data?.calendar) !== null ? (
									<p className='text-xl font-semibold text-green-600'>
										${getPriceForToday(data?.calendar)}
									</p>
								) : (
									<p className='text-xl font-semibold text-red-500'>Decommission</p>
								)}
							</div>

							{/* Standard/Rating */}
							<div className='mt-4'>
								<h3 className='mb-2 text-lg font-semibold'>Standard</h3>
								<div className='flex items-center'>
									{[...Array(5)].map((_, index) => (
										<Star
											key={index}
											className={`w-6 h-6 ${
												data?.standar > index
													? 'text-yellow-500 fill-yellow-500'
													: 'text-gray-300'
											}`}
										/>
									))}
									<span className='ml-2 text-gray-700'>{data?.standar}/5</span>
								</div>
							</div>

							{/* Amenities Section */}
							{data?.amenities && data.amenities.length > 0 && (
								<div className='mt-6'>
									<h3 className='mb-4 text-lg font-semibold'>Amenities</h3>
									<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
										{data.amenities.map((amenity) => (
											<div
												key={amenity.id}
												className='flex items-center p-3 rounded-lg shadow-sm bg-gray-50'
											>
												{getAmenityIcon(amenity.name)}
												<span className='ml-2 text-gray-700'>{amenity.name}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Facilities Section */}
							{data?.facility && data.facility.length > 0 && (
								<div className='mt-6'>
									<h3 className='mb-4 text-lg font-semibold'>Facilities</h3>
									<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
										{data.facility.map((facility) => (
											<div
												key={facility.facilityID}
												className='p-4 rounded-lg shadow-sm bg-gray-50'
											>
												<h4 className='mb-1 font-medium text-gray-800'>{facility.name}</h4>
												{facility.description && (
													<p className='text-sm text-gray-600'>{facility.description}</p>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Calendar Section */}
							{data?.calendar && data.calendar.length > 0 && (
								<div className='mt-6'>
									<h3 className='mb-4 text-lg font-semibold'>Available Dates</h3>
									<div className='grid grid-cols-2 gap-3 p-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-6 max-h-64'>
										{data.calendar
											.filter((calendarItem) => {
												const entryDate = new Date(calendarItem.date);
												entryDate.setHours(0, 0, 0, 0);
												const today = new Date();
												today.setHours(0, 0, 0, 0);
												return entryDate >= today;
											})
											.sort((a, b) => new Date(a.date) - new Date(b.date))
											.map((calendarItem) => {
												const date = new Date(calendarItem.date);
												const isToday =
													formatDateForComparison(date) ===
													formatDateForComparison(new Date());
												const isDeleted = calendarItem.isDeleted;

												return (
													<div
														key={calendarItem.id}
														className={`p-2 border rounded-md text-center ${
															isDeleted
																? 'bg-gray-300 border-gray-400 opacity-60 cursor-not-allowed'
																: isToday
																? 'bg-green-100 border-green-300 cursor-pointer'
																: 'bg-gray-50 border-gray-200 cursor-pointer'
														}`}
													>
														<p
															className={`text-sm font-medium ${
																isDeleted ? 'text-gray-500' : ''
															}`}
														>
															{date.toLocaleDateString('en-GB', {
																day: '2-digit',
																month: '2-digit',
																year: 'numeric',
															})}
														</p>
														<div className='flex items-center justify-between'>
															<p
																className={`${
																	isDeleted
																		? 'text-gray-500 line-through'
																		: 'text-green-600'
																} font-semibold`}
															>
																${calendarItem.price}
															</p>
															{isDeleted && (
																<span className='text-xs font-medium text-red-500'>
																	Deleted
																</span>
															)}
														</div>
													</div>
												);
											})}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default DetailHomeStay;
