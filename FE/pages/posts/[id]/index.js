import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getPostDetail } from '@/pages/api/posts/getPostDetail';
import { getUserById } from '@/pages/api/user/getUserById';
import { createComment } from '@/pages/api/posts/createComment';
import MainLayout from '@/pages/layout';
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useAuth } from '@/context/AuthProvider';

const PostDetail = () => {
	const { id } = useParams() ?? {};
	const [commentText, setCommentText] = useState('');
	const [localComments, setLocalComments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const queryClient = useQueryClient();
	const { dataProfile } = useAuth();

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

	const commentMutation = useMutation({
		mutationFn: (commentData) => {
			return createComment(dataProfile.id, commentData);
		},
		onSuccess: (data) => {
			const newComment = {
				id: data?.id || Date.now(),
				text: commentText,
				author: userPost?.fullName || 'Guest User',
				avatar: userPost?.avatar || 'https://api.dicebear.com/6.x/avataaars/svg?seed=guest',
				date: new Date(),
			};

			setLocalComments([newComment, ...localComments]);
			setCommentText('');
			setIsSubmitting(false);

			queryClient.invalidateQueries(['postDetail', id]);
		},
		onError: (error) => {
			console.error('Failed to post comment:', error);
			setIsSubmitting(false);
			alert('Failed to post comment. Please try again.');
		},
	});

	const handleSubmitComment = (e) => {
		e.preventDefault();
		if (!commentText.trim() || isSubmitting) return;

		setIsSubmitting(true);

		const postOwnerId = data?.userID;

		const commentData = {
			comment: commentText,
			postID: id,
			parentID: postOwnerId,
		};

		commentMutation.mutate(commentData);
	};

	if (isLoading) {
		return (
			<MainLayout>
				<div className='min-h-screen flex items-center justify-center'>
					<div className='flex flex-col items-center'>
						<div className='w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin'></div>
						<p className='mt-4 text-lg text-gray-600'>Loading post...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	if (error) {
		return (
			<MainLayout>
				<div className='min-h-screen flex items-center justify-center'>
					<div className='max-w-md p-6 bg-white rounded-lg shadow-lg'>
						<h2 className='text-2xl font-bold text-red-500 mb-4'>Error Loading Post</h2>
						<p className='text-gray-600'>We couldn't load the post details. Please try again later.</p>
						<button
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
							onClick={() => window.location.reload()}
						>
							Retry
						</button>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className='sec-com'>
				<div className='container-lg'>
					{/* Post Header Section */}
					<div className='overflow-hidden mb-6'>
						<div className='p-6'>
							<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center'>
								{data?.title}
							</h1>

							{/* Author and Date */}
							<div className='flex items-center justify-between border-b pb-4 mb-6'>
								<div className='flex items-center gap-3'>
									{userPost?.avatar && (
										<img
											src={userPost.avatar}
											alt={userPost?.fullName || 'Author'}
											className='size-12 sm:size-14 rounded-full border-2 border-blue-500 shadow'
										/>
									)}
									<div className='flex flex-col'>
										<p className='font-medium text-gray-900'>
											{userPost?.fullName || 'Unknown Author'}
										</p>
										<time className='text-sm text-gray-500'>
											{new Date(data?.publishDate).toLocaleDateString('vi-VN', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</time>
									</div>
								</div>

								{data?.location && (
									<div className='hidden sm:flex items-center text-gray-600 text-sm'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5 mr-1'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
										<span>{data.location}</span>
									</div>
								)}
							</div>

							{/* Mobile Location */}
							{data?.location && (
								<div className='sm:hidden flex items-center text-gray-600 text-sm mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 mr-1'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
									<span>{data.location}</span>
								</div>
							)}

							{/* Description */}
							<div className='prose max-w-none'>
								<p className='text-gray-700 text-base sm:text-lg leading-relaxed mb-6'>
									{data?.description}
								</p>
							</div>
						</div>

						{/* Photo Gallery */}
						{data?.images && data.images.length > 0 && (
							<div className='px-6 pb-6'>
								<h3 className='text-xl font-semibold text-gray-800 mb-4'>Photo Gallery</h3>
								<PhotoProvider maskOpacity={0.8}>
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
										{data.images.map((img, index) => (
											<PhotoView key={index} src={img}>
												<div className='aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group'>
													<img
														src={img}
														alt={`Image ${index + 1} for ${data.title}`}
														className='w-full h-full object-cover group-hover:opacity-90 transition duration-300'
													/>
												</div>
											</PhotoView>
										))}
									</div>
								</PhotoProvider>
							</div>
						)}
					</div>

					{/* Comments Section */}
					<div className='bg-white rounded-lg shadow-md overflow-hidden'>
						<div className='p-6'>
							<h3 className='text-xl font-semibold text-gray-800 mb-6'>Comments</h3>

							{/* Comment Form */}
							<form onSubmit={handleSubmitComment} className='mb-8'>
								<div className='flex items-start gap-3'>
									<img
										src='https://api.dicebear.com/6.x/avataaars/svg?seed=guest'
										alt='Guest'
										className='size-10 rounded-full'
									/>
									<div className='flex-1'>
										<textarea
											value={commentText}
											onChange={(e) => setCommentText(e.target.value)}
											placeholder='Add a comment...'
											className='w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
											rows='3'
										></textarea>
										<div className='mt-2 flex justify-end'>
											<button
												type='submit'
												className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
												disabled={!commentText.trim() || isSubmitting}
											>
												{isSubmitting ? (
													<span className='flex items-center'>
														<svg
															className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
														>
															<circle
																className='opacity-25'
																cx='12'
																cy='12'
																r='10'
																stroke='currentColor'
																strokeWidth='4'
															></circle>
															<path
																className='opacity-75'
																fill='currentColor'
																d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
															></path>
														</svg>
														Posting...
													</span>
												) : (
													'Post Comment'
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default PostDetail;
