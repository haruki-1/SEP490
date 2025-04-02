import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { searchHomeStay } from '@/pages/api/homestay/searchHomeStay';
import { MapPin, Star, Calendar, Clock, Wifi, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import { Skeleton } from '@/components/components/ui/skeleton';
import { Badge } from '@/components/components/ui/badge';
import { format, parseISO } from 'date-fns';
import MainLayout from '../layout';

const SearchPage = () => {
	const router = useRouter();
	const { checkIn, checkOut, location } = router.query;

	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSearchResults = async () => {
			if (!checkIn || !checkOut) return;

			try {
				setLoading(true);
				const results = await searchHomeStay(checkIn, checkOut);
				setSearchResults(results);
			} catch (err) {
				console.error('Failed to search homestays:', err);
				setError('Failed to load search results. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		if (router.isReady) {
			fetchSearchResults();
		}
	}, [checkIn, checkOut, router.isReady]);

	// Format date for display
	const formatDateDisplay = (dateString) => {
		if (!dateString) return '';
		try {
			return format(new Date(dateString), 'MMM d, yyyy');
		} catch (e) {
			return dateString;
		}
	};

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					{/* Search summary */}
					<div className='mb-8'>
						<h1 className='text-3xl font-bold mb-2'>Search Results</h1>
						<div className='flex flex-wrap items-center gap-3 text-gray-600'>
							{location && (
								<Badge variant='outline' className='text-blue-600 bg-blue-50 border-blue-200'>
									<MapPin className='w-3.5 h-3.5 mr-1' />
									{location}
								</Badge>
							)}
							{checkIn && checkOut && (
								<Badge variant='outline' className='text-green-600 bg-green-50 border-green-200'>
									<Calendar className='w-3.5 h-3.5 mr-1' />
									{formatDateDisplay(checkIn)} - {formatDateDisplay(checkOut)}
								</Badge>
							)}
						</div>
					</div>

					{/* Loading state */}
					{loading && (
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{[1, 2, 3].map((item) => (
								<Card key={item} className='overflow-hidden'>
									<Skeleton className='h-48 w-full' />
									<CardHeader className='pb-2'>
										<Skeleton className='h-4 w-1/2' />
										<Skeleton className='h-6 w-3/4' />
									</CardHeader>
									<CardContent>
										<Skeleton className='h-4 w-full mb-2' />
										<Skeleton className='h-4 w-3/4' />
									</CardContent>
									<CardFooter>
										<Skeleton className='h-10 w-full' />
									</CardFooter>
								</Card>
							))}
						</div>
					)}

					{/* Error state */}
					{error && !loading && (
						<div className='bg-red-50 border border-red-200 rounded-md p-6 text-center'>
							<p className='text-red-600 mb-4'>{error}</p>
							<Button onClick={() => router.back()}>Go Back</Button>
						</div>
					)}

					{/* No results */}
					{!loading && !error && searchResults?.length === 0 && (
						<div className='bg-gray-50 border border-gray-200 rounded-md p-8 text-center'>
							<h2 className='text-xl font-semibold mb-2'>No homestays found</h2>
							<p className='text-gray-600 mb-6'>
								We couldn't find any homestays matching your search criteria. Try adjusting your dates
								or location.
							</p>
							<Button onClick={() => router.push('/')}>Back to Home</Button>
						</div>
					)}

					{/* Redesigned Results grid with enhanced cards and fixed footer */}
					{!loading && !error && searchResults?.length > 0 && (
						<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
							{searchResults.map((homestay) => (
								<div
									key={homestay.id}
									className='group relative bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full'
								>
									{/* Image container with overlay gradient */}
									<div className='relative h-64 w-full overflow-hidden flex-shrink-0'>
										<Image
											src={homestay.mainImage || '/images/placeholder.jpg'}
											alt={homestay.name}
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-105'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>

										{/* Quick view button that appears on hover */}
										<div className='absolute bottom-4 left-1/2 -translate-x-1/2 transform opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
											<Button
												size='sm'
												className='bg-white text-gray-800 hover:bg-blue-50 shadow-md'
												asChild
											>
												<Link
													href={`/home-stay/${homestay.id}?checkIn=${checkIn}&checkOut=${checkOut}`}
												>
													Quick View
												</Link>
											</Button>
										</div>
									</div>

									{/* Star rating badge */}
									{homestay.standar > 0 && (
										<div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-600 px-2 py-1.5 rounded-lg text-xs font-medium shadow-sm flex items-center'>
											{Array(homestay.standar)
												.fill(0)
												.map((_, i) => (
													<Star key={i} className='w-3.5 h-3.5 fill-current mr-0.5' />
												))}
										</div>
									)}

									{/* Location tag */}
									<div className='absolute top-3 left-3'>
										<Badge className='bg-white/90 backdrop-blur-sm text-blue-600 border-0 shadow-sm'>
											<MapPin className='w-3.5 h-3.5 mr-1' />
											{homestay.city}
										</Badge>
									</div>

									{/* Card content - flex-grow will push the footer down */}
									<div className='p-5 flex-grow flex flex-col'>
										<h3 className='text-xl font-semibold mb-2 line-clamp-1'>{homestay.name}</h3>

										<p className='text-gray-600 text-sm line-clamp-2 mb-4'>
											{homestay.description}
										</p>

										{/* Divider */}
										<div className='h-px bg-gray-100 my-4'></div>

										{/* Amenities section */}
										<div className='mb-4 flex-grow'>
											<h4 className='text-xs text-gray-500 uppercase tracking-wider mb-2'>
												Amenities
											</h4>
											<div className='flex flex-wrap gap-1.5'>
												{homestay.amenities && homestay.amenities.length > 0 ? (
													homestay.amenities.slice(0, 3).map((amenity) => (
														<Badge
															key={amenity.id}
															variant='outline'
															className='text-xs bg-gray-50 py-1 px-2 rounded-md border-gray-200'
														>
															<Wifi className='w-3 h-3 mr-1 text-blue-500' />
															{amenity.name}
														</Badge>
													))
												) : (
													<span className='text-xs text-gray-500'>No amenities listed</span>
												)}

												{homestay.amenities && homestay.amenities.length > 3 && (
													<Badge
														variant='outline'
														className='text-xs bg-gray-50 py-1 border-gray-200'
													>
														+{homestay.amenities.length - 3} more
													</Badge>
												)}
											</div>
										</div>

										{/* Footer with check-in/out times and CTA - mt-auto ensures it's at the bottom */}
										<div className='flex items-center justify-between pt-2 mt-auto border-t border-gray-100'>
											<div className='flex gap-3 text-xs text-gray-500'>
												<div className='flex flex-col'>
													<span className='text-gray-400'>Check-in</span>
													<span className='font-medium text-gray-700'>
														{homestay.checkInTime}
													</span>
												</div>
												<div className='flex flex-col'>
													<span className='text-gray-400'>Check-out</span>
													<span className='font-medium text-gray-700'>
														{homestay.checkOutTime}
													</span>
												</div>
											</div>

											<Button asChild size='sm' className='bg-blue-600 hover:bg-blue-700'>
												<Link
													href={`/home-stay/${homestay.id}?checkIn=${checkIn}&checkOut=${checkOut}`}
												>
													Details
													<ArrowRight className='w-3.5 h-3.5 ml-1' />
												</Link>
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default SearchPage;
