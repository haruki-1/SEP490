
import Explore from '@/components/Explore';
import Header from '@/components/Header';
import Main from '@/components/Main';
import { discover, live } from '@/data';
import ListHomeStay from '@/components/ListHomeStay';
import Banner from '@/components/Banner';
import MainLayout from './layout';

export default function Home() {
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