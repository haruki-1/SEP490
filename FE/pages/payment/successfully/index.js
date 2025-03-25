import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/pages/layout';

const BookingConfirmation = () => {
	const router = useRouter();

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					{/* Back button */}
					<button
						className='flex items-center mb-6 text-gray-600 transition-all hover:text-gray-800'
						onClick={() => router.push('/')}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='mr-2'
						>
							<path d='M19 12H5M12 19l-7-7 7-7' />
						</svg>
						Back to home
					</button>

					<div className='overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl'>
						{/* Success Banner */}
						<div className='p-8 border-b border-green-100 bg-green-50'>
							<div className='flex flex-col items-center justify-center text-center'>
								<div className='flex items-center justify-center w-20 h-20 mb-4 bg-green-100 rounded-full'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='48'
										height='48'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='text-green-600'
									>
										<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
										<polyline points='22 4 12 14.01 9 11.01'></polyline>
									</svg>
								</div>
								<h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
									Booking Successful!
								</h1>
								<p className='max-w-md text-gray-600'>
									Your homestay has been successfully booked. Please keep your booking ID for
									reference.
								</p>
							</div>
						</div>

						{/* Booking Details */}
						<div>
							<div className='p-6 mb-6 bg-gray-50 rounded-xl'>
								<h3 className='flex items-center mb-4 text-lg font-semibold text-gray-800'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='mr-2 text-blue-600'
									>
										<rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect>
										<path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path>
									</svg>
									Payment Method
								</h3>
								<div className='flex items-center p-4 bg-white border border-gray-200 rounded-lg'>
									<div className='flex items-center justify-center w-10 h-10 mr-4 bg-yellow-100 rounded-full'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='text-yellow-600'
										>
											<rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect>
											<path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path>
										</svg>
									</div>
									<div>
										<h4 className='font-semibold text-gray-800'>Cash on Arrival</h4>
										<p className='text-sm text-gray-600'>
											Please prepare the exact amount to pay when you arrive at the property
										</p>
									</div>
								</div>
							</div>

							<div className='flex flex-col gap-6 md:flex-row'>
								<button
									className='flex items-center justify-center flex-1 py-6 text-white transition-all bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl hover:shadow-lg'
									onClick={() => router.push('/profile')}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='mr-2'
									>
										<rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
										<line x1='16' y1='2' x2='16' y2='6'></line>
										<line x1='8' y1='2' x2='8' y2='6'></line>
										<line x1='3' y1='10' x2='21' y2='10'></line>
									</svg>
									View My Bookings
								</button>

								<button
									className='flex items-center justify-center flex-1 py-6 text-gray-700 transition-all border border-gray-200 hover:bg-gray-50 rounded-xl'
									onClick={() => router.push('/')}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='mr-2'
									>
										<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
										<polyline points='9 22 9 12 15 12 15 22'></polyline>
									</svg>
									Explore More Homestays
								</button>
							</div>
						</div>

						{/* Footer */}
						<div className='p-6 text-center border-t border-gray-100 bg-gray-50'>
							<p className='text-sm text-gray-500'>
								We've sent a confirmation email with your booking details. If you have any questions,
								please contact our support team.
							</p>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default BookingConfirmation;