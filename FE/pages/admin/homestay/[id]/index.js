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
	const todayPrice = calendar?.find((item) => formatDateForComparison(item.date) === currentDate);

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
					<p className='text-center py-8 h-screen'>Loading...</p>
				) : error ? (
					<p className='text-center text-red-500 py-8'>Error fetching details</p>
				) : (
					<div className='p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg space-y-6'>
						<h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center'>{data?.name}</h2>

						<PhotoProvider>
							{data?.mainImage && (
								<PhotoView src={data.mainImage}>
									<img
										src={data.mainImage}
										alt='Main Homestay'
										className='w-full object-cover h-64 sm:h-80 lg:h-96 rounded-md cursor-pointer hover:opacity-90 transition'
									/>
								</PhotoView>
							)}

							<div className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4'>
								{data?.homeStayImage?.map((img, index) => (
									<PhotoView key={index} src={img.image}>
										<div className='border rounded-md'>
											<img
												src={img.image}
												alt={`Image ${index + 1}`}
												className='rounded-lg w-full h-full object-cover cursor-pointer hover:opacity-90 transition'
											/>
										</div>
									</PhotoView>
								))}
							</div>
						</PhotoProvider>

						<div className='flex flex-col gap-3'>
							<p className='text-gray-600 text-base sm:text-lg leading-relaxed'>{data?.description}</p>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
								<p>
									<strong>Address:</strong> {data?.address}
								</p>
								<p>
									<strong>City:</strong> {data?.city}
								</p>
							</div>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
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
								<h3 className='text-lg font-semibold mb-2'>Standard</h3>
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
									<h3 className='text-lg font-semibold mb-4'>Amenities</h3>
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
										{data.amenities.map((amenity) => (
											<div
												key={amenity.id}
												className='flex items-center p-3 bg-gray-50 rounded-lg shadow-sm'
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
									<h3 className='text-lg font-semibold mb-4'>Facilities</h3>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										{data.facility.map((facility) => (
											<div
												key={facility.facilityID}
												className='p-4 bg-gray-50 rounded-lg shadow-sm'
											>
												<h4 className='font-medium text-gray-800 mb-1'>{facility.name}</h4>
												{facility.description && (
													<p className='text-gray-600 text-sm'>{facility.description}</p>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Calendar Section */}
							{data?.calendar && data.calendar.length > 0 && (
								<div className='mt-6'>
									<h3 className='text-lg font-semibold mb-4'>Available Dates</h3>
									<div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-64 overflow-y-auto p-2'>
										{data.calendar
											.sort((a, b) => new Date(a.date) - new Date(b.date))
											.map((calendarItem) => {
												const date = new Date(calendarItem.date);
												const isToday =
													formatDateForComparison(date) ===
													formatDateForComparison(new Date());
												return (
													<div
														key={calendarItem.id}
														className={`p-2 border rounded-md text-center ${
															isToday
																? 'bg-green-100 border-green-300'
																: 'bg-gray-50 border-gray-200'
														}`}
													>
														<p className='text-sm font-medium'>
															{date.toLocaleDateString('en-GB', {
																day: '2-digit',
																month: '2-digit',
																year: 'numeric',
															})}
														</p>
														<p className='text-green-600 font-semibold'>
															${calendarItem.price}
														</p>
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
