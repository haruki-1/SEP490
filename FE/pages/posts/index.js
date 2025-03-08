import { useQuery } from '@tanstack/react-query';
import { getAllPost } from '@/pages/api/posts/getPosts';
import MainLayout from '@/pages/layout';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';

const PostCard = ({ post }) => {
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl'>
			<div className='relative h-64 overflow-hidden'>
				{post.images && post.images.length > 0 ? (
					<img src={post.images[0]} alt={post.title} className='w-full h-full object-cover' />
				) : (
					<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
						<span className='text-gray-400'>No images</span>
					</div>
				)}
				<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
					<h3 className='text-xl font-bold text-white'>{post.title}</h3>
					<div className='flex items-center mt-2'>
						<span className='text-white/80 text-sm'>{formattedDate}</span>
						<span className='mx-2 text-white/60'>•</span>
						<span className='text-white/80 text-sm'>{post.location}</span>
					</div>
				</div>
			</div>
			<div className='p-4'>
				<p className='text-gray-600 line-clamp-3'>{post.description}</p>
				<Link href={`/posts/${post.id}`}>
					<button className='mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium'>
						See more
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4 ml-1'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M14 5l7 7m0 0l-7 7m7-7H3'
							/>
						</svg>
					</button>
				</Link>
			</div>
		</div>
	);
};

const FeaturedPost = ({ post }) => {
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='relative bg-white rounded-lg shadow-lg overflow-hidden mb-8'>
			<div className='md:flex'>
				<div className='md:w-2/3 lg:w-3/4 relative h-96 md:h-96 border-r'>
					{post.images && post.images.length > 0 ? (
						<img src={post.images[0]} alt={post.title} className='w-full h-full object-contain' />
					) : (
						<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
							<span className='text-gray-400'>No images</span>
						</div>
					)}
					<div className='absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent md:hidden'></div>
				</div>
				<div className='md:w-1/3 lg:w-1/4 p-6 flex flex-col gap-3'>
					<span className='text-blue-600 font-semibold'>{post.location}</span>
					<h2 className='text-2xl md:text-3xl font-bold'>{post.title}</h2>
					<p className='text-gray-600 line-clamp-5'>{post.description}</p>
					<div className='text-gray-500 text-sm'>{formattedDate}</div>
					<Link href={`/posts/${post.id}`}>
						<button className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-auto'>
							Read the article
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 ml-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M14 5l7 7m0 0l-7 7m7-7H3'
								/>
							</svg>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

const Loading = () => (
	<div className='flex flex-col space-y-4 w-full'>
		<div className='w-full h-64 bg-gray-200 animate-pulse rounded-lg'></div>
		<div className='w-3/4 h-8 bg-gray-200 animate-pulse rounded'></div>
		<div className='w-full h-24 bg-gray-200 animate-pulse rounded'></div>
	</div>
);

const ErrorDisplay = ({ message }) => (
	<div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-12 w-12 mx-auto text-red-400 mb-4'
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
		<h3 className='text-lg font-medium text-red-800 mb-2'>An error occurred.</h3>
		<p className='text-red-600'>{message || 'Unable to load article. Please try again later.'}</p>
	</div>
);

const EmptyState = () => (
	<div className='bg-blue-50 border border-blue-100 rounded-lg p-8 text-center'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-16 w-16 mx-auto text-blue-400 mb-4'
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
		<h3 className='text-xl font-medium text-blue-800 mb-2'>No posts yet</h3>
		<p className='text-blue-600 mb-6'>There are currently no travel articles. Please come back later!</p>
	</div>
);

const PostPage = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['posts'],
		queryFn: getAllPost,
	});

	// State to manage visible posts
	const [visiblePostCount, setVisiblePostCount] = useState(6);

	// Xử lý dữ liệu trả về
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
			<div className='sec-com bg-gray-50'>
				<div className='container-lg px-4 mx-auto'>
					<div className='mb-4 text-center'>
						<h1 className='text-4xl font-bold mb-4'>Explore Destination</h1>
						<p className='text-gray-600 max-w-3xl mx-auto'>
							Let's explore exciting destinations, share experiences and find new perspectives on the
							world around us.
						</p>
					</div>

					{isLoading ? (
						<div className='space-y-8'>
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
								<div className='flex flex-col gap-4'>
									<div className='flex items-center'>
										<h2 className='text-2xl font-bold'>Latest Posts</h2>
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
									<button
										onClick={handleSeeMoreArticles}
										className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition'
									>
										See more articles
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default PostPage;
