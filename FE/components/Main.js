import Link from 'next/link';
import { Button } from './components/ui/button';
import { useAuth } from 'context/AuthProvider';
import { useTranslation } from 'next-i18next';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const Main = () => {
	const { dataProfile } = useAuth();
	const { t } = useTranslation('common');

	return (
		<section
			className='relative min-h-[600px] flex flex-col justify-center overflow-hidden bg-cover bg-center'
			style={{
				backgroundImage:
					"linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/Main.jpg')",
				backgroundPosition: 'center 30%',
			}}
		>
			{/* Decorative overlay gradient */}
			<div className='absolute inset-0 bg-blue-900/20 mix-blend-multiply'></div>

			<div className='container-lg z-10 flex flex-col gap-10 py-16'>
				<div className='max-w-3xl text-white flex flex-col gap-5'>
					<h1 className='font-extrabold text-[clamp(2.5rem,6vw,3rem)] leading-tight tracking-tight'>
						{t('main.title')}
						<span className='block text-blue-300'>HomeStays</span>
					</h1>
					<p className='text-lg text-gray-100 font-light max-w-lg'>{t('main.subtitle')}</p>


					{!dataProfile && (
						<div className='flex flex-wrap gap-3 mt-2'>
							<Link href='/auth/register'>
								<Button size='lg' className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6'>
									{t('register')}
								</Button>
							</Link>
							<Link href='/auth/login'>
								<Button
									size='lg'
									variant='ghost'
									className='border-white text-white hover:bg-opacity-0 hover:text-white font-medium px-6'
								>
									{t('login')}
								</Button>
							</Link>
						</div>
					)}

					{dataProfile && (
						<Link href='/home-stay' className='group w-fit'>
							<Button
								size='lg'
								className='border-white border text-white hover:bg-white/10 font-medium px-6'
							>
								{t('main.cta')}
								<ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default Main;