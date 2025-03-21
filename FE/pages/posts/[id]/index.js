import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getPostDetail } from '@/pages/api/posts/getPostDetail';
import { getUserById } from '@/pages/api/user/getUserById';
import { createComment } from '@/pages/api/posts/createComment';
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { MapPin, Calendar, ArrowLeft, MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar';
import { Badge } from '@/components/components/ui/badge';
import Link from 'next/link';
import { Textarea } from '@/components/components/ui/textarea';
import { useAuth } from '@/context/AuthProvider';
import MainLayout from '@/pages/layout';

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
				author: dataProfile?.fullName || 'Guest User',
				avatar: dataProfile?.avatar || 'https://api.dicebear.com/6.x/avataaars/svg?seed=guest',
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
			// parentID: postOwnerId,
		};

		commentMutation.mutate(commentData);
	};

	// Format date properly
	const formatDate = (dateString) => {
		if (!dateString) return '';

		try {
			return new Date(dateString).toLocaleDateString('vi-VN', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		} catch (e) {
			return dateString;
		}
	};

	// Get initials for avatar fallback
	const getInitials = (name) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	if (isLoading) {
		return (
			<MainLayout>
				<div className='min-h-[600px] flex items-center justify-center'>
					<div className='flex flex-col items-center'>
						<div className='w-12 h-12 border-t-4 border-blue-600 rounded-full animate-spin'></div>
						<p className='mt-4 text-gray-600'>Loading post...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	if (error) {
		return (
			<MainLayout>
				<div className='container-lg py-16'>
					<div className='max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100'>
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
						<h2 className='text-2xl font-bold text-red-600 mb-2 text-center'>Error Loading Post</h2>
						<p className='text-gray-600 text-center mb-6'>
							We couldn't load the post details. Please try again later.
						</p>
						<div className='flex justify-center gap-3'>
							<Button variant='outline' className='border-gray-200 text-gray-700' asChild>
								<Link href='/posts'>
									<ArrowLeft className='mr-2 h-4 w-4' />
									Back to Posts
								</Link>
							</Button>
							<Button className='bg-blue-600 hover:bg-blue-700' onClick={() => window.location.reload()}>
								Try Again
							</Button>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className='sec-com bg-gray-50'>
				<article className='container-lg'>
					{/* Back button */}
					<div className='mb-6'>
						<Button variant='ghost' className='text-gray-600 hover:text-blue-600' asChild>
							<Link href='/posts'>
								<ArrowLeft className='mr-1 h-4 w-4' />
								Back to Posts
							</Link>
						</Button>
					</div>

					{/* Post Header */}
					<header className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8'>
						{/* Hero Image if exists */}
						{data?.images && data.images.length > 0 && (
							<div className='relative h-72 md:h-96 w-full overflow-hidden'>
								<img src={data.images[0]} alt={data.title} className='w-full h-full object-cover' />
								<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

								{/* Location badge */}
								{data?.location && (
									<Badge className='absolute top-4 right-4 backdrop-blur-sm border-0 shadow-sm'>
										<MapPin className='w-3.5 h-3.5 mr-1 ' />
										{data.location}
									</Badge>
								)}

								{/* Date badge */}
								{data?.publishDate && (
									<Badge className='absolute top-4 left-4 backdrop-blur-sm border-0 shadow-sm'>
										<Calendar className='w-3.5 h-3.5 mr-1' />
										{formatDate(data.publishDate)}
									</Badge>
								)}
							</div>
						)}

						<div className='p-6 md:p-8'>
							{/* Title */}
							<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
								{data?.title}
							</h1>

							{/* Author and Date */}
							<div className='flex items-center gap-4 mb-8'>
								<Avatar className='h-12 w-12 border border-gray-200'>
									{userPost?.avatar ? (
										<AvatarImage src={userPost.avatar} alt={userPost?.fullName || 'Author'} />
									) : null}
									<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
										{getInitials(userPost?.fullName)}
									</AvatarFallback>
								</Avatar>

								<div>
									<p className='font-medium text-gray-900'>
										{userPost?.fullName || 'Unknown Author'}
									</p>

									<div className='flex flex-wrap items-center gap-3 text-sm text-gray-500'>
										<time>{formatDate(data?.publishDate)}</time>

										{!data?.images?.length && data?.location && (
											<div className='flex items-center'>
												<span className='mx-2 text-gray-300'>•</span>
												<MapPin className='w-3.5 h-3.5 mr-1 text-gray-400' />
												<span>{data.location}</span>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Description */}
							<div className='prose max-w-none'>
								<p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
									{data?.description}
								</p>
							</div>
						</div>
					</header>

					{/* Photo Gallery */}
					{data?.images && data.images.length > 1 && (
						<section className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8 mb-8'>
							<h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 mr-2 text-blue-600'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path
										fillRule='evenodd'
										d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
										clipRule='evenodd'
									/>
								</svg>
								Photo Gallery
							</h3>

							<PhotoProvider maskOpacity={0.8}>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
									{data.images.map((img, index) => (
										<PhotoView key={index} src={img}>
											<div className='aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group'>
												<img
													src={img}
													alt={`Image ${index + 1} for ${data.title}`}
													className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
												/>
											</div>
										</PhotoView>
									))}
								</div>
							</PhotoProvider>
						</section>
					)}

					{/* Comments Section */}
					<section className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
						<div className='p-6 md:p-8'>
							<h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
								<MessageCircle className='w-5 h-5 mr-2 text-blue-600' />
								Comments
							</h3>

							{/* Comment Form */}
							<form onSubmit={handleSubmitComment} className='mb-8'>
								<div className='flex items-start gap-4'>
									<Avatar className='h-10 w-10 flex-shrink-0'>
										{dataProfile?.avatar ? (
											<AvatarImage
												src={dataProfile.avatar}
												alt={dataProfile?.fullName || 'You'}
											/>
										) : (
											<AvatarImage
												src='https://api.dicebear.com/6.x/avataaars/svg?seed=guest'
												alt='Guest'
											/>
										)}
										<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
											{getInitials(dataProfile?.fullName)}
										</AvatarFallback>
									</Avatar>

									<div className='flex-1'>
										<Textarea
											value={commentText}
											onChange={(e) => setCommentText(e.target.value)}
											placeholder='Add a comment...'
											className='w-full resize-none focus:border-blue-300 min-h-[100px]'
										/>

										<div className='mt-3 flex justify-end'>
											<Button
												type='submit'
												className='bg-blue-600 hover:bg-blue-700'
												disabled={!commentText.trim() || isSubmitting}
											>
												{isSubmitting ? (
													<>
														<Loader2 className='mr-2 h-4 w-4 animate-spin' />
														Posting...
													</>
												) : (
													<>
														<Send className='mr-2 h-4 w-4' />
														Post Comment
													</>
												)}
											</Button>
										</div>
									</div>
								</div>
							</form>

							{/* Display comments - placeholder since there's no comment rendering in original code */}
							{localComments.length > 0 ? (
								<div className='space-y-6'>
									{localComments.map((comment) => (
										<div key={comment.id} className='flex gap-4'>
											<Avatar className='h-10 w-10 flex-shrink-0'>
												<AvatarImage src={comment.avatar} alt={comment.author} />
												<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
													{getInitials(comment.author)}
												</AvatarFallback>
											</Avatar>

											<div className='flex-1'>
												<div className='flex items-center gap-2'>
													<h4 className='font-medium text-gray-900'>{comment.author}</h4>
													<span className='text-xs text-gray-500'>
														{formatDate(comment.date)}
													</span>
												</div>
												<p className='text-gray-700 mt-1'>{comment.text}</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className='text-center py-8 text-gray-500'>
									<MessageCircle className='w-12 h-12 mx-auto text-gray-300 mb-3' />
									<p>No comments yet. Be the first to comment!</p>
								</div>
							)}
						</div>
					</section>
				</article>
			</div>
		</MainLayout>
	);
};

export default PostDetail;
