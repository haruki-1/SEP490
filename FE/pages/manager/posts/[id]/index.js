import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getPostDetail } from '@/pages/api/posts/getPostDetail';
import { getUserById } from '@/pages/api/user/getUserById';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Button } from '@/components/components/ui/button';
import { Calendar, MapPin, ArrowLeft, User, Clock } from 'lucide-react';
import Link from 'next/link';
import ManagerLayout from '../../layout';

const PostDetail = () => {
	const { id } = useParams() ?? {};
	const router = useRouter();

	const { data, isLoading, error } = useQuery({
		queryKey: ['postDetail', id],
		queryFn: () => getPostDetail(id),
		enabled: !!id,
	});

	const userId = data?.userID;
	const {
		data: userPost,
		isLoading: userLoading,
		error: userError,
	} = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	});

	// Format date to a readable string
	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString('en', options);
	};

	return (
		<ManagerLayout>
			<div className='p-6'>
				<Button
					variant='outline'
					className='flex items-center mb-6 text-gray-600'
					onClick={() => router.back()}
				>
					<ArrowLeft size={16} className='mr-2' />
					Back to Posts
				</Button>

				{isLoading ? (
					<div className='flex items-center justify-center h-64'>
						<div className='w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : error ? (
					<div className='p-4 mb-4 border-l-4 border-red-500 rounded bg-red-50'>
						<div className='flex'>
							<div className='ml-3'>
								<p className='text-sm text-red-700'>
									Error loading post details: {error?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl'>
						{/* Post Header */}
						<div className='p-6 border-b border-gray-100'>
							<h1 className='text-2xl font-bold text-gray-800'>{data?.title}</h1>

							<div className='flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between'>
								{/* Author information */}
								<div className='flex items-center'>
									{userLoading ? (
										<div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse'></div>
									) : userError ? (
										<div className='flex items-center justify-center w-10 h-10 text-white bg-gray-400 rounded-full'>
											<User size={16} />
										</div>
									) : (
										<div className='relative w-10 h-10 mr-3 overflow-hidden rounded-full'>
											<img
												src={userPost?.avatar || '/placeholder-avatar.jpg'}
												alt={userPost?.fullName || 'User'}
												className='object-cover w-full h-full'
											/>
										</div>
									)}

									<div className='ml-3'>
										<p className='font-medium text-gray-800'>
											{userLoading ? (
												<span className='w-24 h-4 bg-gray-200 rounded animate-pulse'></span>
											) : (
												userPost?.fullName || 'Unknown User'
											)}
										</p>
										<div className='flex items-center text-sm text-gray-500'>
											<User size={14} className='mr-1' />
											{userPost?.role || 'User'}
										</div>
									</div>
								</div>

								{/* Post metadata */}
								<div className='flex flex-col gap-2 text-sm text-gray-500 sm:items-end'>
									<div className='flex items-center'>
										<Calendar size={14} className='mr-2' />
										{formatDate(data?.publishDate)}
									</div>

									{data?.location && (
										<div className='flex items-center'>
											<MapPin size={14} className='mr-2' />
											{data.location}
										</div>
									)}

									<div className='flex items-center'>
										<Clock size={14} className='mr-2' />
										{`Posted ${new Date(data?.publishDate).toLocaleDateString('vi-VN')}`}
									</div>
								</div>
							</div>
						</div>

						{/* Post Content */}
						<div className='p-6'>
							{/* Description */}
							<div className='mb-8'>
								<h2 className='mb-4 text-xl font-semibold text-gray-800'>Description</h2>
								<p className='text-gray-700 whitespace-pre-line'>
									{data?.description || 'No description provided.'}
								</p>
							</div>

							{/* Photo Gallery */}
							<div className='mt-6'>
								<h2 className='mb-4 text-xl font-semibold text-gray-800'>Photos</h2>

								{data?.images && data.images.length > 0 ? (
									<PhotoProvider>
										<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
											{data.images.map((img, index) => (
												<PhotoView key={index} src={img}>
													<div className='overflow-hidden bg-gray-100 border border-gray-200 rounded-lg aspect-square'>
														<img
															src={img}
															alt={`Image ${index + 1}`}
															className='object-cover w-full h-full transition duration-300 cursor-pointer hover:scale-105'
														/>
													</div>
												</PhotoView>
											))}
										</div>
									</PhotoProvider>
								) : (
									<p className='p-4 text-center text-gray-500 rounded-lg bg-gray-50'>
										No photos available
									</p>
								)}
							</div>
						</div>

						{/* Actions */}
						<div className='flex justify-end p-6 border-t border-gray-100'>
							<div className='flex gap-3'>
								<Link href={`/manager/posts/edit/${id}`}>
									<Button
										variant='outline'
										className='text-blue-600 border-blue-500 hover:bg-blue-50'
									>
										Edit Post
									</Button>
								</Link>
								<Link href='/manager/posts'>
									<Button>Back to All Posts</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</ManagerLayout 	>
	);
};

export default PostDetail;
