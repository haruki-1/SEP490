import Link from 'next/link';
import { Button } from './components/ui/button';
import SearchForm from './SearchForm';

const Hero = () => {
	return (
		<section
			className='relative bg-cover bg-center text-light py-20 flex flex-col gap-7'
			style={{
				backgroundImage:
					"linear-gradient(to bottom, rgba(10, 12, 44, 0.5) 3rem, transparent 10rem), url('/images/hero.jpg')",
			}}
		>
			<div className='flex container-lg'>
				<div className='max-w-[var(--maxWidth)] text-white flex flex-col gap-2'>
					<h1 className='font-extrabold text-[clamp(2rem,5.5vw,3.25rem)] leading-none'>
						A lifetime of discounts? It's Genius
					</h1>
					<p>
						Get rewarded for your travels - unlock instant savings of 10% or more with a free Runa Homestay
					</p>
					<Link href='/auth/register' className='w-fit'>
						<Button className='w-fit'>Sign in / Register</Button>
					</Link>
				</div>
			</div>
			<div className='container-lg mx-auto'>
				<SearchForm />
			</div>
		</section>
	);
};

export default Hero;
