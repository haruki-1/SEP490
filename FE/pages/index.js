import MainLayout from './layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AmenityList from '@/components/AmenityList';
import VoucherCard from '@/components/VoucherCard';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getPaymentReturn } from './api/payment/getPaymentReturn';
import { useEffect, useState } from 'react';
import Main from '@/components/Main';
import ListHomeStay from '@/components/ListHomeStay';
import { useAuth } from 'context/AuthProvider';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load Map để tránh lỗi SSR
const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
	const router = useRouter();
	const { code, id, cancel, status, orderCode } = router.query;
	const hasPaymentParams = !!(code || id || cancel || status || orderCode);
	const { dataProfile, isLoading: isLoadingAuth, isAuthenticated } = useAuth();

	const [showMap, setShowMap] = useState(false);

	// 🔁 Map liên kết với homestays
	const [viewport, setViewport] = useState({
		latitude: 21.0285,
		longitude: 105.8542,
		zoom: 12,
	});
	const [selectedLocation, setSelectedLocation] = useState({});
	const [results, setResults] = useState([]); // data truyền cho map

	useEffect(() => {
		if (!isLoadingAuth && isAuthenticated && dataProfile) {
			if (dataProfile.role === 'Manager') {
				toast.warning('Bạn đang sử dụng tài khoản quản lý. Đang chuyển hướng đến trang quản lý...');
				router.push('/manager');
			} else if (dataProfile.role === 'Admin') {
				toast.warning('Bạn đang sử dụng tài khoản quản trị. Đang chuyển hướng đến trang quản trị...');
				router.push('/admin');
			}
		}
	}, [isLoadingAuth, isAuthenticated, dataProfile, router]);

	// Xử lý thanh toán
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['paymentReturn', code, id, cancel, status, orderCode],
		queryFn: () => getPaymentReturn(code, id, cancel, status, orderCode),
		enabled: hasPaymentParams && router.pathname === '/',
		refetchOnWindowFocus: false,
		retry: 1,
	});

	useEffect(() => {
		const handlePaymentReturn = async () => {
			if (status === 'CANCELLED') {
				router.push({ pathname: '/payment-error', query: { orderCode, status } });
				return;
			}
			if (status === 'PAID') {
				router.push({ pathname: '/payment-success', query: { orderCode, status } });
				return;
			}
			if (data) {
				if (data.status === 'CANCELLED' || cancel === 'true') {
					router.push({ pathname: '/payment-error', query: { orderCode, status: data.status } });
				} else if (data.status === 'PAID') {
					router.push({ pathname: '/payment-success', query: { orderCode, status: data.status } });
				}
			}
		};

		if (router.isReady && hasPaymentParams) {
			handlePaymentReturn();
		}
	}, [router.isReady, status, orderCode, hasPaymentParams, router, data]);

	if (isLoading && hasPaymentParams) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-screen">
					<div className="p-6 text-center bg-white rounded-lg shadow-lg">
						<div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
						<p className="text-lg font-medium">Đang xử lý thanh toán...</p>
						<p className="mt-2 text-sm text-gray-500">Vui lòng không đóng cửa sổ này</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			{/* Nút Hiển thị bản đồ */}
			<button
				onClick={() => setShowMap(!showMap)}
				className="fixed top-5 right-5 z-50 px-4 py-2 bg-white shadow-md rounded-full font-semibold"
			>
				{showMap ? 'Ẩn bản đồ' : 'Hiển thị bản đồ'}
			</button>

			{/* Hiển thị bản đồ có hiệu ứng */}
			<AnimatePresence>
				{showMap && (
					<motion.div
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ duration: 0.4 }}
						className="fixed inset-0 z-40 bg-white"
					>
						<DynamicMap
							results={results}
							selectedLocation={selectedLocation}
							setSelectedLocation={setSelectedLocation}
							viewport={viewport}
							setViewport={setViewport}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<main>
				<Main />
				<ListHomeStay setResults={setResults} /> {/* Gửi dữ liệu về bản đồ */}
				<VoucherCard />
				<AmenityList />
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
