import Banner from '@/components/Banner';
import Explore from '@/components/Explore';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Hosting from '@/components/Hosting';
import MediumCards from '@/components/MediumCards';
import LargeCards from '@/components/LargeCards';
import { live, discover } from '../data';
import MainLayout from './layout';

export default function Home() {
	return (
		<MainLayout>
			<main>
				<Hero />
				<Explore />
				<Banner />
				<MediumCards {...live} />
				<LargeCards {...discover} />
				<Hosting />
			</main>
			<Footer />
		</MainLayout>
	);
}