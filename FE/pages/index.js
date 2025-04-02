
import MainLayout from './layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AmenityList from '@/components/AmenityList';
import VoucherCard from '@/components/VoucherCard';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getPaymentReturn } from './api/payment/getPaymentReturn';
import { useEffect } from 'react';
import Main from '@/components/Main';
import ListHomeStay from '@/components/ListHomeStay';

export default function Home() {
	const { t } = useTranslation('common');
	const router = useRouter();
	const { code, id, cancel, status, orderCode } = router.query;

	const hasPaymentParams = !!(code || id || cancel || status || orderCode);

	useEffect(() => {
		if (router.isReady && hasPaymentParams) {
			if (status === 'CANCELLED') {
				router.push('/payment-error');
			} else if (status === 'PAID') {
				router.push({
					pathname: '/payment-success',
					query: {
						orderCode: orderCode,
						status: status,
					},
				});
			}
		}
	}, [router.isReady, status, orderCode, hasPaymentParams, router]);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['paymentReturn', code, id, cancel, status, orderCode],
		queryFn: () => getPaymentReturn(code, id, cancel, status, orderCode),
		enabled: hasPaymentParams && router.pathname === '/' && !['CANCELLED', 'PAID'].includes(status),
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			console.log('Payment return processed successfully:', data);
			// Check the API response status as well (if your API returns a status)
			if (data.status === 'CANCELLED' || cancel === 'true') {
				router.push('/payment-error');
			} else {
				router.push({
					pathname: '/payment-success',
					query: {
						orderCode: orderCode,
						status: data.status || status,
					},
				});
			}
		},
		onError: (error) => {
			console.error('Payment return processing failed:', error);
			router.push('/payment-error');
		},
	});

	if (isLoading && hasPaymentParams) {
		return (
			<MainLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='p-6 text-center bg-white rounded-lg shadow-lg'>
						<div className='w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary'></div>
						<p className='text-lg font-medium'>Processing your payment...</p>
						<p className='mt-2 text-sm text-gray-500'>Please don't close this window</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<main>
				<Main/>
				<ListHomeStay/>
				<VoucherCard />
				<AmenityList />
				{/* <Explore />
				<Banner /> */}
			</main>
		</MainLayout>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
	};
}
