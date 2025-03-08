import { Badge } from '@/components/components/ui/badge';
import { Button } from '@/components/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
	ArrowLeft,
	Bath,
	Bed,
	Car,
	ChefHat,
	PocketIcon as Pool,
	Cigarette,
	MapPin,
	Wifi,
	Tv,
	Coffee,
	PocketKnife,
	Kitchen,
	Check,
	Loader2,
	ChevronUp,
	ChevronDown,
	Ticket,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getHomeStayDetail } from '@/pages/api/homestay/getHomeStayDetail';
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'sonner';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';
import { createBooking } from '@/pages/api/booking/createBooking';
import MainLayout from '@/pages/layout';
import { useAuth } from '@/context/AuthProvider';
import { getUserVouchers } from '@/pages/api/voucher/getUserVouchers';

// Helper function to format dates consistently for comparison
const formatDateForComparison = (dateInput) => {
	const date = new Date(dateInput);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
		2,
		'0'
	)}`;
};

// Helper function to get icon for amenities
const getAmenitiesIcon = (name) => {
	const lowercaseName = name.toLowerCase();
	if (lowercaseName.includes('wifi')) return <Wifi className='w-5 h-5' />;
	if (lowercaseName.includes('tv')) return <Tv className='w-5 h-5' />;
	if (lowercaseName.includes('parking') || lowercaseName.includes('car')) return <Car className='w-5 h-5' />;
	if (lowercaseName.includes('kitchen')) return <Kitchen className='w-5 h-5' />;
	if (lowercaseName.includes('coffee') || lowercaseName.includes('breakfast')) return <Coffee className='w-5 h-5' />;
	if (lowercaseName.includes('bath')) return <Bath className='w-5 h-5' />;
	if (lowercaseName.includes('bed')) return <Bed className='w-5 h-5' />;
	if (lowercaseName.includes('pool')) return <Pool className='w-5 h-5' />;
	// Default icon for other amenities
	return <Check className='w-5 h-5' />;
};

// Helper function to get price for today
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
		return futureEntries.length > 0 ? { price: futureEntries[0].price, calenderID: futureEntries[0].id } : null;
	}

	// If there's a calendar entry for today, return its price and ID
	return { price: todayPrice.price, calenderID: todayPrice.id };
};

const HomeStayDetail = () => {
	const { id } = useParams() ?? {};
	const router = useRouter();
	const [voucherCode, setVoucherCode] = useState('');
	const [isOnline, setIsOnline] = useState(true);
	const [selectedDates, setSelectedDates] = useState([]);
	const { dataProfile } = useAuth();
	const [showVouchers, setShowVouchers] = useState(false);

	const toggleDateSelection = (calenderID) => {
		setSelectedDates((prevSelected) =>
			prevSelected.includes(calenderID)
				? prevSelected.filter((id) => id !== calenderID)
				: [...prevSelected, calenderID]
		);
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStayDetail', id],
		queryFn: () => getHomeStayDetail(id),
		enabled: !!id,
	});

	const homestay = data || [];

	const { data: userVouchers, isLoading: vouchersLoading } = useQuery({
		queryKey: ['userVouchers'],
		queryFn: getUserVouchers,
		enabled: !!dataProfile?.id,
	});

	const bookingMutation = useMutation({
		mutationFn: (bookingData) => createBooking(dataProfile.id, bookingData),
		onSuccess: (data) => {
			toast.success('Booking successful!');
			router.push(`/payment/?bookingID=${data.bookingID}`);
		},
		onError: (error) => {
			toast.error(`Booking failed: ${error}`);
		},
	});

	const handleBookNow = () => {
		if (homestay.isBooked) {
			toast.error('This homestay is already booked');
			return;
		}

		if (selectedDates.length === 0) {
			toast.error('Please select at least one date to book.');
			return;
		}

		const bookingData = {
			calenders: selectedDates.map((calenderID) => ({ calenderID })),
			voucherCode: voucherCode || null,
			isOnline: isOnline,
		};

		console.log('Booking data:', bookingData);
		bookingMutation.mutate(bookingData);
	};

	const handleSelectVoucher = (code) => {
		setVoucherCode(code);
		setShowVouchers(false);
		toast.success(`Voucher ${code} applied`);
	};

	if (isLoading) {
		return (
			<MainLayout>
				<div className='container-lg p-4'>
					<div className='space-y-4'>
						<Skeleton height={300} className='rounded-lg' />

						<div className='space-y-2'>
							<Skeleton width={250} height={30} />
							<div className='flex items-center'>
								<MapPin className='w-4 h-4 mr-1 text-gray-400' />
								<Skeleton width={200} height={20} />
							</div>
						</div>

						<div className='flex justify-between'>
							<Skeleton width={150} height={30} />
							<Skeleton width={80} height={30} />
						</div>

						<div className='space-y-2'>
							<Skeleton width={150} height={25} />
							<div className='grid grid-cols-4 gap-4'>
								{Array(4)
									.fill(null)
									.map((_, i) => (
										<Skeleton key={i} height={20} />
									))}
							</div>
						</div>

						<div className='space-y-2'>
							<Skeleton width={200} height={25} />
							<Skeleton count={3} />
						</div>

						<Skeleton height={40} className='rounded-lg' />
					</div>
				</div>
			</MainLayout>
		);
	}

	const priceData = getPriceForToday(homestay.calendar);
	const priceForToday = priceData ? priceData.price : null;

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='relative flex gap-5 flex-col items-center lg:items-start lg:flex-row'>
						<div className='flex flex-col space-y-4 w-full lg:w-3/4'>
							<PhotoProvider>
								<div className='flex flex-col h-full gap-2'>
									<div className='relative overflow-hidden rounded-lg'>
										<PhotoView src={homestay?.mainImage}>
											<Image
												src={homestay.mainImage}
												alt='Star Sun Hotel exterior'
												className='object-cover w-full'
												width={1000}
												height={800}
											/>
										</PhotoView>

										{homestay.isBooked && (
											<div className='absolute top-0 left-0 bg-red-500 text-white font-bold px-4 py-2 rounded-br-lg'>
												BOOKED
											</div>
										)}
									</div>

									<div className='md:hidden'>
										<Swiper spaceBetween={10} slidesPerView={3} navigation modules={[Navigation]}>
											{homestay?.homeStayImage?.map((img, index) => (
												<SwiperSlide key={index}>
													<PhotoView src={img.image}>
														<div className='relative rounded-lg flex justify-center h-full border p-3'>
															<Image
																src={img.image}
																alt='Hotel room'
																width={100}
																height={100}
																className='object-cover rounded-lg'
															/>
														</div>
													</PhotoView>
												</SwiperSlide>
											))}
										</Swiper>
									</div>

									<div className='hidden md:grid grid-cols-4 lg:grid-cols-8 gap-2 justify-items-center'>
										{homestay?.homeStayImage?.map((img, index) => (
											<PhotoView key={index} src={img.image}>
												<div className='relative rounded-lg h-full border p-3'>
													<Image
														src={img.image}
														alt='Hotel room'
														width={100}
														height={100}
														className='object-cover rounded-lg'
													/>
												</div>
											</PhotoView>
										))}
									</div>
								</div>
							</PhotoProvider>
							<div className='flex justify-between flex-col md:flex-row'>
								<div className='flex flex-col gap-2'>
									<h1 className='text-xl md:text-2xl font-bold'>{homestay.name}</h1>
									<div className='flex items-center text-gray-500 text-sm md:text-base'>
										<MapPin className='w-4 h-4 mr-1' />
										<span>
											{homestay.address}, {homestay.city}
										</span>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center'>
										{[...Array(homestay.standar)].map((_, i) => (
											<svg
												key={i}
												className='w-5 h-5 text-yellow-400'
												fill='currentColor'
												viewBox='0 0 20 20'
											>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
											</svg>
										))}
									</div>
									<h2 className='text-base md:text-base font-semibold'>Price</h2>
									<div className='flex items-baseline gap-2'>
										<span className='text-xl md:text-2xl font-bold text-blue-600'>
											{priceForToday !== null ? (
												<p className='text-xl text-blue-600'>
													${priceForToday.toLocaleString()}
												</p>
											) : (
												<p>Decommission</p>
											)}
										</span>
										<span className='text-sm'>For One Day</span>
									</div>
								</div>
							</div>

							<div className='flex flex-col gap-3'>
								<h2 className='text-base md:text-base font-semibold'>Amenities</h2>
								{homestay.amenities?.length > 0 ? (
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
										{homestay.amenities.map((ameniti) => (
											<div key={ameniti.id} className='flex items-center bg-gray-50'>
												{getAmenitiesIcon(ameniti.name)}
												<span className='ml-2 text-gray-700'>{ameniti.name}</span>
											</div>
										))}
									</div>
								) : (
									<span>No amenities</span>
								)}
							</div>

							<div className='flex flex-col gap-3'>
								<h2 className='text-base md:text-lg font-semibold'>Facilities</h2>
								{homestay.facility?.length > 0 ? (
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
										{homestay.facility.map((facility) => (
											<div key={facility.facilityID} className='flex items-center bg-gray-50'>
												<span className='text-gray-700'>{facility.name}</span>
											</div>
										))}
									</div>
								) : (
									<span>No facilities</span>
								)}
							</div>

							<div className='flex flex-col gap-2'>
								<h2 className='text-base md:text-lg font-semibold'>Description</h2>
								<p className='text-gray-600 text-sm md:text-base'>{homestay.description}</p>
							</div>
						</div>
						<div className='w-full md:w-1/2 lg:w-1/3 h-fit sticky top-24 rounded-md border p-3 flex flex-col gap-3 shadow-lg'>
							{/* Add voucher input */}
							<div className='flex flex-col gap-2'>
								<h2 className='text-sm md:text-base font-semibold'>Have a voucher?</h2>
								<div className='flex flex-col gap-2'>
									<div className='flex gap-2 flex-col'>
										<input
											type='text'
											value={voucherCode}
											onChange={(e) => setVoucherCode(e.target.value)}
											placeholder='Enter voucher code...'
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
											disabled={homestay.isBooked}
										/>
										<DropdownMenu>
											<DropdownMenuTrigger
												asChild
												disabled={homestay.isBooked || vouchersLoading || !userVouchers?.length}
											>
												<Button variant='outline' className='flex items-center justify-between'>
													{/* <Ticket className='h-4 w-4 mr-2' /> */}
													<span>Your Voucher</span>
													<ChevronDown className='h-4 w-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-full min-w-[240px]' align='start'>
												<DropdownMenuLabel>Your Vouchers</DropdownMenuLabel>
												<DropdownMenuSeparator />
												{vouchersLoading ? (
													<div className='py-2 px-4 text-sm'>Loading vouchers...</div>
												) : userVouchers?.length > 0 ? (
													userVouchers.map((voucher) => (
														<DropdownMenuItem
															key={voucher.voucherID}
															onClick={() => handleSelectVoucher(voucher.code)}
															className='cursor-pointer'
														>
															<div className='flex items-center justify-between w-full'>
																<div className='flex flex-col'>
																	<span className='font-medium'>{voucher.code}</span>
																	<span className='text-xs text-gray-500'>
																		{voucher.discount}% off
																	</span>
																</div>
																<Badge variant='outline' className='ml-2'>
																	Apply
																</Badge>
															</div>
														</DropdownMenuItem>
													))
												) : (
													<div className='py-2 px-4 text-sm'>No vouchers available</div>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
										{voucherCode && (
											<div className='flex items-center text-xs text-green-600'>
												<Check className='h-3 w-3 mr-1' />
												Voucher {voucherCode} applied
											</div>
										)}
									</div>

									{/* {showVouchers && userVouchers?.length > 0 && (
										<div className='relative top-full left-0 right-0 z-10 mt-1 bg-white rounded-md border shadow-lg max-h-48 overflow-y-auto'>
											<div className='p-2'>
												<h3 className='text-sm font-medium text-gray-700 mb-2'>
													Your Vouchers
												</h3>
												<div className='space-y-2'>
													{userVouchers.map((voucher) => (
														<button
															key={voucher.voucherID}
															onClick={() => handleSelectVoucher(voucher.code)}
															className='flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-md'
														>
															<div className='flex items-center gap-2'>
																<Ticket className='h-4 w-4 text-blue-500' />
																<div>
																	<p className='text-sm font-medium'>
																		{voucher.code}
																	</p>
																	<p className='text-xs text-gray-500'>
																		{voucher.discount}% off
																	</p>
																</div>
															</div>
															<Badge variant='outline' className='text-xs'>
																Use
															</Badge>
														</button>
													))}
												</div>
											</div>
										</div>
									)} */}
								</div>
							</div>

							{/* Payment method selection */}
							<div className='flex flex-col gap-2'>
								<h2 className='text-sm md:text-base font-semibold'>Payment Method</h2>
								<div className='flex gap-4'>
									<label className='flex items-center space-x-2 cursor-pointer'>
										<input
											type='radio'
											checked={isOnline}
											onChange={() => setIsOnline(true)}
											className='form-radio h-4 w-4 text-blue-600'
											disabled={homestay.isBooked}
										/>
										<span className='text-sm'>Online Payment</span>
									</label>
									<label className='flex items-center space-x-2 cursor-pointer'>
										<input
											type='radio'
											checked={!isOnline}
											onChange={() => setIsOnline(false)}
											className='form-radio h-4 w-4 text-blue-600'
										/>
										<span className='text-sm'>Cash on Arrival</span>
									</label>
								</div>
							</div>

							{homestay.isBooked && (
								<div className='bg-red-50 border border-red-200 text-red-600 font-medium text-sm text-center p-2 rounded-md'>
									This homestay is already booked and not available for reservation.
								</div>
							)}

							<div className='flex flex-col gap-2'>
								<h2 className='text-sm md:text-base font-semibold'>Select Booking Dates</h2>
								<div className='flex flex-wrap gap-2'>
									{homestay.calendar
										?.slice()
										?.filter(
											(date) =>
												new Date(date.date).setHours(0, 0, 0, 0) >=
													new Date().setHours(0, 0, 0, 0) && !date.isDeleted
										)
										.sort((a, b) => new Date(a.date) - new Date(b.date))
										.map((date) => (
											<button
												key={date.id}
												onClick={() => toggleDateSelection(date.id)}
												className={`px-3 py-2 text-sm rounded-md border max-w-24 ${
													selectedDates.includes(date.id)
														? 'bg-blue-600 text-white'
														: 'bg-gray-100'
												}`}
												disabled={homestay.isBooked}
											>
												{new Date(date.date).toLocaleDateString('vi')}
											</button>
										))}
								</div>
							</div>

							<Button
								className='w-full bg-blue-600 hover:bg-blue-700 text-white'
								onClick={handleBookNow}
								disabled={bookingMutation.isPending || !priceData || homestay.isBooked}
							>
								{bookingMutation.isPending ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Processing...
									</>
								) : homestay.isBooked ? (
									'Not Available'
								) : (
									'Book Now'
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default HomeStayDetail;
