import { useParams, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import MainLayout from '../layout';
import { createPayment } from '../api/payment/createPayment';

const PaymentPage = () => {
	const searchParams = useSearchParams();
	const bookingID = searchParams.get('bookingID');
	const [paymentStatus, setPaymentStatus] = useState(null);

	// Set up the mutation
	const paymentMutation = useMutation({
		mutationFn: () => createPayment(bookingID),
		onSuccess: (data) => {
			console.log('Payment created successfully:', data);

			// Check if paymentLink exists in the response
			if (data && data.paymentLink) {
				// Redirect to the payment link
				window.location.href = data.paymentLink;
			} else {
				// If no payment link is found, just update the status
				setPaymentStatus({ success: true, data });
			}
		},
		onError: (error) => {
			console.error('Payment creation failed:', error);
			setPaymentStatus({ success: false, error });
		},
	});

	// Automatically create payment when the page loads
	useEffect(() => {
		if (bookingID) {
			paymentMutation.mutate();
		}
	}, [bookingID]); // Only run when bookingID changes or is available

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='py-4'>
						{bookingID ? (
							<div className='mb-3'>
								{paymentMutation.isPending && (
									<div className='text-center my-5'>
										<div className='spinner-border text-primary' role='status'>
											<span className='visually-hidden'>Loading...</span>
										</div>
										<div className='mt-2'>Processing payment, please wait...</div>
									</div>
								)}

								{paymentStatus?.success === false && (
									<div className='mt-3 alert alert-danger'>
										<h4>Payment Failed</h4>
										<p>{paymentStatus.error.message || 'An unknown error occurred'}</p>
										<button
											className='btn btn-primary mt-2'
											onClick={() => paymentMutation.mutate()}
											disabled={paymentMutation.isPending}
										>
											Try Again
										</button>
									</div>
								)}
							</div>
						) : (
							<div className='alert alert-warning'>
								No booking ID provided. Please include a bookingID query parameter.
							</div>
						)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default PaymentPage;
