import { getAllHomeStay } from '@/pages/api/homestay/getAllHomeStay';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ListHomeStay = () => {
	const [filters, setFilters] = useState({
		amenityNames: [],
		priceRange: [0, 1000],
		standard: [],
	});

	const { data, isLoading, error } = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
	});

	const dataHot = data?.filter((item) => item.standar === 5).slice(0, 4);

	return (
		<div className='sec-com'>
			<div className='container-lg'>
				<div className='grid grid-cols-4 gap-2'>
					{dataHot?.map((item) => (
						<div key={item.id}>
							<div
								className={`w-full h-full relative overflow-hidden ${
									!item.isBooked ? 'group cursor-pointer' : 'cursor-not-allowed'
								} rounded-md`}
							>
								<Image
									src={item?.mainImage}
									alt='main-img'
									width={500}
									height={500}
									className={`w-full h-full object-cover ${
										!item.isBooked ? 'group-hover:scale-[1.1] transition-all duration-700' : ''
									}`}
								/>
								<div className='absolute inset-0 bg-black/20'></div>

								{item.isBooked && (
									<div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-bold z-50'>
										Booked
									</div>
								)}

								<div
									className={`absolute top-[50%] transform ${
										!item.isBooked
											? 'group-hover:translate-y-[-50%] transition-all duration-500'
											: ''
									} w-full h-full left-0 flex items-center justify-center flex-col z-30 gap-2`}
								>
									<h1 className='text-[1.5rem] font-bold text-white text-center capitalize'>
										{item?.name || 'HomeStay Name'}
									</h1>
									<p className='flex items-center'>
										{[...Array(5)].map((_, index) => (
											<svg
												key={index}
												className={`w-5 h-5 ${
													item.standar > index ? 'text-yellow-500' : 'text-gray-300'
												}`}
												fill='currentColor'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
											>
												<path d='M10 15l-5.09 3.09 1.64-6.88L0 6.91l6.91-.59L10 0l2.09 6.32 6.91.59-4.55 4.3 1.64 6.88L10 15z' />
											</svg>
										))}
									</p>
									<p
										className={`text-center ${
											!item.isBooked
												? 'opacity-0 group-hover:opacity-100 transition-all duration-700'
												: 'opacity-100'
										} text-white text-[0.9rem]`}
									>
										{item?.description?.slice(0, 80) || 'No description available.'}
									</p>
									{!item.isBooked && (
										<Link href={`/home-stay/${item.id}`}>
											<button className='bg-blue-400 opacity-0 group-hover:opacity-100 px-3 py-2 mt-3 hover:bg-blue-500 transition-all duration-1000 text-white rounded-md text-[0.9rem]'>
												Booking now
											</button>
										</Link>
									)}
								</div>

								<div
									className={`w-full ${
										!item.isBooked
											? 'opacity-0 group-hover:opacity-100 transition-all duration-500'
											: 'opacity-100'
									} bg-gradient-to-b from-[rgba(0,0,0,0.001)] to-[rgba(0,0,0,0.5)] h-full absolute bottom-0 left-0 right-0`}
								></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListHomeStay;
