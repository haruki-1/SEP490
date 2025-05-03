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
	MapPin,
	Wifi,
	Tv,
	Coffee,
	Kitchen,
	Check,
	Loader2,
	ChevronUp,
	ChevronDown,
	Ticket,
	Calendar,
	CreditCard,
	DollarSign,
	Star,
	MessageSquare,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getHomeStayDetail } from 'pages/api/homestay/getHomeStayDetail';
import MainLayout from 'pages/layout';
import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { createBooking } from 'pages/api/booking/createBooking';
import { useAuth } from 'context/AuthProvider';
import { toast } from 'sonner';
import { getUserVouchers } from 'pages/api/voucher/getUserVouchers';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';
import AvailableDatesSelector from '@/components/AvailableDatesSelector';
import { useTranslation } from 'next-i18next';
import CancelPolicy from '@/components/CancelPolicy';

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
	if (lowercaseName.includes('wifi')) return <Wifi className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('tv')) return <Tv className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('parking') || lowercaseName.includes('car'))
		return <Car className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('kitchen')) return <Kitchen className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('coffee') || lowercaseName.includes('breakfast'))
		return <Coffee className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('bath')) return <Bath className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('bed')) return <Bed className='w-5 h-5 text-blue-500' />;
	if (lowercaseName.includes('pool')) return <Pool className='w-5 h-5 text-blue-500' />;
	// Default icon for other amenities
	return <Check className='w-5 h-5 text-blue-500' />;
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
	const { dataProfile, isAuthenticated } = useAuth();
	const { t } = useTranslation('common');

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
			if (isOnline) {
				router.push(`/payment/?bookingID=${data.bookingID}`);
			} else {
				router.push(`/payment/successfully`);
			}
		},
		onError: (error) => {
			toast.error(`Booking failed: ${error}`);
		},
	});

	const handleBookNow = () => {
		if (!isAuthenticated) {
		  toast.error('Please log in to book this homestay');
		  setTimeout(() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(window.location.href)}`), 1500);
		  return;
		}
	  
		if (!dataProfile?.address || !dataProfile?.avatar) {
		  toast.error('Please complete your profile with address and avatar before booking');
		  setTimeout(() => router.push('/profile'), 1500);
		  return;
		}
	  
		if (homestay.isBooked) {
		  toast.error('This homestay is already booked');
		  return;
		}
	  
		if (selectedDates.length === 0) {
		  toast.error('Please select at least one date to book.');
		  return;
		}
	  
		// Tính Check-in và Check-out đúng:
		const sortedDates = [...selectedDates].sort((a, b) => {
			const dateA = homestay.calendar.find(c => c.id === a)?.date;
			const dateB = homestay.calendar.find(c => c.id === b)?.date;
			return new Date(dateA) - new Date(dateB);
		});

		const checkInDate = homestay.calendar.find(c => c.id === sortedDates[0])?.date;
		const lastSelectedDate = homestay.calendar.find(c => c.id === sortedDates[sortedDates.length - 1])?.date;
		const checkoutDateObj = new Date(lastSelectedDate);
		checkoutDateObj.setDate(checkoutDateObj.getDate() + 1);
		const checkOutDate = checkoutDateObj.toISOString().split('T')[0]; 

		const checkInTime = homestay.checkInTime || '14:00:00';
		const checkOutTime = homestay.checkOutTime || '12:00:00';
	  
		// Tạo datetime hoàn chỉnh cho check-in và check-out
		const checkInDateTime = `${checkInDate}T${checkInTime}`;
		const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;
	  
		const bookingData = {
		  calenders: selectedDates.map((calenderID) => ({ calenderID })),
		  voucherCode: voucherCode || null,
		  isOnline: isOnline,
		  checkInDate: checkInDateTime,
		  checkOutDate: checkOutDateTime,
		};
	  
		bookingMutation.mutate(bookingData);
	  };

	const handleSelectVoucher = (code) => {
		setVoucherCode(code);
		toast.success(`Voucher ${code} applied`);
	};
	

	if (isLoading) {
		return (
			<MainLayout>
				<div className='px-4 py-8 container-lg'>
					<div className='space-y-6'>
						<Button
							variant='ghost'
							className='flex items-center mb-6 text-gray-600 transition-all hover:bg-gray-100'
							onClick={() => router.back()}
						>
							<ArrowLeft className='w-4 h-4 mr-2' />
							{t('backto')}
						</Button>

						<Skeleton height={400} className='rounded-xl' />

						<div className='space-y-3'>
							<Skeleton width={300} height={36} />
							<div className='flex items-center'>
								<MapPin className='w-4 h-4 mr-1 text-gray-400' />
								<Skeleton width={250} height={20} />
							</div>
						</div>

						<div className='flex justify-between'>
							<Skeleton width={180} height={36} />
							<Skeleton width={100} height={36} />
						</div>

						<div className='space-y-4'>
							<Skeleton width={180} height={30} />
							<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
								{Array(8)
									.fill(null)
									.map((_, i) => (
										<Skeleton key={i} height={40} className='rounded-lg' />
									))}
							</div>
						</div>

						<div className='space-y-4'>
							<Skeleton width={200} height={30} />
							<Skeleton count={4} className='py-1' />
						</div>

						<Skeleton height={50} className='rounded-xl' />
					</div>
				</div>
			</MainLayout>
		);
	}

	const priceData = getPriceForToday(homestay.calendar);
	const priceForToday = priceData ? priceData.price : null;

	const availableDates = homestay.calendar
		?.filter(
			(date) =>
				new Date(date.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) &&
				!date.isDeleted &&
				!date.isBooked
		)
		.sort((a, b) => new Date(a.date) - new Date(b.date));
	const selectedCheckIn = availableDates?.find((date) => date.id === selectedDates[0]);

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
	  setMounted(true);
	}, []);

	return (
		mounted && (
		<MainLayout>
			<div className='sec-com bg-gradient-to-b from-blue-50 to-white'>
				<div className='px-4 container-lg'>
					<Button
						variant='ghost'
						className='flex items-center mb-6 text-gray-600 transition-all hover:bg-white/80'
						onClick={() => router.back()}
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						{t('backto')}
					</Button>

					<div className='relative flex flex-col items-center gap-8 lg:items-start lg:flex-row'>
						<div className='flex flex-col w-full space-y-8 lg:w-2/3'>
							<PhotoProvider>
								<div className='flex flex-col h-full gap-4'>
									<div className='relative overflow-hidden shadow-lg rounded-2xl aspect-video'>
										<Swiper
											modules={[Navigation, Pagination, EffectFade, Autoplay]}
											effect='fade'
											navigation
											pagination={{ clickable: true }}
											autoplay={{ delay: 5000, disableOnInteraction: false }}
											loop={homestay?.homeStayImage?.length > 1}
											className='w-full h-full'
										>
											<SwiperSlide>
												<PhotoView src={homestay?.mainImage}>
													<div className='relative h-full'>
														<Image
															src={homestay.mainImage}
															alt={homestay.name}
															fill
															className='object-cover'
															priority
														/>
													</div>
												</PhotoView>
											</SwiperSlide>

											{homestay?.homeStayImage?.map((img, index) => (
												<SwiperSlide key={index}>
													<PhotoView src={img.image}>
														<div className='relative h-full'>
															<Image
																src={img.image}
																alt={`${homestay.name} - image ${index + 1}`}
																fill
																className='object-cover'
															/>
														</div>
													</PhotoView>
												</SwiperSlide>
											))}
										</Swiper>

										{homestay.isBooked && (
											<div className='absolute z-10 flex items-center px-4 py-2 font-bold text-white bg-red-500 rounded-lg shadow-md top-4 left-4'>
												<span className='mr-1 animate-pulse'>●</span>
												BOOKED
											</div>
										)}
									</div>

									<div className='hidden grid-cols-5 gap-3 md:grid'>
										{homestay?.homeStayImage?.slice(0, 5).map((img, index) => (
											<PhotoView key={index} src={img.image}>
												<div className='relative overflow-hidden transition-all border-2 border-white shadow-sm cursor-pointer aspect-square rounded-xl hover:border-blue-500'>
													<Image
														src={img.image}
														alt={`Room view ${index + 1}`}
														fill
														className='object-cover transition-transform duration-500 hover:scale-110'
													/>
												</div>
											</PhotoView>
										))}
									</div>
								</div>
							</PhotoProvider>

							<div className='flex flex-col justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl'>
								<div className='flex flex-col justify-between gap-4 mb-6 md:flex-row'>
									<div className='flex flex-col gap-2'>
										<h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
											{homestay.name}
										</h1>
										<div className='flex items-center text-gray-500'>
											<MapPin className='w-4 h-4 mr-1 text-blue-500' />
											<span>
												{homestay.address}, {homestay.city}
											</span>
										</div>
										<div className='flex items-center mt-1'>
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-5 h-5 ${
														homestay.standar > i
															? 'text-yellow-400 fill-yellow-400'
															: 'text-gray-300'
													}`}
												/>
											))}
											<span className='ml-2 text-sm text-gray-600'>
												{homestay.standar}-star rating
											</span>
										</div>
									</div>

									<div className='flex flex-col items-start justify-center md:items-end'>
										<div className='flex flex-col gap-1'>
											<span className='text-sm font-medium text-gray-500'>Price per night</span>
											<div className='flex items-baseline gap-2'>
												{priceForToday !== null ? (
													<span className='text-3xl font-bold text-blue-600'>
														{priceForToday.toLocaleString()}VND
													</span>
												) : (
													<span className='px-3 py-1 text-lg font-medium text-red-500 rounded-md bg-red-50'>
														Decommissioned
													</span>
												)}
											</div>
										</div>

										{homestay.isBooked && (
											<Badge className='mt-2 text-red-600 bg-red-100 border-0'>
												Currently booked
											</Badge>
										)}
									</div>
								</div>

								<div className='flex flex-col gap-8'>
									<div className='space-y-6'>
										<div>
											<h2 className='flex items-center mb-4 text-xl font-semibold text-gray-800'>
												<span className='p-1 mr-2 text-blue-600 bg-blue-100 rounded-md'>
													<Bed className='w-5 h-5' />
												</span>
												{t('amenities')}
											</h2>

											{homestay.amenities?.length > 0 ? (
												<div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
													{homestay.amenities.map((ameniti) => (
														<div
															key={ameniti.id}
															className='flex items-center p-3 transition-colors rounded-lg bg-gray-50 hover:bg-blue-50'
														>
															{getAmenitiesIcon(ameniti.name)}
															<span className='ml-3 font-medium text-gray-700'>
																{ameniti.name}
															</span>
														</div>
													))}
												</div>
											) : (
												<p className='italic text-gray-500'>No amenities listed</p>
											)}
										</div>
									</div>

									<div className='space-y-6'>
										<div>
											<h2 className='flex items-center mb-4 text-xl font-semibold text-gray-800'>
												<span className='p-1 mr-2 text-blue-600 bg-blue-100 rounded-md'>
													<Coffee className='w-5 h-5' />
												</span>
												{t('facilities')}
											</h2>

											{homestay.facility?.length > 0 ? (
												<div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
													{homestay.facility.map((facility) => (
														<div
															key={facility.facilityID}
															className='flex items-center p-3 transition-colors rounded-lg bg-gray-50 hover:bg-blue-50'
														>
															<Check className='w-5 h-5 text-blue-500' />
															<span className='ml-3 font-medium text-gray-700'>
																{facility.name}
															</span>
														</div>
													))}
												</div>
											) : (
												<p className='italic text-gray-500'>No facilities listed</p>
											)}
										</div>
									</div>
								</div>

								<div className='mt-8'>
									<h2 className='flex items-center mb-4 text-xl font-semibold text-gray-800'>
										<span className='p-1 mr-2 text-blue-600 bg-blue-100 rounded-md'>
											<MapPin className='w-5 h-5' />
										</span>
										{t('aboutthisplace')}
									</h2>
									<div className='p-4 bg-gray-50 rounded-xl'>
										<p className='leading-relaxed text-gray-600'>{homestay.description}</p>
									</div>
								</div>
								<div className='mt-8'>
									<h2 className='flex items-center mb-4 text-xl font-semibold text-gray-800'>
										<span className='p-1 mr-2 text-blue-600 bg-blue-100 rounded-md'>
											<Star className='w-5 h-5' />
										</span>
										{t('guestreviews')}
									</h2>

									{homestay.feeback?.length > 0 ? (
										<div className='space-y-4'>
											{homestay.feeback.map((feedback, index) => (
												<div
													key={index}
													className='p-4 transition-all border border-gray-100 bg-gray-50 rounded-xl hover:border-blue-200'
												>
													<div className='flex items-start gap-3'>
														<div className='flex-shrink-0'>
															<div className='relative w-12 h-12 overflow-hidden border-2 border-white rounded-full shadow-sm'>
																{feedback.avatar ? (
																	<Image
																		src={feedback.avatar}
																		alt={feedback.fullName}
																		fill
																		className='object-cover'
																	/>
																) : (
																	<div className='flex items-center justify-center w-full h-full text-lg font-bold text-blue-600 bg-blue-100'>
																		{feedback.fullName.charAt(0)}
																	</div>
																)}
															</div>
														</div>

														<div className='flex-1'>
															<div className='flex flex-wrap items-center justify-between gap-2'>
																<div>
																	<h3 className='font-semibold text-gray-800'>
																		{feedback.fullName}
																	</h3>
																	<p className='text-sm text-gray-500'>
																		{feedback.email}
																	</p>
																</div>

																<div className='flex items-center'>
																	{[...Array(5)].map((_, i) => (
																		<Star
																			key={i}
																			className={`w-4 h-4 ${
																				feedback.rating > i
																					? 'text-yellow-400 fill-yellow-400'
																					: 'text-gray-300'
																			}`}
																		/>
																	))}
																</div>
															</div>

															<div className='mt-2 text-gray-600'>
																<p>{feedback.description}</p>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className='p-6 text-center bg-gray-50 rounded-xl'>
											<MessageSquare className='w-10 h-10 mx-auto text-gray-300' />
											<p className='mt-2 text-gray-500'>No reviews yet for this property</p>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='sticky flex flex-col w-full gap-6 p-6 bg-white border shadow-lg rounded-xl md:w-1/2 lg:w-1/3 h-fit top-24'>
							<div className='pb-6 border-b'>
								<h2 className='mb-1 text-xl font-bold text-gray-800'>{t('bookyourstay')}</h2>
								<p className='text-sm text-gray-500'>{t('selectdatespayment')}</p>
							</div>

							{/* Calendar selection */}
							<div className='flex flex-col gap-3'>
								<AvailableDatesSelector
									availableDates={homestay.calendar || []}
									selectedDates={selectedDates}
									setSelectedDates={setSelectedDates}
									isDisabled={homestay.isBooked}
								/>

								{/* {selectedDates.length > 0 && (
									<div className='flex items-center justify-between px-2 py-1 rounded-lg bg-blue-50'>
										<span className='text-sm text-blue-700'>
											<strong>{selectedDates.length}</strong>{' '}
											{selectedDates.length === 1 ? 'date' : 'dates'} selected
										</span>
										<Button
											variant='ghost'
											className='h-8 p-0 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100'
											onClick={() => setSelectedDates([])}
										>
											Clear
										</Button>
									</div>
								)} */}
							</div>

							{/* Voucher input */}
							<div className='flex flex-col gap-3'>
								<h3 className='flex items-center text-base font-semibold text-gray-700'>
									<Ticket className='w-4 h-4 mr-2 text-blue-500' />
									{t('applyvoucher')}
								</h3>

								<div className='flex flex-col gap-2'>
									<div className='flex gap-2'>
										<input
											type='text'
											value={voucherCode}
											onChange={(e) => setVoucherCode(e.target.value)}
											placeholder={t('applyvoucher')}
											className='flex w-full h-10 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
											disabled={homestay.isBooked}
										/>

										{userVouchers?.length > 0 && (
											<DropdownMenu>
												<DropdownMenuTrigger
													asChild
													disabled={
														homestay.isBooked || vouchersLoading || !userVouchers?.length
													}
												>
													<Button
														variant='outline'
														className='h-10 border-gray-200 hover:bg-gray-50'
													>
														<ChevronDown className='w-4 h-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className='w-64' align='end'>
													<DropdownMenuLabel className='flex items-center text-blue-600'>
														<Ticket className='w-4 h-4 mr-2' />
														{t('applyvoucher')}
													</DropdownMenuLabel>
													<DropdownMenuSeparator />
													{vouchersLoading ? (
														<div className='px-4 py-2 text-sm text-center text-gray-500'>
															Loading vouchers...
														</div>
													) : userVouchers?.length > 0 ? (
														userVouchers.map((voucher) => (
															<DropdownMenuItem
																key={voucher.voucherID}
																onClick={() => handleSelectVoucher(voucher.code)}
																className={`relative cursor-pointer hover:bg-blue-50 ${
																	voucher.isUser
																		? 'cursor-not-allowed opacity-75'
																		: ''
																}`}
																disabled={voucher.isUser}
															>
																<div className='relative flex items-center justify-between w-full'>
																	<div className='flex flex-col'>
																		<span className='font-medium'>
																			{voucher.code}
																		</span>
																		<span className='text-xs text-gray-500'>
																			{voucher.discount}% off
																		</span>
																	</div>

																	{voucher.isUser ? (
																		<div className='flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-full'>
																			<svg
																				xmlns='http://www.w3.org/2000/svg'
																				viewBox='0 0 20 20'
																				fill='currentColor'
																				className='w-3 h-3 mr-1 text-gray-500'
																			>
																				<path
																					fillRule='evenodd'
																					d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z'
																					clipRule='evenodd'
																				/>
																			</svg>
																			Used
																		</div>
																	) : (
																		<Badge
																			variant='outline'
																			className='ml-2 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100'
																		>
																			Apply
																		</Badge>
																	)}
																</div>

																{voucher.isUser && (
																	<div className='absolute inset-0 bg-white pointer-events-none bg-opacity-10'>
																		<div className='absolute top-0 left-0 w-full h-full border-2 border-gray-200 rounded-md opacity-25'></div>
																	</div>
																)}
															</DropdownMenuItem>
														))
													) : (
														<div className='px-4 py-2 text-sm text-center text-gray-500'>
															No vouchers available
														</div>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										)}
									</div>

									{voucherCode && (
										<div className='flex items-center px-3 py-2 text-sm text-green-600 rounded-lg bg-green-50'>
											<Check className='w-4 h-4 mr-2' />
											{t('applyvoucher')}: <span className='font-medium'>{voucherCode}</span>
										</div>
									)}
								</div>
							</div>

							{/* Payment method selection */}
							<div className='flex flex-col gap-3'>
								<h3 className='flex items-center text-base font-semibold text-gray-700'>
									<CreditCard className='w-4 h-4 mr-2 text-blue-500' />
									{t('paymentmethod')}
								</h3>

								<div className='flex flex-col gap-2'>
									<label className='flex items-center p-3 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50'>
										<input
											type='radio'
											checked={isOnline}
											onChange={() => setIsOnline(true)}
											className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
											disabled={homestay.isBooked}
										/>
										<div className='ml-3'>
											<span className='font-medium text-gray-700'>{t('online-payment')}</span>
											<p className='mt-1 text-xs text-gray-500'>
												{('pay-now-with-payOS,QRcode')}
											</p>
										</div>
									</label>

									{/* <label className='flex items-center p-3 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50'>
										<input
											type='radio'
											checked={!isOnline}
											onChange={() => setIsOnline(false)}
											className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
											disabled={homestay.isBooked}
										/>
										<div className='ml-3'>
											<span className='font-medium text-gray-700'>Cash on Arrival</span>
											<p className='mt-1 text-xs text-gray-500'>
												Pay in cash when you arrive at the property
											</p>
										</div>
									</label> */}
								</div>
							</div>
							{selectedCheckIn && (
								<div className="mt-2">
									<CancelPolicy checkInDate={selectedCheckIn.date} />
								</div>
								)}
							{/* Status indicators and booking button */}
							{homestay.isBooked && (
								<div className='flex items-center justify-center p-4 text-sm font-medium text-center text-red-600 border border-red-200 rounded-lg bg-red-50'>
									<span className='w-2 h-2 mr-2 bg-red-500 rounded-full animate-pulse'></span>
									This homestay is currently booked and unavailable
								</div>
							)}

							{priceForToday !== null && !homestay.isBooked && selectedDates.length > 0 && (
								<div className='flex items-center justify-between p-4 border border-blue-100 rounded-lg bg-blue-50'>
									<div>
										<p className='text-sm text-gray-500'>{t('total-for')} {(selectedDates.length-1)} {t('nights')}</p>
										<p className='text-xl font-bold text-gray-800'>
											{(priceForToday * (selectedDates.length-1)).toLocaleString()}VND
										</p>
									</div>
									{voucherCode && (
										<Badge className='py-1 text-green-600 bg-green-100'>Discount applied</Badge>
									)}
								</div>
							)}

							<Button
								className='flex items-center justify-center w-full gap-2 py-6 mt-2 text-white transition-all duration-300 bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl hover:shadow-lg'
								onClick={handleBookNow}
								disabled={
									bookingMutation.isPending ||
									!priceData ||
									homestay.isBooked ||
									selectedDates.length === 0
								}
							>
								{bookingMutation.isPending ? (
									<>
										<Loader2 className='w-5 h-5 animate-spin' />
										Processing...
									</>
								) : homestay.isBooked ? (
									<>
										<span className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
										Not Available
									</>
								) : selectedDates.length === 0 ? (
									<>
										<Calendar className='w-5 h-5' />
										Select dates to book
									</>
								) : (
									<>
										<DollarSign className='w-5 h-5' />
										{t('booknow')}
									</>
								)}
							</Button>

							{/* <p className='px-4 text-xs text-center text-gray-500'>
								You won't be charged yet. Review your booking details before confirming.
							</p> */}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	))
};

export default HomeStayDetail;