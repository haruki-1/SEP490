import { useQuery, useMutation } from '@tanstack/react-query';
import { getAllVouchers } from '@/pages/api/voucher/getVouchers';
import { receiveVoucher } from '@/pages/api/voucher/receiveVoucher';
import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Copy, Check, Calendar, Tag, ArrowRight, Gift, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { useTranslation } from 'next-i18next';

const VoucherCard = () => {
	const { t } = useTranslation('common');
	const [copiedVoucher, setCopiedVoucher] = useState(null);
	const { dataProfile } = useAuth();

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['vouchers'],
		queryFn: getAllVouchers,
	});

	const voucherData = data || [];

	// Mutation for receiving voucher
	const receiveMutation = useMutation({
		mutationFn: (voucherID) =>
			receiveVoucher({
				userID: dataProfile?.id,
				voucherID: voucherID,
			}),
		onSuccess: () => {
			toast.success('Voucher received successfully!');
			refetch(); // Refetch the vouchers list after receiving one
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'Failed to receive voucher');
		},
	});

	const handleCopyVoucher = (code) => {
		navigator.clipboard
			.writeText(code)
			.then(() => {
				setCopiedVoucher(code);
				toast.success(`Voucher code ${code} copied to clipboard!`);
				setTimeout(() => setCopiedVoucher(null), 2000);
			})
			.catch(() => {
				toast.error('Failed to copy voucher code');
			});
	};

	const handleReceiveVoucher = (voucherID) => {
		if (!dataProfile?.id) {
			toast.error('Please login to receive vouchers');
			return;
		}

		receiveMutation.mutate(voucherID);
	};

	const formatDate = (dateString) => {
		try {
			return format(new Date(dateString), 'MMM dd, yyyy');
		} catch (error) {
			return 'Invalid date';
		}
	};

	return (
		<div className='sec-com bg-gradient-to-b from-blue-50 to-white'>
			<div className='container-lg'>
				<div className='mb-10 text-center'>
				<h1 className='mb-2 text-3xl font-bold text-gray-800 md:text-4xl'>{t('specialoffers')}</h1>
				<p className='max-w-2xl mx-auto text-gray-600'>{t('specialdescription')}</p>
				</div>

				{isLoading ? (
					<div className='flex flex-col items-center justify-center py-12'>
						<div className='w-16 h-16 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin'></div>
						<p className='mt-4 text-gray-600'>Loading vouchers...</p>
					</div>
				) : error ? (
					<div className='p-6 text-center bg-red-50 rounded-xl'>
						<p className='text-red-600'>Error loading vouchers. Please try again later.</p>
					</div>
				) : voucherData.length === 0 ? (
					<div className='p-8 text-center bg-gray-50 rounded-xl'>
						<p className='text-gray-600'>No vouchers available at the moment. Please check back later.</p>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{voucherData.map((voucher) => (
							<div
								key={voucher.voucherID}
								className='overflow-hidden transition-all bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-lg'
							>
								<div className='relative h-48 overflow-hidden'>
									{voucher.image ? (
										<Image
											src={voucher.image}
											alt={voucher.description || 'Voucher image'}
											fill
											className='object-cover transition-transform duration-300 group-hover:scale-105'
										/>
									) : (
										<div className='flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-400 to-purple-500'>
											<span className='text-4xl font-bold text-white'>
												{voucher.discount}% OFF
											</span>
										</div>
									)}

									{voucher.discount > 0 && (
										<div className='absolute px-3 py-1 font-bold text-white bg-red-500 rounded-full shadow-md top-4 right-4'>
											{voucher.discount}% OFF
										</div>
									)}
								</div>

								<div className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<div className='px-3 py-1 font-mono text-lg font-bold text-blue-700 bg-blue-100 rounded-md'>
											{voucher.code}
										</div>
										<button
											onClick={() => handleCopyVoucher(voucher.code)}
											className={`p-2 rounded-full transition-all ${
												copiedVoucher === voucher.code
													? 'bg-green-100 text-green-600'
													: 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
											}`}
											aria-label='Copy voucher code'
										>
											{copiedVoucher === voucher.code ? (
												<Check className='w-5 h-5' />
											) : (
												<Copy className='w-5 h-5' />
											)}
										</button>
									</div>

									<h3 className='mb-2 text-lg font-semibold text-gray-800'>
										{voucher.description || `${voucher.discount}% Discount Voucher`}
									</h3>

									<div className='mb-6 space-y-2'>
										<div className='flex items-center text-sm text-gray-600'>
											<Calendar className='w-4 h-4 mr-2 text-blue-500' />
											<span>Valid from: {formatDate(voucher.startDate)}</span>
										</div>
										<div className='flex items-center text-sm text-gray-600'>
											<Calendar className='w-4 h-4 mr-2 text-blue-500' />
											<span>Valid until: {formatDate(voucher.endDate)}</span>
										</div>
										<div className='flex items-center text-sm text-gray-600'>
											<Tag className='w-4 h-4 mr-2 text-blue-500' />
											<span>Discount: {voucher.discount}%</span>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<button
											onClick={() => handleCopyVoucher(voucher.code)}
											className='flex items-center justify-center gap-2 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
										>
											<Copy className='w-4 h-4' />
											Copy Code
										</button>

										<button
											onClick={() => handleReceiveVoucher(voucher.voucherID)}
											disabled={
												receiveMutation.isPending &&
												receiveMutation.variables === voucher.voucherID
											}
											className={`flex items-center justify-center gap-2 py-3 font-medium rounded-lg transition-colors
                        ${
							receiveMutation.isPending && receiveMutation.variables === voucher.voucherID
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-green-600 hover:bg-green-700 text-white'
						}`}
										>
											{receiveMutation.isPending &&
											receiveMutation.variables === voucher.voucherID ? (
												<>
													<Loader2 className='w-4 h-4 animate-spin' />
													Getting...
												</>
											) : (
												<>
													<Gift className='w-4 h-4' />
													Get Voucher
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default VoucherCard;