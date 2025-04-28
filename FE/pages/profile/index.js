'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/components/ui/card';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { useAuth } from 'context/AuthProvider';
import { Textarea } from '@/components/components/ui/textarea';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { updateProfile } from 'pages/api/auth/updateProfile';
import { Eye, EyeOff, User, ShieldCheck, Calendar, Home, MapPin, Ticket, CreditCard, Clock, Info } from 'lucide-react';
import { changePassword } from 'pages/api/auth/changePassword';
import Image from 'next/image';
import { uploadImage } from 'pages/api/image/uploadImage';
import MainLayout from '../layout';
import { Badge } from '@/components/components/ui/badge';
import Link from 'next/link';
import { getUserVouchers } from 'pages/api/voucher/getUserVouchers';
import { getBookingHistory } from 'pages/api/homestay/getHomeStayByUser';
import { cancelBooking } from 'pages/api/booking/cancelBooking';
import FeedbackModal from '@/components/FeedbackModal';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
	const { dataProfile, refetch } = useAuth();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState('profile');
	const [isMounted, setIsMounted] = useState(false);
	const [statusFilter, setStatusFilter] = useState('All');
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [selectedHomeStay, setSelectedHomeStay] = useState(null);
	const router = useRouter();
	const { t } = useTranslation();


	// Profile state
	const [profile, setProfile] = useState({
		fullName: '',
		email: '',
		phone: '',
		address: '',
		roleId: '',
		avatar: '',
	});

	// Password state
	const [passwordData, setPasswordData] = useState({
		oldPassword: '',
		newPassword: '',
	});

	const [showPassword, setShowPassword] = useState({
		oldPassword: false,
		newPassword: false,
	});

	const [isEditing, setIsEditing] = useState(false);

	// Fetch user's vouchers - using the existing format from your code
	const { data: userVouchers, isLoading: vouchersLoading } = useQuery({
		queryKey: ['userVouchers'],
		queryFn: getUserVouchers,
		enabled: isMounted && !!dataProfile?.id,
	});

	// Fetch user's bookings
	const {
		data: bookings,
		isLoading: bookingsLoading,
		error: bookingsError,
	} = useQuery({
		queryKey: ['historyBooking'],
		queryFn: getBookingHistory,
		enabled: isMounted && !!dataProfile?.id,
	});

	const handleOpenFeedbackModal = (booking) => {
		setSelectedHomeStay({
			id: booking.homeStay.id || booking.homestayID,
			name: booking.homeStay.name || 'Homestay',
		});
		setFeedbackModalOpen(true);
	};

	// Filter bookings based on selected status
	const filteredBookings = Array.isArray(bookings)
	? bookings.filter(
			(booking) => statusFilter === 'All' || booking.status === statusFilter
		)
	: [];

	// Calculate booking statistics
	const getBookingStats = () => {
		if (!bookings || bookings.length === 0) return null;

		const stats = {
			total: bookings.length,
			pending: bookings.filter((b) => b.status === 'Pending').length,
			completed: bookings.filter((b) => b.status === 'Completed').length,
			canceled: bookings.filter((b) => b.status === 'Canceled').length,
			confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
			paid: bookings.filter((b) => b.status === 'Paid').length,
		};

		return stats;
	};

	const handleCancelBooking = (bookingId) => {
		Swal.fire({
			title: 'Cancel Booking',
			text: 'Please provide a reason for cancellation:',
			input: 'textarea',
			inputPlaceholder: 'Enter your reason here...',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, cancel it!',
			cancelButtonText: 'No, keep it',
			inputValidator: (value) => {
				if (!value) {
					return 'You need to provide a reason for cancellation!';
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const reasonCancel = result.value;
				Swal.fire({
					title: 'Cancelling...',
					text: 'Processing your request',
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});

				cancelBooking(bookingId, reasonCancel)
					.then(() => {
						Swal.fire({
							title: 'Cancelled!',
							text: 'Your booking has been cancelled successfully.',
							icon: 'success',
						});

						queryClient.invalidateQueries({ queryKey: ['historyBooking'] });
					})
					.catch((error) => {
						console.error('Error cancelling booking:', error);
						Swal.fire({
							title: 'Error!',
							text: error?.response?.data?.message || 'Failed to cancel the booking. Please try again.',
							icon: 'error',
						});
					});
			}
		});
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (dataProfile) {
			setProfile({
				fullName: dataProfile.fullName || '',
				email: dataProfile.email || '',
				phone: dataProfile.phone || '',
				address: dataProfile.address || '',
				roleId: dataProfile.roleId || '',
				avatar: dataProfile.avatar || '',
			});
		}
	}, [dataProfile]);

	const {
		mutate: mutateUpdateProfile,
		isLoading,
		isError,
		error,
	} = useMutation({
		mutationFn: async (profileData) => {
			const response = await updateProfile(dataProfile.id, profileData);
			return response;
		},
		onSuccess: () => {
			refetch();
			queryClient.invalidateQueries({ queryKey: ['dataProfile'] });
			Swal.fire({
				title: 'Success!',
				text: 'Profile updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsEditing(false);
		},
		onError: (error) => {
			console.error('Error updating profile:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error updating your profile.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleProfileChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const imageUrl = await uploadImage(file);
			const avatar = imageUrl?.url;
			setProfile((prev) => ({ ...prev, avatar: avatar }));
			toast.success('Image uploaded successfully!');
		} catch {
			toast.error('Image upload failed.');
		}
	};

	const toggleShowPassword = (field) => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handlePasswordChange = (e) => {
		setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
	};

	const handleProfileSubmit = (e) => {
		e.preventDefault();

		if (!isEditing) {
			setIsEditing(true);
			return;
		}

		mutateUpdateProfile(profile);
	};

	const { mutate: mutateChangePassword, isLoading: changePassLoading } = useMutation({
		mutationFn: async ({ email, oldPassword, newPassword }) => {
			return await changePassword(email, oldPassword, newPassword);
		},
		onSuccess: () => {
			toast.success('Your password has been successfully updated.');
			setPasswordData({ oldPassword: '', newPassword: '' });
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.message || 'Failed to change password.';
			toast.error(errorMessage);
		},
	});

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (!passwordData.oldPassword || !passwordData.newPassword) {
			toast.warning('Please fill in all fields.');
			return;
		}
		mutateChangePassword({
			email: dataProfile.email,
			oldPassword: passwordData.oldPassword,
			newPassword: passwordData.newPassword,
		});
	};

	const formatDate = (dateString) => {
		if (!isMounted) return '';
		return new Date(dateString).toLocaleDateString('vi', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	return (
		<MainLayout>
				<div className='sec-com'>
					<div className='container-lg'>
					<div className='mb-6'>
						<h1 className='text-2xl font-bold'>{t('account-dashboard-title')}</h1> 
						<p className='text-gray-500'>{t('account-dashboard-subtitle')}</p> 
					</div>

					<div className='grid gap-6 md:grid-cols-4'>
						{/* Profile summary sidebar */}
						<div className='md:col-span-1'>
						<Card className='sticky top-24'>
							<CardHeader className='flex flex-col items-center'>
							<div className='w-24 h-24 mb-4 overflow-hidden rounded-full'>
								{isMounted && profile.avatar ? (
								<Image
									src={profile.avatar}
									width={96}
									height={96}
									alt={t('avatar-alt')} 
									className='object-cover w-full h-full'
								/>
								) : (
								<div className='flex items-center justify-center w-full h-full text-3xl text-gray-600 bg-gray-200'>
									<User size={40} />
								</div>
								)}
							</div>
							<CardTitle>{profile.fullName || t('user-default')}</CardTitle> 
							<CardDescription>{profile.email}</CardDescription>
							{dataProfile?.role && (
								<Badge className='mt-2' variant='outline'>
								<ShieldCheck className='w-3.5 h-3.5 mr-1' />
								{dataProfile.role}
								</Badge>
							)}
							</CardHeader>
							<CardContent>
							<nav className='space-y-2'>
								<Button
								variant={activeTab === 'profile' ? 'default' : 'ghost'}
								className='justify-start w-full'
								onClick={() => setActiveTab('profile')}
								>
								<User className='w-4 h-4 mr-2' />
								{t('profile-tab')} 
								</Button>
								<Button
								variant={activeTab === 'bookings' ? 'default' : 'ghost'}
								className='justify-start w-full'
								onClick={() => setActiveTab('bookings')}
								>
								<Home className='w-4 h-4 mr-2' />
								{t('bookings-tab')} 
								</Button>
								<Button
								variant={activeTab === 'vouchers' ? 'default' : 'ghost'}
								className='justify-start w-full'
								onClick={() => setActiveTab('vouchers')}
								>
								<Ticket className='w-4 h-4 mr-2' />
								{t('vouchers-tab')} 
								</Button>
								<Button
								variant={activeTab === 'myhomestay' ? 'default' : 'ghost'}
								className='justify-start w-full'
								onClick={() => setActiveTab('myhomestay')}
								>
								<Home className='w-4 h-4 mr-2' />
								{t('myhomestay-tab')} 
								</Button>
								<Button
								variant={activeTab === 'security' ? 'default' : 'ghost'}
								className='justify-start w-full'
								onClick={() => setActiveTab('security')}
								>
								<ShieldCheck className='w-4 h-4 mr-2' />
								{t('security-tab')} 
								</Button>
							</nav>
							</CardContent>
						</Card>
						</div>

						{/* Main content area */}
						<div className='md:col-span-3'>
						{/* Profile Tab */}
						{activeTab === 'profile' && (
							<Card>
							<CardHeader>
								<CardTitle>{t('profile-info-title')}</CardTitle> 
								<CardDescription>{t('profile-info-description')}</CardDescription> 
							</CardHeader>
							<CardContent>
								<form onSubmit={handleProfileSubmit} className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='avatar'>{t('profile-photo')}</Label> 
									<div className='flex flex-col items-center w-full gap-2'>
									{profile.avatar && isMounted && (
										<div className='relative w-32 h-32 overflow-hidden rounded-md'>
										<Image
											src={profile.avatar}
											fill
											alt={t('avatar-alt')}
											className='object-cover'
										/>
										</div>
									)}
									<Input
										id='avatar'
										type='file'
										accept='image/*'
										onChange={handleImageChange}
										disabled={!isEditing}
										className={isEditing ? 'cursor-pointer' : 'cursor-not-allowed'}
									/>
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='fullName'>{t('full-name')}</Label> 
									<Input
									id='fullName'
									name='fullName'
									value={profile.fullName}
									onChange={handleProfileChange}
									disabled={!isEditing}
									required
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>{t('email')}</Label> 
									<Input
									id='email'
									name='email'
									type='email'
									value={profile.email}
									onChange={handleProfileChange}
									disabled={!isEditing}
									required
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='phone'>{t('phone')}</Label> 
									<Input
									id='phone'
									name='phone'
									type='tel'
									value={profile.phone}
									onChange={handleProfileChange}
									disabled={!isEditing}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='address'>{t('address')}</Label> 
									<Textarea
									id='address'
									name='address'
									value={profile.address}
									onChange={handleProfileChange}
									disabled={!isEditing}
									/>
								</div>
								</form>
							</CardContent>
							<CardFooter className='flex justify-end'>
								<Button onClick={handleProfileSubmit} disabled={isLoading}>
								{isEditing ? t('save-changes') : t('edit-profile')}
								</Button>
							</CardFooter>
							</Card>
						)}
							{/* Bookings Tab */}
							{activeTab === 'bookings' && (
							<Card>
								<CardHeader>
								<CardTitle>{t('my-bookings')}</CardTitle>
								<CardDescription>{t('my-bookings-description')}</CardDescription>
							{/* Booking Statistics */}
							{bookings && bookings.length > 0 && (
								<div className='grid grid-cols-3 gap-2 mt-4 sm:grid-cols-5'>
								{['total', 'pending', 'completed', 'canceled', 'paid'].map((stat) => {
									const stats = getBookingStats();
									if (!stats) return null;

									const count = stats[stat];
									const statColor =
									stat === 'total'
										? 'bg-blue-50 text-blue-700 border-blue-200'
										: stat === 'pending'
										? 'bg-yellow-50 text-yellow-700 border-yellow-200'
										: stat === 'completed'
										? 'bg-green-50 text-green-700 border-green-200'
										: stat === 'canceled'
										? 'bg-red-50 text-red-700 border-red-200'
										: stat === 'paid'
										? 'bg-purple-50 text-purple-700 border-purple-200'
										: 'bg-gray-50 text-gray-700 border-gray-200';

									const statIcon =
									stat === 'total' ? (
										<Home className='w-4 h-4' />
									) : stat === 'pending' ? (
										<Clock className='w-4 h-4' />
									) : stat === 'completed' ? (
										<ShieldCheck className='w-4 h-4' />
									) : (
										<Info className='w-4 h-4' />
									);

									return (
									<div
										key={stat}
										className={`border rounded-md p-3 flex items-center justify-between ${statColor}`}
										onClick={() =>
										setStatusFilter(
											stat === 'total'
											? 'All'
											: stat.charAt(0).toUpperCase() + stat.slice(1)
										)
										}
										style={{ cursor: 'pointer' }}
									>
										<div>
										<div className='text-xs font-medium capitalize'>{stat}</div>
										<div className='text-xl font-bold'>{count}</div>
										</div>
										<div className='p-2 rounded-full bg-white/50'>
										{statIcon}
										</div>
									</div>
									);
								})}
								</div>
							)}

							{/* Status Filter */}
							
							</CardHeader>
							<CardContent>
							{bookingsLoading ? (
								<div className='flex items-center justify-center h-40'>
								<div className='w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin'></div>
								</div>
							) : bookingsError ? (
								<div className='p-4 text-red-500'>
								Error loading bookings. Please try again later.
								</div>
							) : !filteredBookings || filteredBookings.length === 0 ? (
								<div className='p-6 text-center rounded-lg bg-gray-50'>
								{bookings && bookings.length > 0 ? (
									<>
									<Home className='w-10 h-10 mx-auto text-gray-400' />
									<h3 className='mt-4 text-lg font-medium'>
										{t('no-bookings-found', { statusFilter })}
									</h3>
									<p className='mt-2 text-gray-500'>
										{t(
										'no-bookings-description',
										{
											statusFilter:
											statusFilter !== 'All'
												? `"${statusFilter}" status`
												: '',
										}
										)}
									</p>
									{statusFilter !== 'All' && (
										<Button
										variant='outline'
										className='mt-4'
										onClick={() => setStatusFilter('All')}
										>
										{t('show-all-bookings')}
										</Button>
									)}
									</>
								) : (
									<>
									<Home className='w-10 h-10 mx-auto text-gray-400' />
									<h3 className='mt-4 text-lg font-medium'>{t('no-bookings')}</h3>
									<p className='mt-2 text-gray-500'>
										You haven't made any homestay bookings yet. Start exploring available properties!
									</p>
									<Button className='mt-4' asChild>
										<Link href='/'>Browse Homestays</Link>
									</Button>
									</>
								)}
								</div>
							) : (
								<div className='space-y-4'>
								{filteredBookings.map((booking) => (
									<Card
									key={booking.id || booking.bookingID}
									className='overflow-hidden'
									>
									<div className='flex flex-col md:flex-row'>
										<div className='relative w-full h-48 md:w-1/3'>
										{booking.homeStay?.mainImage ? (
											<Image
											src={booking.homeStay?.mainImage}
											alt='homestay-history'
											fill
											className='object-cover'
											/>
										) : (
											<div className='flex items-center justify-center w-full h-full bg-gray-200'>
											<Home className='w-12 h-12 text-gray-400' />
											</div>
										)}
										</div>
										<div className='flex-1 p-4'>
										<div className='flex flex-col justify-between h-full'>
											<div>
											<h3 className='text-lg font-semibold'>
												{booking.homeStay?.name || 'Homestay'}
											</h3>
											<div className='flex items-center mt-1 text-sm text-gray-500'>
												<MapPin className='w-4 h-4 mr-1' />
												<span>{booking.homeStay?.address}</span>
											</div>

											<div className='grid grid-cols-2 gap-4 mt-4'>
												<div>
												<p className='text-sm text-gray-500'>{t('check-in')}</p>
												<p className='flex items-center text-sm'>
													<Calendar className='w-4 h-4 mr-1' />
													{booking.checkInDate}
												</p>
												</div>
												<div>
												<p className='text-sm text-gray-500'>{t('check-out')}</p>
												<p className='flex items-center text-sm'>
													<Calendar className='w-4 h-4 mr-1' />
													{booking.checkOutDate}
												</p>
												</div>
											</div>
											</div>

											<div className='flex flex-wrap items-center justify-between mt-4'>
											<div className='flex items-center justify-between w-full'>
												<div className='flex items-center gap-2'>
												<Badge
													className={`${
													booking.status === 'Completed'
														? 'bg-green-100 text-green-800'
														: booking.status === 'Canceled'
														? 'bg-red-100 text-red-800'
														: booking.status === 'Pending'
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-blue-100 text-blue-800'
													} hover:bg-transparent`}
												>
													{booking.status}
												</Badge>
												{booking.status === 'Canceled' && (
													<div className='flex items-center gap-2 text-sm'>
													{t('reason-cancel')}
													<p className='line-clamp-1'>{booking.reasonCancel}</p>
													</div>
												)}
												</div>
												<p className='text-xl font-bold'>
												{booking.totalPrice?.toLocaleString()}
												</p>
											</div>
											<div className='flex mt-3 space-x-2'>
												{booking.status === 'Paid' && (
												<Button
													size='sm'
													variant='destructive'
													onClick={() =>
													handleCancelBooking(booking.bookingID)
													}
												>
													{t('cancel-booking')}
												</Button>
												)}
												{booking.status === 'Completed' && (
												<Button
													size='sm'
													variant='default'
													onClick={() => handleOpenFeedbackModal(booking)}
												>
													{t('leave-feedback')}
												</Button>
												)}
												{selectedHomeStay && (
												<FeedbackModal
													isOpen={feedbackModalOpen}
													onClose={() => setFeedbackModalOpen(false)}
													homestayID={selectedHomeStay.id}
													homestayName={selectedHomeStay.name}
												/>
												)}
											</div>
											</div>
										</div>
										</div>
									</div>
									</Card>
								))}
								</div>
							)}
							</CardContent>
						</Card>
						)}

							{/* Vouchers Tab - Using the existing userVouchers */}
							{activeTab === 'vouchers' && (
							<Card>
								<CardHeader>
								<CardTitle>{t('my-vouchers')}</CardTitle>
								<CardDescription>{t('manage-vouchers')}</CardDescription>
								</CardHeader>
								<CardContent>
								{vouchersLoading ? (
									<div className='flex items-center justify-center h-40'>
									<div className='w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin'></div>
									</div>
								) : !userVouchers || userVouchers.length === 0 ? (
									<div className='p-6 text-center rounded-lg bg-gray-50'>
									<Ticket className='w-10 h-10 mx-auto text-gray-400' />
									<h3 className='mt-4 text-lg font-medium'>{t('no-vouchers')}</h3>
									<p className='mt-2 text-gray-500'>
										{t('no-vouchers-description')}
									</p>
									</div>
								) : (
									<div className='grid gap-4 sm:grid-cols-2'>
									{userVouchers.map((voucher) => (
										<Card
										key={voucher.voucherID}
										className='relative overflow-hidden border-2 border-dashed'
										>
										<CardHeader className='relative bg-blue-50 h-36'>
											<div className='absolute inset-0 z-0'>
											<Image
												src={voucher.image}
												width={400}
												height={300}
												alt='voucher-image'
												className='object-cover w-full h-full'
											/>
											</div>
										</CardHeader>
										<CardContent className='p-4'>
											<CardTitle className='relative z-20 flex items-center justify-between'>
											<span className='font-mono text-lg'>{voucher.code}</span>
											<Badge variant='outline' className='text-lg'>
												{voucher.discount}% {t('off')}
											</Badge>
											</CardTitle>
											<div className='grid gap-2'>
											<div className='flex items-center text-sm text-gray-600'>
												<Info className='w-4 h-4 mr-2' />
												{voucher.description}
											</div>
											<div className='flex items-center text-sm text-gray-600'>
												<Clock className='w-4 h-4 mr-2' />
												{t('expires')}: {voucher.endDate ? formatDate(voucher.endDate) : t('no-expiration')}
											</div>
											</div>
										</CardContent>
										<CardFooter>
											<Button
											variant='outline'
											size='sm'
											className='w-full'
											asChild
											>
											<Link href='/'>{t('use-now')}</Link>
											</Button>
										</CardFooter>
										</Card>
									))}
									</div>
								)}
								</CardContent>
							</Card>
							)}

							{/* My Homestay Tab */}
							{activeTab === 'myhomestay' && (
							<Card>
								<CardHeader>
								<CardTitle>{t('my-homestay')}</CardTitle>
								<CardDescription>{t('view-homestays-paid')}</CardDescription>
								</CardHeader>
								<CardContent>
								{bookingsLoading ? (
									<div className='flex items-center justify-center h-40'>
									<div className='w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin'></div>
									</div>
								) : bookingsError ? (
									<div className='p-4 text-red-500'>{t('error-loading-bookings')}</div>
								) : (
									<div className='space-y-4'>
									{bookings?.filter(b => b.status === 'Paid').length === 0 ? (
										<div className='p-6 text-center rounded-lg bg-gray-50'>
										<Home className='w-10 h-10 mx-auto text-gray-400' />
										<h3 className='mt-4 text-lg font-medium'>{t('no-homestays')}</h3>
										<p className='mt-2 text-gray-500'>{t('no-homestays-description')}</p>
										</div>
									) : (
										bookings?.filter(b => b.status === 'Paid').map((booking) => (
										<Card
											key={booking.id || booking.bookingID}
											className='overflow-hidden hover:shadow-lg cursor-pointer'
											onClick={() => router.push(`/profile/view-detail/${booking.UserID}?bookingId=${booking.bookingID}`)}
										>
											<div className='flex flex-col md:flex-row'>
											<div className='relative w-full h-48 md:w-1/3'>
												{booking.homeStay?.mainImage ? (
												<Image
													src={booking.homeStay?.mainImage}
													alt='homestay'
													fill
													className='object-cover'
												/>
												) : (
												<div className='flex items-center justify-center w-full h-full bg-gray-200'>
													<Home className='w-12 h-12 text-gray-400' />
												</div>
												)}
											</div>
											<div className='flex-1 p-4'>
												<div className='flex flex-col justify-between h-full'>
												<div>
													<h3 className='text-lg font-semibold'>{booking.homeStay?.name || t('homestay')}</h3>
													<p className='text-sm text-gray-500'>{booking.homeStay?.address}</p>
												</div>
												</div>
											</div>
											</div>
										</Card>
										))
									)}
									</div>
								)}
								</CardContent>
							</Card>
							)}

							{/* Security Tab */}
							{activeTab === 'security' && (
							<Card>
								<CardHeader>
								<CardTitle>{t('account-security')}</CardTitle>
								<CardDescription>{t('update-password-settings')}</CardDescription>
								</CardHeader>
								<CardContent>
								<form onSubmit={handlePasswordSubmit} className='space-y-4'>
									<div className='space-y-2'>
									<Label htmlFor='oldPassword'>{t('current-password')}</Label>
									<div className='relative'>
										<Input
										id='oldPassword'
										name='oldPassword'
										type={showPassword.oldPassword ? 'text' : 'password'}
										value={passwordData.oldPassword}
										onChange={handlePasswordChange}
										required
										placeholder={t('enter-current-password')}
										/>
										<button
										type='button'
										className='absolute transform -translate-y-1/2 right-2 top-1/2'
										onClick={() => toggleShowPassword('oldPassword')}
										>
										{showPassword.oldPassword ? (
											<EyeOff size={18} className='text-gray-500' />
										) : (
											<Eye size={18} className='text-gray-500' />
										)}
										</button>
									</div>
									</div>
									<div className='space-y-2'>
									<Label htmlFor='newPassword'>{t('new-password')}</Label>
									<div className='relative'>
										<Input
										id='newPassword'
										name='newPassword'
										type={showPassword.newPassword ? 'text' : 'password'}
										value={passwordData.newPassword}
										onChange={handlePasswordChange}
										required
										placeholder={t('enter-new-password')}
										/>
										<button
										type='button'
										className='absolute transform -translate-y-1/2 right-2 top-1/2'
										onClick={() => toggleShowPassword('newPassword')}
										>
										{showPassword.newPassword ? (
											<EyeOff size={18} className='text-gray-500' />
										) : (
											<Eye size={18} className='text-gray-500' />
										)}
										</button>
									</div>
									<p className='text-xs text-gray-500'>
										{t('password-info')}
									</p>
									</div>

									<Button type='submit' disabled={changePassLoading} className='w-full mt-4'>
									{changePassLoading ? t('updating-password') : t('update-password')}
									</Button>
								</form>
								</CardContent>
							</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}