import { useQuery } from '@tanstack/react-query';
import { getAllPost } from '@/pages/api/posts/getPosts';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Clock, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';
import MainLayout from '../layout';

const PostCard = ({ post }) => {
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group border border-gray-100 h-full flex flex-col'>
			<div className='relative h-64 overflow-hidden flex-shrink-0'>
				{post.images && post.images.length > 0 ? (
					<img
						src={post.images[0]}
						alt={post.title}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
					/>
				) : (
					<div className='w-full h-full bg-gray-100 flex items-center justify-center'>
						<span className='text-gray-400'>No image available</span>
					</div>
				)}

				{/* Location badge */}
				<Badge className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 border-0 shadow-sm'>
					<MapPin className='w-3 h-3 mr-1' />
					{post.location}
				</Badge>

				{/* Date badge */}
				<Badge className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-sm'>
					<Calendar className='w-3 h-3 mr-1' />
					{formattedDate}
				</Badge>

				{/* Gradient overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity'></div>
			</div>

			<div className='p-5 flex flex-col flex-grow'>
				<h3 className='text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
					{post.title}
				</h3>

				<p className='text-gray-600 text-sm line-clamp-3 mb-4 flex-grow'>{post.description}</p>

				<Link href={`/posts/${post.id}`}>
					<Button
						variant='outline'
						className='w-full justify-center mt-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 group-hover:border-blue-300 transition-colors'
					>
						Read More
						<ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
					</Button>
				</Link>
			</div>
		</div>
	);
};

const FeaturedPost = ({ post }) => {
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='bg-white rounded-xl shadow-sm overflow-hidden mb-12 border border-gray-100 group hover:shadow-md transition-all duration-300'>
			<div className='md:flex'>
				<div className='md:w-2/3 relative overflow-hidden'>
					{post.images && post.images.length > 0 ? (
						<div className='relative h-96 overflow-hidden'>
							<img
								src={post.images[0]}
								alt={post.title}
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent md:bg-gradient-to-t'></div>

							<div className='absolute bottom-0 left-0 p-6 md:hidden'>
								<Badge className='bg-blue-600 border-0 text-white mb-2'>Featured Post</Badge>
								<h2 className='text-2xl font-bold text-white mb-2'>{post.title}</h2>
								<div className='flex items-center space-x-3 text-white/80 text-sm'>
									<span className='flex items-center'>
										<Calendar className='w-4 h-4 mr-1' />
										{formattedDate}
									</span>
									<span className='flex items-center'>
										<MapPin className='w-4 h-4 mr-1' />
										{post.location}
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className='w-full h-96 bg-gray-100 flex items-center justify-center'>
							<span className='text-gray-400'>No image available</span>
						</div>
					)}
				</div>

				<div className='md:w-1/3 p-6 flex flex-col'>
					<div className='flex-grow'>
						<Badge className='bg-blue-600 border-0 text-white mb-3 hidden md:inline-flex'>
							Featured Post
						</Badge>
						<h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3 hidden md:block group-hover:text-blue-600 transition-colors'>
							{post.title}
						</h2>

						<div className='flex items-center space-x-3 text-gray-500 text-sm mb-3 hidden md:flex'>
							<span className='flex items-center'>
								<Calendar className='w-4 h-4 mr-1' />
								{formattedDate}
							</span>
							<span className='flex items-center'>
								<MapPin className='w-4 h-4 mr-1' />
								{post.location}
							</span>
						</div>

						<p className='text-gray-600 line-clamp-6 text-sm md:block hidden'>{post.description}</p>
					</div>

					<Link href={`/posts/${post.id}`} className='mt-4 md:mt-auto'>
						<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
							Read the Article
							<ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

const Loading = () => (
	<div className='flex flex-col space-y-4 w-full'>
		<div className='w-full h-64 bg-gray-100 animate-pulse rounded-xl'></div>
		<div className='w-3/4 h-8 bg-gray-100 animate-pulse rounded-lg'></div>
		<div className='w-full h-20 bg-gray-100 animate-pulse rounded-lg'></div>
		<div className='w-1/2 h-10 bg-gray-100 animate-pulse rounded-lg'></div>
	</div>
);

const ErrorDisplay = ({ message }) => (
	<div className='bg-red-50 border border-red-100 rounded-xl p-8 text-center'>
		<div className='w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-8 w-8 text-red-500'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		</div>
		<h3 className='text-xl font-bold text-red-800 mb-2'>Something went wrong</h3>
		<p className='text-red-600 mb-6'>{message || 'Unable to load articles. Please try again later.'}</p>
		<Button
			variant='outline'
			className='border-red-200 text-red-600 hover:bg-red-50'
			onClick={() => window.location.reload()}
		>
			Try Again
		</Button>
	</div>
);

const EmptyState = () => (
	<div className='bg-blue-50 border border-blue-100 rounded-xl p-8 text-center'>
		<div className='w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-8 w-8 text-blue-500'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
				/>
			</svg>
		</div>
		<h3 className='text-xl font-bold text-blue-800 mb-2'>No posts yet</h3>
		<p className='text-blue-600 mb-6'>There are currently no travel articles. Please check back later!</p>
	</div>
);

const PostPage = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['posts'],
		queryFn: getAllPost,
	});

	// State to manage visible posts
	const [visiblePostCount, setVisiblePostCount] = useState(6);

	// Process returned data
	const posts = data || [];
	const hasPosts = posts.length > 0;
	const featuredPost = hasPosts ? posts[0] : null;
	const otherPosts = hasPosts ? posts.slice(1) : [];

	// Get currently visible posts based on the state
	const visiblePosts = otherPosts.slice(0, visiblePostCount);

	// Check if we have more posts to load
	const hasMorePosts = visiblePosts.length < otherPosts.length;

	// Function to handle loading more posts
	const handleSeeMoreArticles = () => {
		// Increase the number of visible posts by 6 (or however many you want to show per "page")
		setVisiblePostCount((prevCount) => prevCount + 6);
	};

	return (
		<MainLayout>
			<section className='sec-com bg-gray-50'>
				<div className='container-lg'>
					<div className='mb-12 text-center'>
						<h1 className='text-4xl font-bold mb-4'>
							Explore <span className='text-blue-600'>Destinations</span>
						</h1>
						<p className='text-gray-600 max-w-3xl mx-auto'>
							Discover exciting destinations, share experiences and find new perspectives on the world
							around us.
						</p>
					</div>

					{isLoading ? (
						<div className='space-y-12'>
							<Loading />
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								<Loading />
								<Loading />
								<Loading />
							</div>
						</div>
					) : error ? (
						<ErrorDisplay message={error.message} />
					) : !hasPosts ? (
						<EmptyState />
					) : (
						<>
							{featuredPost && <FeaturedPost post={featuredPost} />}

							{otherPosts.length > 0 && (
								<div className='space-y-8'>
									<div className='flex items-center'>
										<h2 className='text-2xl font-bold text-gray-800'>Latest Articles</h2>
										<div className='ml-4 flex-grow h-px bg-gray-200'></div>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{visiblePosts.map((post) => (
											<PostCard key={post.id} post={post} />
										))}
									</div>
								</div>
							)}

							{hasMorePosts && (
								<div className='mt-12 text-center'>
									<Button
										onClick={handleSeeMoreArticles}
										className='bg-blue-600 hover:bg-blue-700 px-8'
									>
										Load More Articles
										<ChevronDown className='w-4 h-4 ml-2' />
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</MainLayout>
	);
};

export default PostPage;
