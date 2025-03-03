
import Explore from '@/components/Explore';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Footer from '@/components/Footor';
import { discover, live } from '@/data';
import ListHomeStay from '@/components/ListHomeStay';
import Banner from '@/components/Banner';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Main/>
				<Explore/>
				<ListHomeStay/>
				<Banner/>
				{/* <MediumCards {...live} />
				<LargeCards {...discover} />
				<Hosting /> */}
			</main>
			<Footer />
		</>
	);
}