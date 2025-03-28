import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { FaSync, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaMoneyBillWave, FaFilter } from 'react-icons/fa';
import { getRefunds } from '@/pages/api/refunds/getRefunds';
import { changeRefundStatus } from '@/pages/api/refunds/changeRefundStatus';
import { toast } from 'sonner'; // Or your preferred toast library
import AdminLayout from '../layout';
import { getHomeStayByUser } from '@/pages/api/booking/bookingByUser';
import { useAuth } from '@/context/AuthProvider';

const Refund = () => {
	const [selectedRefund, setSelectedRefund] = useState(null);
	const [selectedHomeStay, setSelectedHomeStay] = useState('');
	const [mounted, setMounted] = useState(false);
	const queryClient = useQueryClient();
	const { isAuthenticated, dataProfile } = useAuth();

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		data: DataHomeStay,
		isLoading: loadingHomeStay,
		refetch: refetchHomeStays,
		error: homeStayError,
	} = useQuery({
		queryKey: ['homeStaysByUser', dataProfile?.id],
		queryFn: () => getHomeStayByUser(dataProfile?.id),
		enabled: mounted && !!dataProfile?.id,
	});

	// Fetch refunds with React Query
	const {
		data: refundsData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['refunds', selectedHomeStay],
		queryFn: () => getRefunds(selectedHomeStay),
		enabled: mounted,
		onSuccess: (data) => {
			// If the current selected refund isn't in the new data, clear the selection
			if (selectedRefund && data && !data.some((refund) => refund.refundID === selectedRefund.refundID)) {
				setSelectedRefund(null);
			}
		},
	});

	// Mutation for changing refund status
	const statusMutation = useMutation({
		mutationFn: (refundID) => changeRefundStatus(refundID),
		onSuccess: () => {
			queryClient.invalidateQueries(['refunds', selectedHomeStay]);
			toast.success('Refund status updated successfully');
			// Update the selected refund to show the new status
			if (selectedRefund) {
				const updatedRefund = { ...selectedRefund, refundStatus: true };
				setSelectedRefund(updatedRefund);
			}
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update refund status');
		},
	});

	// Format date to a readable string
	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// Format currency
	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	const handleSelectRefund = (refund) => {
		setSelectedRefund(refund);
	};

	const handleApproveRefund = () => {
		if (selectedRefund && !selectedRefund.refundStatus) {
			statusMutation.mutate(selectedRefund.refundID);
		}
	};
	const handleHomeStayChange = (e) => {
		setSelectedHomeStay(e.target.value);
		// Clear selected refund when changing homestay filter
		setSelectedRefund(null);
	};

	return (
		<AdminLayout>
			<div className='p-6'>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold text-gray-800'>Refund Management</h1>
					<div className='flex items-center space-x-4'>
						{/* HomeStay Filter Dropdown */}
						<div className='relative'>
							<select
								value={selectedHomeStay}
								onChange={handleHomeStayChange}
								className='px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
							>
								<option value=''>All HomeStays</option>
								{!loadingHomeStay &&
									DataHomeStay?.map((homeStay) => (
										<option key={homeStay.id} value={homeStay.name}>
											{homeStay.name}
										</option>
									))}
							</select>
							<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
								<FaFilter className='text-gray-400' />
							</div>
						</div>

						<button
							onClick={() => refetch()}
							className='flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
						>
							<FaSync className='mr-2' /> Refresh
						</button>
					</div>
				</div>

				{isLoading || loadingHomeStay ? (
					<div className='flex items-center justify-center h-64'>
						<div className='w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : isError || homeStayError ? (
					<div className='p-4 mb-4 border-l-4 border-red-500 rounded bg-red-50'>
						<div className='flex'>
							<div className='ml-3'>
								<p className='text-sm text-red-700'>
								Error loading data: {error?.message || homeStayError?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
						{/* Refund List */}
						<div className='lg:col-span-1'>
							<div className='overflow-hidden bg-white rounded-lg shadow'>
								<div className='p-4 border-b bg-gray-50'>
									<h2 className='font-semibold text-gray-700'>
										Refund Requests {selectedHomeStay && `- ${selectedHomeStay}`}
									</h2>
								</div>
								<div className='divide-y divide-gray-200 max-h-[calc(100vh-240px)] overflow-auto'>
									{refundsData?.length > 0 ? (
										refundsData.map((refund) => (
											<div
												key={refund.refundID}
												className={`p-4 cursor-pointer hover:bg-gray-50 ${
													selectedRefund?.refundID === refund.refundID ? 'bg-blue-50' : ''
												}`}
												onClick={() => handleSelectRefund(refund)}
											>
												<div className='flex items-start justify-between'>
													<div>
														<p className='font-medium text-gray-900'>
															{refund.user.fullName}
														</p>
														<p className='text-sm text-gray-500'>
															{formatDate(refund.createdDate)}
														</p>
													</div>
													<div
														className={`px-2 py-1 text-xs rounded-full ${
															refund.refundStatus
																? 'bg-green-100 text-green-800'
																: 'bg-yellow-100 text-yellow-800'
														}`}
													>
														{refund.refundStatus ? 'Refunded' : 'Pending'}
													</div>
												</div>
												<p className='mt-2 text-sm text-gray-600'>
													Amount: {formatCurrency(refund.amount)}
												</p>
											</div>
										))
									) : (
										<div className='p-6 text-center text-gray-500'>No refund requests found</div>
									)}
								</div>
							</div>
						</div>

						{/* Refund Details */}
						<div className='lg:col-span-2'>
							{selectedRefund ? (
								<div className='overflow-hidden bg-white rounded-lg shadow'>
									<div className='p-4 border-b bg-gray-50'>
										<h2 className='font-semibold text-gray-700'>Refund Details</h2>
									</div>
									<div className='p-6'>
										<div className='flex flex-col gap-6 md:flex-row'>
											{/* User Information */}
											<div className='md:w-1/3'>
												<div className='flex flex-col items-center'>
													<div className='relative w-24 h-24 mb-4 overflow-hidden rounded-full'>
														<Image
															src={selectedRefund.user.avatar}
															alt={selectedRefund.user.fullName}
															layout='fill'
															objectFit='cover'
														/>
													</div>
													<h3 className='text-lg font-medium text-gray-900'>
														{selectedRefund.user.fullName}
													</h3>
													<p className='text-sm text-gray-500'>{selectedRefund.user.email}</p>
													<p className='text-sm text-gray-500'>
														{selectedRefund.user.phoneNumber}
													</p>
													<p className='mt-2 text-sm text-center text-gray-500'>
														{selectedRefund.user.address}
													</p>
												</div>
											</div>

											{/* Refund Information */}
											<div className='md:w-2/3'>
												<div className='grid grid-cols-1 gap-4'>
													<div className='p-4 rounded-lg bg-gray-50'>
														<div className='flex items-center'>
															<div className='p-2 mr-3 bg-blue-100 rounded-full'>
																<FaMoneyBillWave className='text-blue-600' />
															</div>
															<div>
																<h4 className='text-sm font-medium text-gray-500'>
																	Refund Amount
																</h4>
																<p className='text-xl font-bold text-gray-900'>
																	{formatCurrency(selectedRefund.amount)}
																</p>
															</div>
														</div>
													</div>

													<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
														<div className='p-4 rounded-lg bg-gray-50'>
															<h4 className='text-sm font-medium text-gray-500'>
																Transaction Code
															</h4>
															<p className='text-gray-900'>
																{selectedRefund.transactionID}
															</p>
														</div>

														<div className='p-4 rounded-lg bg-gray-50'>
															<h4 className='text-sm font-medium text-gray-500'>
																Status
															</h4>
															<div className='flex items-center mt-1'>
																{selectedRefund.refundStatus ? (
																	<>
																		<FaCheckCircle className='mr-1 text-green-500' />{' '}
																		Refunded
																	</>
																) : (
																	<>
																		<FaTimesCircle className='mr-1 text-yellow-500' />{' '}
																		Pending
																	</>
																)}
															</div>
														</div>

														<div className='p-4 rounded-lg bg-gray-50'>
															<h4 className='text-sm font-medium text-gray-500'>
																Request Date
															</h4>
															<p className='text-gray-900'>
																{formatDate(selectedRefund.createdDate)}
															</p>
														</div>
													</div>

													<div className='p-4 rounded-lg bg-gray-50'>
														<h4 className='mb-2 text-sm font-medium text-gray-500'>
															Booking Details
														</h4>
														<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
															<div>
																<p className='text-xs text-gray-500'>Check-in</p>
																<div className='flex items-center'>
																	<FaCalendarAlt className='mr-1 text-gray-400' />
																	<p className='text-gray-900'>
																		{formatDate(selectedRefund.booking.checkInDate)}
																	</p>
																</div>
															</div>
															<div>
																<p className='text-xs text-gray-500'>Check-out</p>
																<div className='flex items-center'>
																	<FaCalendarAlt className='mr-1 text-gray-400' />
																	<p className='text-gray-900'>
																		{formatDate(
																			selectedRefund.booking.checkOutDate
																		)}
																	</p>
																</div>
															</div>
															<div>
																<p className='text-xs text-gray-500'>Original Price</p>
																<p className='text-gray-900'>
																	{formatCurrency(selectedRefund.booking.totalPrice)}
																</p>
															</div>
														</div>
													</div>

													<div className='flex justify-end mt-4 space-x-4'>
														{!selectedRefund.refundStatus && (
															<>
																<button
																	className='px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
																	onClick={handleApproveRefund}
																	disabled={statusMutation.isPending}
																>
																	{statusMutation.isPending
																		? 'Processing...'
																		: 'Approve Refund'}
																</button>
																{/* For now, the reject action also uses the same endpoint */}
																<button
																	className='px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
																	onClick={handleApproveRefund}
																	disabled={statusMutation.isPending}
																>
																	{statusMutation.isPending
																		? 'Processing...'
																		: 'Reject Refund'}
																</button>
															</>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className='p-8 text-center bg-white rounded-lg shadow'>
									<div className='inline-block p-4 mb-4 bg-gray-100 rounded-full'>
										<FaMoneyBillWave className='w-8 h-8 text-gray-400' />
									</div>
									<h3 className='mb-2 text-lg font-medium text-gray-800'>No Refund Selected</h3>
									<p className='text-gray-500'>Select a refund from the list to view its details</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default Refund;