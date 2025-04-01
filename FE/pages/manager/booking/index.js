import React, { useState } from 'react';
import AdminLayout from '../layout';
import { getBookingByHomeStay } from '@/pages/api/booking/bookingHomeStay';
import { confirmBookingStatus } from '@/pages/api/booking/confirmBookingStatus';
import { cancelBooking } from '@/pages/api/booking/cancelBooking';
import { exportBookings } from '@/pages/api/booking/exportBookings'; // Import the export API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthProvider';
import { getHomeStayByUser } from '@/pages/api/booking/bookingByUser';
import Image from 'next/image';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { Textarea } from '@/components/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar';

const BookingHomestay = () => {
	const [selectedHomeStayId, setSelectedHomeStayId] = useState('');
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);
	const [cancelReason, setCancelReason] = useState('');
	const [isExporting, setIsExporting] = useState(false);

	const { dataProfile } = useAuth();
	const queryClient = useQueryClient();

	const {
		data: homestays,
		isLoading: isLoadingHomestays,
		isError: isErrorHomestays,
		error: errorHomestays,
	} = useQuery({
		queryKey: ['userHomestays', dataProfile?.id],
		queryFn: () => getHomeStayByUser(dataProfile?.id),
		enabled: !!dataProfile?.id,
		refetchOnWindowFocus: false,
	});

	// Fetch bookings for selected homestay
	const {
		data: bookings,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['bookings', selectedHomeStayId],
		queryFn: () => getBookingByHomeStay(selectedHomeStayId),
		enabled: !!selectedHomeStayId,
		refetchOnWindowFocus: false,
	});

	// Mutation for updating booking status
	const statusMutation = useMutation({
		mutationFn: (bookingId) => confirmBookingStatus(bookingId),
		onSuccess: () => {
			queryClient.invalidateQueries(['bookings', selectedHomeStayId]);
			toast.success('Booking status updated successfully');
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update booking status');
		},
	});

	// Mutation for canceling a booking
	const cancelMutation = useMutation({
		mutationFn: ({ bookingID, reasonCancel }) => cancelBooking(bookingID, reasonCancel),
		onSuccess: () => {
			queryClient.invalidateQueries(['bookings', selectedHomeStayId]);
			toast.success('Booking canceled successfully');
			setCancelDialogOpen(false);
			setCancelReason('');
			setSelectedBookingId(null);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to cancel booking');
		},
	});

	const handleHomeStaySelect = (id) => {
		setSelectedHomeStayId(id);
	};

	const handleRefresh = () => {
		refetch();
	};

	const handleUpdateStatus = (bookingId) => {
		statusMutation.mutate(bookingId);
	};

	const openCancelDialog = (bookingId) => {
		setSelectedBookingId(bookingId);
		setCancelDialogOpen(true);
	};

	const handleCancelBooking = () => {
		if (!cancelReason.trim()) {
			toast.error('Please provide a reason for cancellation');
			return;
		}

		cancelMutation.mutate({
			bookingID: selectedBookingId,
			reasonCancel: cancelReason,
		});
	};

	const handleExportBookings = async () => {
		if (!selectedHomeStayId) {
			toast.error('Please select a homestay first');
			return;
		}

		setIsExporting(true);
		try {
			await exportBookings(selectedHomeStayId);
			toast.success('Bookings exported successfully');
		} catch (error) {
			toast.error('Failed to export bookings');
			console.error('Export error:', error);
		} finally {
			setIsExporting(false);
		}
	};

	// Helper function to get button text based on current status
	const getButtonText = (status) => {
		switch (status) {
			case 'Confirmed':
				return 'Mark as Paid';
			case 'Paid':
				return 'Complete';
			default:
				return 'Update Status';
		}
	};

	// Helper function to get initials for avatar fallback
	const getInitials = (name) => {
		if (!name) return 'G';
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	return (
		<AdminLayout>
			<div className='p-6'>
				<h1 className='mb-6 text-2xl font-bold'>Booking Homestay</h1>

				<div className='mb-6'>
					<label htmlFor='homestaySelect' className='block mb-2 text-sm font-medium text-gray-700'>
						Select Homestay
					</label>
					<div className='flex gap-2'>
						{isLoadingHomestays ? (
							<select
								disabled
								className='block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm'
							>
								<option>Loading homestays...</option>
							</select>
						) : isErrorHomestays ? (
							<div className='w-full'>
								<select
									disabled
									className='block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm'
								>
									<option>Error loading homestays</option>
								</select>
								<p className='mt-1 text-sm text-red-500'>
									{errorHomestays?.message || 'Failed to load homestays'}
								</p>
							</div>
						) : homestays && homestays.length > 0 ? (
							<select
								id='homestaySelect'
								value={selectedHomeStayId}
								onChange={(e) => handleHomeStaySelect(e.target.value)}
								className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
							>
								<option value=''>Select a homestay</option>
								{homestays.map((homestay) => (
									<option key={homestay.id} value={homestay.id}>
										{homestay.name}
									</option>
								))}
							</select>
						) : (
							<select
								disabled
								className='block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm'
							>
								<option>No homestays found</option>
							</select>
						)}
						<button
							onClick={handleRefresh}
							disabled={!selectedHomeStayId}
							className='px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300'
						>
							Refresh
						</button>
						<button
							onClick={handleExportBookings}
							disabled={!selectedHomeStayId || isExporting}
							className='px-4 py-2 text-white bg-green-600 rounded-md disabled:bg-gray-300'
						>
							{isExporting ? 'Exporting...' : 'Export'}
						</button>
					</div>
				</div>

				<div className='p-6 bg-white rounded-lg shadow'>
					{!selectedHomeStayId ? (
						<p className='text-gray-500'>Please select a homestay to view bookings</p>
					) : isLoading ? (
						<p className='text-gray-500'>Loading bookings...</p>
					) : isError ? (
						<div className='text-red-500'>
							<p>Error loading bookings: {error.message}</p>
						</div>
					) : bookings && bookings.length > 0 ? (
						<div className='overflow-x-auto'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead className='bg-gray-50'>
									<tr>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Guest
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Guest Name
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Check In
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Check Out
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Price
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Status
										</th>
										<th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{bookings.map((booking) => (
										<tr key={booking.id}>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												<Avatar className='flex-shrink-0 w-10 h-10 border-2 border-white shadow'>
													{booking.user && booking.user.avatar ? (
														<AvatarImage
															src={booking.user.avatar}
															alt={booking.user.fullName || 'Guest'}
														/>
													) : (
														<AvatarImage
															src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${
																booking.user?.email || booking.id || 'guest'
															}`}
															alt='Guest'
														/>
													)}
													<AvatarFallback className='font-medium text-white bg-indigo-600'>
														{getInitials(booking.user?.fullName)}
													</AvatarFallback>
												</Avatar>
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{booking.user?.fullName || 'Unknown Guest'}
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{booking.checkInDate}
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{booking.checkOutDate}
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{booking.totalPrice?.toLocaleString() || 'N/A'}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
									booking.status === 'Confirmed'
										? 'bg-green-100 text-green-800'
										: booking.status === 'Pending'
										? 'bg-yellow-100 text-yellow-800'
										: booking.status === 'Paid'
										? 'bg-blue-100 text-blue-800'
										: booking.status === 'Completed'
										? 'bg-purple-100 text-purple-800'
										: 'bg-red-100 text-red-800'
								}`}
												>
													{booking.status}
												</span>
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{booking.status === 'Completed' || booking.status === 'Pending' ? (
													<button className='mr-2 text-gray-400 cursor-not-allowed' disabled>
														{booking.status === 'Completed' ? 'Complete' : 'Confirm'}
													</button>
												) : (
													<button
														onClick={() => handleUpdateStatus(booking.id)}
														className={`mr-2 
															${
																booking.status === 'Confirmed'
																	? 'text-blue-600 hover:text-blue-900'
																	: booking.status === 'Paid'
																	? 'text-purple-600 hover:text-purple-900'
																	: 'text-blue-600 hover:text-blue-900'
															}`}
														disabled={statusMutation.isPending}
													>
														{statusMutation.isPending &&
														statusMutation.variables === booking.id
															? 'Processing...'
															: getButtonText(booking.status)}
													</button>
												)}

												{/* {booking.status !== 'Completed' && (
													<button
														onClick={() => openCancelDialog(booking.id)}
														className='text-red-600 hover:text-red-900'
														disabled={cancelMutation.isPending}
													>
														{cancelMutation.isPending &&
														cancelMutation.variables?.bookingID === booking.id
															? 'Canceling...'
															: 'Cancel'}
													</button>
												)} */}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className='text-gray-500'>No bookings found for this homestay</p>
					)}
				</div>
			</div>

			{/* Cancel Booking Dialog */}
			<Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Cancel Booking</DialogTitle>
					</DialogHeader>
					<div className='py-4 space-y-4'>
						<div className='space-y-2'>
							<label htmlFor='cancelReason' className='text-sm font-medium'>
								Please provide a reason for cancellation:
							</label>
							<Textarea
								id='cancelReason'
								value={cancelReason}
								onChange={(e) => setCancelReason(e.target.value)}
								placeholder='Enter cancellation reason...'
								className='w-full min-h-[100px]'
							/>
						</div>
					</div>
					<DialogFooter className='flex justify-end space-x-2'>
						<Button type='button' variant='outline' onClick={() => setCancelDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							type='button'
							variant='destructive'
							onClick={handleCancelBooking}
							disabled={cancelMutation.isPending}
						>
							{cancelMutation.isPending ? 'Canceling...' : 'Confirm Cancellation'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	);
};

export default BookingHomestay;
