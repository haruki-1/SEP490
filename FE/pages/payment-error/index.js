import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MainLayout from '@/pages/layout';

export default function PaymentError() {
	const { t } = useTranslation('common');
	const router = useRouter();
	const { orderCode } = router.query;

	return (
		<MainLayout>
			<div className='flex items-center justify-center sec-com'>
				<div className='container-lg'>
					<div className='text-center'>
						<div className='flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-10 h-10 text-red-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</div>
						<h2 className='mb-2 text-2xl font-bold text-gray-800'>Payment Failed</h2>
						<p className='mb-6 text-gray-600'>Your transaction was cancelled or could not be completed.</p>

						{orderCode && (
							<div className='py-4 mb-6 border-t border-b border-gray-200'>
								<div className='flex justify-between mb-2'>
									<span className='text-gray-600'>Order Code:</span>
									<span className='font-medium'>{orderCode}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>Status:</span>
									<span className='font-medium text-red-600'>CANCELLED</span>
								</div>
							</div>
						)}

						<div className='flex gap-4'>
							<Link
								href='/'
								className='block w-1/2 px-4 py-3 font-bold text-gray-800 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300'
							>
								Return Home
							</Link>
							<button
								onClick={() => router.back()}
								className='block w-1/2 px-4 py-3 font-bold text-white transition duration-200 rounded-lg bg-primary hover:bg-primary-dark'
							>
								Try Again
							</button>
						</div>

						<div className='mt-6'>
							<Link href='/contact' className='text-primary hover:underline'>
								Need help? Contact Support
							</Link>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
