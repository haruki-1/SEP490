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

export default function ProfilePage() {
	const { dataProfile, refetch } = useAuth();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState('profile');
	const [isMounted, setIsMounted] = useState(false);
	const [statusFilter, setStatusFilter] = useState('All');
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [selectedHomeStay, setSelectedHomeStay] = useState(null);

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
		? bookings.filter((booking) => {
				if (statusFilter === 'All') return true;
				return booking.status === statusFilter;
		  })
		: [];

	// Calculate booking statistics
	const getBookingStats = () => {
		if (!bookings || !Array.isArray(bookings) || bookings.length === 0) return null;

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
						<h1 className='text-2xl font-bold'>Account Dashboard</h1>
						<p className='text-gray-500'>Manage your profile, bookings and vouchers</p>
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
												alt='Avatar'
												className='object-cover w-full h-full'
											/>
										) : (
											<div className='flex items-center justify-center w-full h-full text-3xl text-gray-600 bg-gray-200'>
												<User size={40} />
											</div>
										)}
									</div>
									<CardTitle>{profile.fullName || 'User'}</CardTitle>
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
											Profile
										</Button>
										<Button
											variant={activeTab === 'security' ? 'default' : 'ghost'}
											className='justify-start w-full'
											onClick={() => setActiveTab('security')}
										>
											<ShieldCheck className='w-4 h-4 mr-2' />
											Security
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
										<CardTitle>Profile Information</CardTitle>
										<CardDescription>Manage your personal information</CardDescription>
									</CardHeader>
									<CardContent>
										<form onSubmit={handleProfileSubmit} className='space-y-4'>
											<div className='space-y-2'>
												<Label htmlFor='avatar'>Profile Photo</Label>
												<div className='flex flex-col items-center w-full gap-2'>
													{profile.avatar && isMounted && (
														<div className='relative w-32 h-32 overflow-hidden rounded-md'>
															<Image
																src={profile.avatar}
																fill
																alt='Avatar'
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
												<Label htmlFor='fullName'>Full Name</Label>
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
												<Label htmlFor='email'>Email</Label>
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
												<Label htmlFor='phone'>Phone</Label>
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
												<Label htmlFor='address'>Address</Label>
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
											{isEditing ? 'Save Changes' : 'Edit Profile'}
										</Button>
									</CardFooter>
								</Card>
							)}

							{/* Bookings Tab */}
							{activeTab === 'bookings' && (
								<Card>
									<CardHeader>
										<CardTitle>My Bookings</CardTitle>
										<CardDescription>View and manage your homestay bookings</CardDescription>

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
																<div className='text-xs font-medium capitalize'>
																	{stat}
																</div>
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
										<div className='flex flex-wrap items-center justify-between mt-4'>
											<div className='text-sm text-gray-500'>Filter by status:</div>
											<div className='flex flex-wrap gap-2 mt-2 sm:mt-0'>
												{['All', 'Pending', 'Completed', 'Canceled', 'Confirmed'].map(
													(status) => (
														<Badge
															key={status}
															variant={statusFilter === status ? 'default' : 'outline'}
															className={`cursor-pointer ${
																statusFilter === status
																	? 'bg-primary'
																	: 'hover:bg-primary/10'
															}`}
															onClick={() => setStatusFilter(status)}
														>
															{status}
														</Badge>
													)
												)}
											</div>
										</div>
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
															No {statusFilter !== 'All' ? statusFilter : ''} bookings
															found
														</h3>
														<p className='mt-2 text-gray-500'>
															{statusFilter !== 'All'
																? `You don't have any bookings with "${statusFilter}" status.`
																: "You haven't made any homestay bookings yet."}
														</p>
														{statusFilter !== 'All' && (
															<Button
																variant='outline'
																className='mt-4'
																onClick={() => setStatusFilter('All')}
															>
																Show All Bookings
															</Button>
														)}
													</>
												) : (
													<>
														<Home className='w-10 h-10 mx-auto text-gray-400' />
														<h3 className='mt-4 text-lg font-medium'>No bookings yet</h3>
														<p className='mt-2 text-gray-500'>
															You haven't made any homestay bookings yet. Start exploring
															available properties!
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
																				<p className='text-sm text-gray-500'>
																					Check-in
																				</p>
																				<p className='flex items-center text-sm'>
																					<Calendar className='w-4 h-4 mr-1' />
																					{booking.checkInDate}
																				</p>
																			</div>
																			<div>
																				<p className='text-sm text-gray-500'>
																					Check-out
																				</p>
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
																							: booking.status ===
																							  'Canceled'
																							? 'bg-red-100 text-red-800'
																							: booking.status ===
																							  'Pending'
																							? 'bg-yellow-100 text-yellow-800'
																							: 'bg-blue-100 text-blue-800'
																					} hover:bg-transparent`}
																				>
																					{booking.status}
																				</Badge>
																				{booking.status === 'Canceled' && (
																					<div className='flex items-center gap-2 text-sm'>
																						Reason:
																						<p className='line-clamp-1'>
																							{booking.reasonCancel}
																						</p>
																					</div>
																				)}
																			</div>
																			<p className='text-xl font-bold'>
																				${booking.totalPrice?.toLocaleString()}
																			</p>
																		</div>
																		<div className='flex mt-3 space-x-2'>
																			{(booking.status === 'Pending' ||
																				booking.status === 'Confirmed') && (
																				<Button
																					size='sm'
																					variant='destructive'
																					onClick={() =>
																						handleCancelBooking(
																							booking.bookingID
																						)
																					}
																				>
																					Cancel Booking
																				</Button>
																			)}
																			{booking.status === 'Completed' && (
																				<Button
																					size='sm'
																					variant='default'
																					onClick={() =>
																						handleOpenFeedbackModal(booking)
																					}
																				>
																					Leave Feedback
																				</Button>
																			)}
																			{selectedHomeStay && (
																				<FeedbackModal
																					isOpen={feedbackModalOpen}
																					onClose={() =>
																						setFeedbackModalOpen(false)
																					}
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
										<CardTitle>My Vouchers</CardTitle>
										<CardDescription>View and manage your discount vouchers</CardDescription>
									</CardHeader>
									<CardContent>
										{vouchersLoading ? (
											<div className='flex items-center justify-center h-40'>
												<div className='w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin'></div>
											</div>
										) : !userVouchers || userVouchers.length === 0 ? (
											<div className='p-6 text-center rounded-lg bg-gray-50'>
												<Ticket className='w-10 h-10 mx-auto text-gray-400' />
												<h3 className='mt-4 text-lg font-medium'>No vouchers available</h3>
												<p className='mt-2 text-gray-500'>
													You don't have any vouchers at the moment. Check back later for
													promotions!
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
																<span className='font-mono text-lg'>
																	{voucher.code}
																</span>
																<Badge variant='outline' className='text-lg'>
																	{voucher.discount}% OFF
																</Badge>
															</CardTitle>
															<div className='grid gap-2'>
																<div className='flex items-center text-sm text-gray-600'>
																	<Info className='w-4 h-4 mr-2' />
																	{voucher.description}
																</div>
																<div className='flex items-center text-sm text-gray-600'>
																	<Clock className='w-4 h-4 mr-2' />
																	Expires:{' '}
																	{voucher.endDate
																		? formatDate(voucher.endDate)
																		: 'No expiration'}
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
																<Link href='/'>Use Now</Link>
															</Button>
														</CardFooter>
													</Card>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							)}

							{/* Security Tab */}
							{activeTab === 'security' && (
								<Card>
									<CardHeader>
										<CardTitle>Account Security</CardTitle>
										<CardDescription>Update your password and security settings</CardDescription>
									</CardHeader>
									<CardContent>
										<form onSubmit={handlePasswordSubmit} className='space-y-4'>
											<div className='space-y-2'>
												<Label htmlFor='oldPassword'>Current Password</Label>
												<div className='relative'>
													<Input
														id='oldPassword'
														name='oldPassword'
														type={showPassword.oldPassword ? 'text' : 'password'}
														value={passwordData.oldPassword}
														onChange={handlePasswordChange}
														required
														placeholder='Enter your current password'
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
												<Label htmlFor='newPassword'>New Password</Label>
												<div className='relative'>
													<Input
														id='newPassword'
														name='newPassword'
														type={showPassword.newPassword ? 'text' : 'password'}
														value={passwordData.newPassword}
														onChange={handlePasswordChange}
														required
														placeholder='Enter a new password'
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
													Password should be at least 8 characters long with a mix of letters,
													numbers and symbols.
												</p>
											</div>

											<Button type='submit' disabled={changePassLoading} className='w-full mt-4'>
												{changePassLoading ? 'Updating Password...' : 'Update Password'}
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
