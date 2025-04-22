import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getAllHomeStay } from 'pages/api/homestay/getAllHomeStay';
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Skeleton } from './components/ui/skeleton';
import { useTranslation } from 'next-i18next';

const ListHomeStay = () => {
	const { t } = useTranslation('common');

	const [filters, setFilters] = useState({
		amenityNames: [],
		priceRange: [0, 1000],
		standard: [],
	});

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
	});

	const dataHot = data?.filter((item) => item.standar >= 0 && item.standar<=5).slice(0, 4);

	const truncateText = (text, maxLength) => {
		if (!text) return 'No description available.';
		return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
	};

	return (
		<section className='sec-com bg-gray-50'>
			<div className='container-lg'>
				<div className='mb-10 text-center md:text-left'>
					<h2 className='mb-3 text-3xl font-bold'>
						{t('top-rated')} <span className='text-blue-600'>HomeStays</span>
					</h2>
					<p className='w-full text-gray-600'>{t('discover')}</p>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className='overflow-hidden shadow rounded-xl'>
								<Skeleton className='w-full h-64' />
								<div className='p-4'>
									<Skeleton className='w-3/4 h-6 mb-2' />
									<Skeleton className='w-1/2 h-4 mb-4' />
									<Skeleton className='w-full h-4 mb-2' />
									<Skeleton className='w-full h-4 mb-2' />
									<Skeleton className='w-1/2 h-10 mt-4' />
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className='p-6 text-center text-red-600 rounded-lg bg-red-50'>
						Something went wrong. Please try again later.
					</div>
				) : dataHot?.length === 0 ? (
					<div className='p-6 text-center text-gray-600 bg-gray-100 rounded-lg'>
						No featured homestays available at this time.
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
						{dataHot
							?.filter((data) => !data.isDeleted)
							?.map((item) => (
								<div
									key={item.id}
									className='flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl'
								>
									<div className='relative flex-shrink-0 w-full h-64 overflow-hidden'>
										<Image
											src={item?.mainImage || '/images/placeholder.jpg'}
											alt={item.name}
											fill
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
											className={`object-cover transition-transform duration-700 ${
												!item.isBooked ? 'group-hover:scale-110' : ''
											}`}
										/>

										{/* Overlay gradient */}
										<div className='absolute inset-0 transition-opacity bg-gradient-to-b from-black/10 to-black/60 opacity-60 group-hover:opacity-80'></div>

										{/* City badge */}
										{item.city && (
											<div className='absolute top-3 left-3'>
												<Badge className='text-blue-600 border-0 shadow-sm bg-white/90 backdrop-blur-sm'>
													<MapPin className='w-3 h-3 mr-1' />
													{item.city}
												</Badge>
											</div>
										)}

										{/* Booked status */}
										{item.isBooked && (
											<div className='absolute z-10 px-3 py-1 font-bold text-white bg-red-500 rounded-md shadow-md top-3 right-3'>
												Booked
											</div>
										)}

										{/* Star rating */}
										<div className='absolute flex items-center bottom-3 left-3'>
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className={`w-5 h-5 ${
														item.standar > index
															? 'text-yellow-400 fill-yellow-400'
															: 'text-gray-400'
													}`}
												/>
											))}
										</div>
									</div>

									<div className='flex flex-col flex-grow p-5'>
										<h3 className='mb-2 text-xl font-bold text-gray-800'>
											{item?.name || 'HomeStay Name'}
										</h3>

										<p className='flex-grow mb-4 text-sm text-gray-600'>
											{truncateText(item?.description, 100)}
										</p>

										{!item.isBooked ? (
											<Button
												asChild
												className='justify-center w-full mt-auto transition-all duration-300 bg-blue-600 hover:bg-blue-700'
											>
												<Link href={`/home-stay/${item.id}`}>
													{t('booknow')}
													<ArrowRight className='w-4 h-4 ml-2' />
												</Link>
											</Button>
										) : (
											<Button disabled className='w-full mt-auto cursor-not-allowed'>
												Not Available
											</Button>
										)}
									</div>
								</div>
							))}
					</div>
				)}

				<div className='mt-10 text-center'>
					<Button asChild variant='outline' className='text-blue-600 border-blue-200 hover:bg-blue-50'>
						<Link href='/home-stay'>
							{t('viewall')}
							<ArrowRight className='w-4 h-4 ml-2' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ListHomeStay;