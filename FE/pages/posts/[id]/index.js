import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getPostDetail } from '@/pages/api/posts/getPostDetail';
import { getUserById } from '@/pages/api/user/getUserById';
import { createComment } from '@/pages/api/posts/createComment';
import MainLayout from '@/pages/layout';
import React, { useState, useRef } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useAuth } from 'context/AuthProvider';
import { MapPin, Calendar, ArrowLeft, MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar';
import { Badge } from '@/components/components/ui/badge';
import Link from 'next/link';
import { Textarea } from '@/components/components/ui/textarea';

const PostDetail = () => {
	const { id } = useParams() ?? {};
	const [commentText, setCommentText] = useState('');
	const [replyText, setReplyText] = useState('');
	const [replyingTo, setReplyingTo] = useState(null);
	const [localComments, setLocalComments] = useState([]);
	const [localReplies, setLocalReplies] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const replyInputRef = useRef(null);
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
		onSuccess: (data, variables) => {
			if (variables.parentID) {
				const newReply = {
					id: data?.id || Date.now(),
					comment: replyText,
					commentDate: new Date(),
					userID: dataProfile?.id,
					fullName: dataProfile?.fullName || 'Guest User',
					postID: id,
					parentID: variables.parentID,
				};

				setLocalReplies((prev) => ({
					...prev,
					[variables.parentID]: [...(prev[variables.parentID] || []), newReply],
				}));

				setReplyText('');
				setReplyingTo(null);
			} else {
				// This is a main comment
				const newComment = {
					id: data?.id || Date.now(),
					comment: commentText,
					commentDate: new Date(),
					userID: dataProfile?.id,
					fullName: dataProfile?.fullName || 'Guest User',
					postID: id,
					replies: [],
				};

				setLocalComments([newComment, ...localComments]);
				setCommentText('');
			}

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

		const commentData = {
			comment: commentText,
			postID: id,
		};

		commentMutation.mutate(commentData);
	};

	const handleSubmitReply = (e, parentComment) => {
		e.preventDefault();
		if (!replyText.trim() || isSubmitting) return;

		setIsSubmitting(true);

		const commentData = {
			comment: replyText,
			postID: id,
			parentID: parentComment.id,
		};

		commentMutation.mutate(commentData);
	};

	const handleReplyClick = (comment) => {
		setReplyingTo(comment.id);
		setReplyText('');

		setTimeout(() => {
			if (replyInputRef.current) {
				replyInputRef.current.focus();
			}
		}, 100);
	};

	const handleCancelReply = () => {
		setReplyingTo(null);
		setReplyText('');
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

	// Get relative time for comments
	const getRelativeTime = (dateString) => {
		if (!dateString) return '';

		try {
			const date = new Date(dateString);
			const now = new Date();
			const diffInSeconds = Math.floor((now - date) / 1000);

			if (diffInSeconds < 60) {
				return 'just now';
			} else if (diffInSeconds < 3600) {
				const minutes = Math.floor(diffInSeconds / 60);
				return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
			} else if (diffInSeconds < 86400) {
				const hours = Math.floor(diffInSeconds / 3600);
				return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
			} else if (diffInSeconds < 604800) {
				const days = Math.floor(diffInSeconds / 86400);
				return `${days} ${days === 1 ? 'day' : 'days'} ago`;
			} else {
				return formatDate(dateString);
			}
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
				<div className='py-16 container-lg'>
					<div className='max-w-md p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-xl'>
						<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-8 h-8 text-red-500'
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
						<h2 className='mb-2 text-2xl font-bold text-center text-red-600'>Error Loading Post</h2>
						<p className='mb-6 text-center text-gray-600'>
							We couldn't load the post details. Please try again later.
						</p>
						<div className='flex justify-center gap-3'>
							<Button variant='outline' className='text-gray-700 border-gray-200' asChild>
								<Link href='/posts'>
									<ArrowLeft className='w-4 h-4 mr-2' />
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

	// Combine API comments with local comments
	const allComments = [...localComments, ...(data?.comments || [])];
	const commentCount = allComments.length;

	return (
		<MainLayout>
			<div className='sec-com bg-gray-50'>
				<article className='container-lg'>
					{/* Back button */}
					<div className='mb-6'>
						<Button variant='ghost' className='text-gray-600 hover:text-blue-600' asChild>
							<Link href='/posts'>
								<ArrowLeft className='w-4 h-4 mr-1' />
								Back to Posts
							</Link>
						</Button>
					</div>

					{/* Post Header */}
					<header className='mb-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl'>
						{/* Hero Image if exists */}
						{data?.images && data.images.length > 0 && (
							<div className='relative w-full overflow-hidden h-72 md:h-96'>
								<img src={data.images[0]} alt={data.title} className='object-cover w-full h-full' />
								<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

								{/* Location badge */}
								{data?.location && (
									<Badge className='absolute border-0 shadow-sm top-4 right-4 backdrop-blur-sm'>
										<MapPin className='w-3.5 h-3.5 mr-1 ' />
										{data.location}
									</Badge>
								)}

								{/* Date badge */}
								{data?.publishDate && (
									<Badge className='absolute border-0 shadow-sm top-4 left-4 backdrop-blur-sm'>
										<Calendar className='w-3.5 h-3.5 mr-1' />
										{formatDate(data.publishDate)}
									</Badge>
								)}
							</div>
						)}

						<div className='p-6 md:p-8'>
							{/* Title */}
							<h1 className='mb-6 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl'>
								{data?.title}
							</h1>

							{/* Author and Date */}
							<div className='flex items-center gap-4 mb-8'>
								<Avatar className='w-12 h-12 border border-gray-200'>
									{userPost?.avatar ? (
										<AvatarImage src={userPost.avatar} alt={userPost?.fullName || 'Author'} />
									) : null}
									<AvatarFallback className='font-medium text-blue-600 bg-blue-100'>
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
								<p className='text-base leading-relaxed text-gray-700 sm:text-lg'>
									{data?.description}
								</p>
							</div>
						</div>
					</header>

					{/* Photo Gallery */}
					{data?.images && data.images.length > 1 && (
						<section className='p-6 mb-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl md:p-8'>
							<h3 className='flex items-center mb-6 text-xl font-semibold text-gray-800'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-5 h-5 mr-2 text-blue-600'
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
								<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
									{data.images.map((img, index) => (
										<PhotoView key={index} src={img}>
											<div className='overflow-hidden transition border border-gray-200 rounded-lg shadow-sm cursor-pointer aspect-square hover:shadow-md group'>
												<img
													src={img}
													alt={`Image ${index + 1} for ${data.title}`}
													className='object-cover w-full h-full transition duration-300 group-hover:scale-105'
												/>
											</div>
										</PhotoView>
									))}
								</div>
							</PhotoProvider>
						</section>
					)}

					{/* Comments Section */}
					<section className='overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl'>
						<div className='p-6 md:p-8'>
							<h3 className='flex items-center mb-6 text-xl font-semibold text-gray-800'>
								<MessageCircle className='w-5 h-5 mr-2 text-blue-600' />
								Comments{' '}
								{commentCount > 0 && <span className='ml-2 text-gray-500'>({commentCount})</span>}
							</h3>

							{/* Comment Form */}
							<form onSubmit={handleSubmitComment} className='mb-8'>
								<div className='flex items-start gap-4'>
									<Avatar className='flex-shrink-0 w-10 h-10'>
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
										<AvatarFallback className='font-medium text-blue-600 bg-blue-100'>
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

										<div className='flex justify-end mt-3'>
											<Button
												type='submit'
												className='bg-blue-600 hover:bg-blue-700'
												disabled={!commentText.trim() || isSubmitting}
											>
												{isSubmitting ? (
													<>
														<Loader2 className='w-4 h-4 mr-2 animate-spin' />
														Posting...
													</>
												) : (
													<>
														<Send className='w-4 h-4 mr-2' />
														Post Comment
													</>
												)}
											</Button>
										</div>
									</div>
								</div>
							</form>

							{/* Display comments */}
							{allComments.length > 0 ? (
								<div className='space-y-6'>
									{allComments.map((comment) => {
										// Get replies for this comment
										const apiReplies = comment.replies || [];
										const localCommentReplies = localReplies[comment.userID] || [];
										const allReplies = [...localCommentReplies, ...apiReplies];
										const hasReplies = allReplies.length > 0;

										return (
											<div
												key={comment.id}
												className='pb-6 border-b border-gray-100 last:border-0'
											>
												<div className='flex gap-4'>
													<Avatar className='flex-shrink-0 w-10 h-10'>
														<AvatarImage src={comment.avatar} alt={comment.fullName} />
														<AvatarFallback className='font-medium text-blue-600 bg-blue-100'>
															{getInitials(comment.fullName)}
														</AvatarFallback>
													</Avatar>

													<div className='flex-1'>
														<div className='flex flex-wrap items-center gap-2'>
															<h4 className='font-medium text-gray-900'>
																{comment.fullName}
															</h4>
															<span className='text-xs text-gray-500'>
																{getRelativeTime(comment.commentDate)}
															</span>
														</div>
														<p className='mt-1 text-gray-700'>{comment.comment}</p>

														{/* Reply button */}
														{replyingTo !== comment.id && (
															<button
																onClick={() => handleReplyClick(comment)}
																className='flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800'
															>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	className='w-4 h-4 mr-1'
																	fill='none'
																	viewBox='0 0 24 24'
																	stroke='currentColor'
																>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		strokeWidth={2}
																		d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
																	/>
																</svg>
																Reply
															</button>
														)}
													</div>
												</div>

												{/* Reply form */}
												{replyingTo === comment.id && (
													<div className='mt-3 ml-10'>
														<form
															onSubmit={(e) => handleSubmitReply(e, comment)}
															className='flex flex-col'
														>
															<div className='flex items-start gap-3'>
																<Avatar className='flex-shrink-0 w-8 h-8'>
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
																	<AvatarFallback className='font-medium text-blue-600 bg-blue-100'>
																		{getInitials(dataProfile?.fullName)}
																	</AvatarFallback>
																</Avatar>

																<div className='flex-1'>
																	<Textarea
																		ref={replyInputRef}
																		value={replyText}
																		onChange={(e) => setReplyText(e.target.value)}
																		placeholder={`Reply to ${comment.fullName}...`}
																		className='w-full resize-none focus:border-blue-300 text-sm min-h-[70px]'
																	/>

																	<div className='flex justify-end gap-2 mt-2'>
																		<Button
																			type='button'
																			variant='ghost'
																			size='sm'
																			onClick={handleCancelReply}
																			className='text-gray-600'
																		>
																			Cancel
																		</Button>
																		<Button
																			type='submit'
																			size='sm'
																			className='bg-blue-600 hover:bg-blue-700'
																			disabled={!replyText.trim() || isSubmitting}
																		>
																			{isSubmitting ? (
																				<>
																					<Loader2 className='w-3 h-3 mr-1 animate-spin' />
																					Posting...
																				</>
																			) : (
																				<>Reply</>
																			)}
																		</Button>
																	</div>
																</div>
															</div>
														</form>
													</div>
												)}

												{/* Display replies */}
												{hasReplies && (
													<div className='mt-4 ml-10 space-y-4'>
														{allReplies.map((reply) => (
															<div key={reply.id} className='flex gap-3'>
																<Avatar className='flex-shrink-0 w-8 h-8'>
																	{/* <AvatarImage
																		src={getAvatarUrl(reply.userID)}
																		alt={reply.fullName}
																	/> */}
																	<AvatarFallback className='text-xs font-medium text-blue-600 bg-blue-100'>
																		{getInitials(reply.fullName)}
																	</AvatarFallback>
																</Avatar>

																<div className='flex-1'>
																	<div className='flex flex-wrap items-center gap-2'>
																		<h4 className='text-sm font-medium text-gray-900'>
																			{reply.fullName}
																		</h4>
																		<span className='text-xs text-gray-500'>
																			{getRelativeTime(reply.commentDate)}
																		</span>
																	</div>
																	<p className='mt-1 text-sm text-gray-700'>
																		{reply.comment}
																	</p>
																</div>
															</div>
														))}
													</div>
												)}
											</div>
										);
									})}
								</div>
							) : (
								<div className='py-8 text-center text-gray-500'>
									<MessageCircle className='w-12 h-12 mx-auto mb-3 text-gray-300' />
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
