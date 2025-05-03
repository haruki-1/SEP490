import { useQuery } from '@tanstack/react-query';
import { getAllPost } from 'pages/api/posts/getPosts';
import MainLayout from 'pages/layout';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Clock, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';
import { useTranslation } from 'react-i18next'; 
import Loading from 'pages/loading';

// (PostCard, FeaturedPost giữ nguyên, chỉ sửa text phần No Image)

const PostCard = ({ post }) => {
	const { t } = useTranslation();
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md group'>
			<div className='relative flex-shrink-0 h-64 overflow-hidden'>
				{post.images && post.images.length > 0 ? (
					<img
						src={post.images[0]}
						alt={post.title}
						className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
					/>
				) : (
					<div className='flex items-center justify-center w-full h-full bg-gray-100'>
						<span className='text-gray-400'>{t('no-image')}</span>
					</div>
				)}
				<Badge className='absolute text-blue-600 border-0 shadow-sm top-3 left-3 bg-white/90 backdrop-blur-sm'>
					<MapPin className='w-3 h-3 mr-1' />
					{post.location}
				</Badge>
				<Badge className='absolute text-gray-700 border-0 shadow-sm top-3 right-3 bg-white/90 backdrop-blur-sm'>
					<Calendar className='w-3 h-3 mr-1' />
					{formattedDate}
				</Badge>
				<div className='absolute inset-0 transition-opacity bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80'></div>
			</div>

			<div className='flex flex-col flex-grow p-5'>
				<h3 className='mb-3 text-xl font-bold text-gray-800 transition-colors line-clamp-2 group-hover:text-blue-600'>
					{post.title}
				</h3>

				<p className='flex-grow mb-4 text-sm text-gray-600 line-clamp-3'>{post.description}</p>

				<Link href={`/posts/${post.id}`}>
					<Button
						variant='outline'
						className='justify-center w-full mt-auto text-blue-600 transition-colors border-blue-200 hover:bg-blue-50 hover:text-blue-700 group-hover:border-blue-300'
					>
						{t('read-more')} {/* ✅ */}
						<ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
					</Button>
				</Link>
			</div>
		</div>
	);
};

const FeaturedPost = ({ post }) => {
	const { t } = useTranslation(); // ✅
	const formattedDate = format(new Date(post.publishDate), 'dd MMMM, yyyy', { locale: vi });

	return (
		<div className='mb-12 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl group hover:shadow-md'>
			<div className='md:flex'>
				<div className='relative overflow-hidden md:w-2/3'>
					{post.images && post.images.length > 0 ? (
						<div className='relative overflow-hidden h-96'>
							<img
								src={post.images[0]}
								alt={post.title}
								className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent md:bg-gradient-to-t'></div>

							<div className='absolute bottom-0 left-0 p-6 md:hidden'>
								<Badge className='mb-2 text-white bg-blue-600 border-0'>{t('featured-badge')}</Badge>
								<h2 className='mb-2 text-2xl font-bold text-white'>{post.title}</h2>
								<div className='flex items-center space-x-3 text-sm text-white/80'>
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
						<div className='flex items-center justify-center w-full bg-gray-100 h-96'>
							<span className='text-gray-400'>{t('no-image')}</span> 
						</div>
					)}
				</div>

				<div className='flex flex-col p-6 md:w-1/3'>
					<div className='flex-grow'>
						<Badge className='hidden mb-3 text-white bg-blue-600 border-0 md:inline-flex'>
							{t('featured-badge')}
						</Badge>
						<h2 className='hidden mb-3 text-2xl font-bold text-gray-800 transition-colors md:text-3xl md:block group-hover:text-blue-600'>
							{post.title}
						</h2>

						<div className='items-center hidden mb-3 space-x-3 text-sm text-gray-500 md:flex'>
							<span className='flex items-center'>
								<Calendar className='w-4 h-4 mr-1' />
								{formattedDate}
							</span>
							<span className='flex items-center'>
								<MapPin className='w-4 h-4 mr-1' />
								{post.location}
							</span>
						</div>

						<p className='hidden text-sm text-gray-600 line-clamp-6 md:block'>{post.description}</p>
					</div>

					<Link href={`/posts/${post.id}`} className='mt-4 md:mt-auto'>
						<Button className='w-full text-white bg-blue-600 hover:bg-blue-700'>
							{t('read-article-button')}
							<ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

const ErrorDisplay = ({ message }) => {
	const { t } = useTranslation(); 
	return (
		<div className='p-8 text-center border border-red-100 bg-red-50 rounded-xl'>
			...
			<h3 className='mb-2 text-xl font-bold text-red-800'>{t('error-title')}</h3>
			<p className='mb-6 text-red-600'>{message || t('error-description')}</p>
			<Button
				variant='outline'
				className='text-red-600 border-red-200 hover:bg-red-50'
				onClick={() => window.location.reload()}
			>
				{t('error-button')}
			</Button>
		</div>
	);
};

const EmptyState = () => {
	const { t } = useTranslation(); 
	return (
		<div className='p-8 text-center border border-blue-100 bg-blue-50 rounded-xl'>
			...
			<h3 className='mb-2 text-xl font-bold text-blue-800'>{t('empty-title')}</h3>
			<p className='mb-6 text-blue-600'>{t('empty-description')}</p>
		</div>
	);
};

const PostPage = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useQuery({
		queryKey: ['posts'],
		queryFn: getAllPost,
	});

	// State to manage visible posts
	const [visiblePostCount, setVisiblePostCount] = useState(6);

	// Filter posts by status (only show posts with status "Publish")
	const filteredPosts = data ? data.filter((post) => post.status === 'Publish') : [];

	// Process returned data
	const hasPosts = filteredPosts.length > 0;
	const featuredPost = hasPosts ? filteredPosts[0] : null;
	const otherPosts = hasPosts ? filteredPosts.slice(1) : [];
	const visiblePosts = otherPosts.slice(0, visiblePostCount);
	const hasMorePosts = visiblePosts.length < otherPosts.length;

	// Function to handle loading more posts
	const handleSeeMoreArticles = () => {
		// Increase the number of visible posts by 6 (or however many you want to show per "page")
		setVisiblePostCount((prevCount) => prevCount + 6);
	};

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
	  setMounted(true);
	}, []);
	return (
		mounted && (
		<MainLayout>
			<section className='sec-com bg-gray-50'>
				<div className='container-lg'>
					<div className='mb-12 text-center'>
						<h1 className='mb-4 text-4xl font-bold'>{t('page-title')}</h1>
						<p className='max-w-3xl mx-auto text-gray-600'>{t('page-subtitle')}</p>
					</div>

					{isLoading ? (
						<div className='space-y-12'>
							<Loading />
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
										<h2 className='text-2xl font-bold text-gray-800'>{t('latest-articles')}</h2>
										<div className='flex-grow h-px ml-4 bg-gray-200'></div>
									</div>

									<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
										{visiblePosts.map((post) => (
											<PostCard key={post.id} post={post} />
										))}
									</div>
								</div>
							)}

							{hasMorePosts && (
								<div className='mt-12 text-center'>
									<Button onClick={handleSeeMoreArticles} className='px-8 bg-blue-600 hover:bg-blue-700'>
										{t('load-more-articles')}
										<ChevronDown className='w-4 h-4 ml-2' />
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</MainLayout>
	))
};

export default PostPage;