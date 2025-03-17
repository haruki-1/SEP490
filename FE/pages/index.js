
import Explore from '@/components/Explore';
import Header from '@/components/Header';
import Main from '@/components/Main';
import { discover, live } from '@/data';
import ListHomeStay from '@/components/ListHomeStay';
import Banner from '@/components/Banner';
import MainLayout from './layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AmenityList from '@/components/AmenityList';

export default function Home() {
	const { t } = useTranslation('common');
	return (
			<MainLayout>
			<main>
				<Main/>
				{/* <Explore/> */}
				<ListHomeStay/>
				<Banner/>
				{/* <MediumCards {...live} />
				<LargeCards {...discover} />
				<Hosting /> */}
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