import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import MainLayout from '@/pages/layout';

export default function PaymentSuccess() {
	const { t } = useTranslation('common');
	const router = useRouter();
	const { orderCode, status } = router.query;

	return (
		<MainLayout>
			<div className='flex items-center justify-center sec-com'>
				<div className='bg-white rounded-lg shadow-lg container-lg'>
					<div className='text-center'>
						<div className='flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-10 h-10 text-green-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
							</svg>
						</div>
						<h2 className='mb-2 text-2xl font-bold text-gray-800'>Payment Successful!</h2>
						<p className='mb-6 text-gray-600'>Your transaction has been completed successfully.</p>

						<div className='py-4 mb-6 border-t border-b border-gray-200'>
							<div className='flex justify-between mb-2'>
								<span className='text-gray-600'>Order Code:</span>
								<span className='font-medium'>{orderCode || 'N/A'}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Status:</span>
								<span className='font-medium text-green-600'>{status || 'COMPLETED'}</span>
							</div>
						</div>

						<Link
							href='/'
							className='block w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg bg-primary hover:bg-primary-dark'
						>
							Return to Homepage
						</Link>
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
