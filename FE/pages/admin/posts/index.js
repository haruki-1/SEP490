import React, { useState } from 'react';
import { Button } from '@/components/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPost } from '@/pages/api/posts/getPosts';
import Link from 'next/link';
import { approvePost } from '@/pages/api/posts/approvePost';
import { rejectPost } from '@/pages/api/posts/rejectPost';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, PlusCircle, Calendar, MapPin, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/components/ui/dialog';
import { Textarea } from '@/components/components/ui/textarea';
import AdminLayout from '../layout';

const Post = () => {
	const queryClient = useQueryClient();
	const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState(null);
	const [rejectReason, setRejectReason] = useState('');

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['posts'],
		queryFn: getAllPost,
	});

	// Mutation for approving a post
	const approveMutation = useMutation({
		mutationFn: approvePost,
		onSuccess: () => {
			queryClient.invalidateQueries(['posts']);
			Swal.fire({
				icon: 'success',
				title: 'Approved!',
				text: 'The post has been approved successfully.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: () => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Failed to approve post. Please try again.',
			});
		},
	});

	// Mutation for rejecting a post
	const rejectMutation = useMutation({
		mutationFn: ({ postID, reasonReject }) => rejectPost(postID, reasonReject),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts']);
			setRejectDialogOpen(false);
			setRejectReason('');
			Swal.fire({
				icon: 'success',
				title: 'Rejected!',
				text: 'The post has been rejected successfully.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: () => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Failed to reject post. Please try again.',
			});
		},
	});

	const handleApprove = (postID) => {
		Swal.fire({
			title: 'Approve this post?',
			text: 'This will make the post visible to all users.',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, approve it!',
		}).then((result) => {
			if (result.isConfirmed) {
				approveMutation.mutate(postID);
			}
		});
	};

	const openRejectDialog = (postID) => {
		setSelectedPostId(postID);
		setRejectReason('');
		setRejectDialogOpen(true);
	};

	const handleRejectPost = () => {
		if (!rejectReason.trim()) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please provide a reason for rejection.',
			});
			return;
		}

		rejectMutation.mutate({
			postID: selectedPostId,
			reasonReject: rejectReason,
		});
	};

	// Format date
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<AdminLayout>
			<div>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold text-gray-800'>Post Management</h1>
					<div className='flex gap-2'>
						<Button
							onClick={() => refetch()}
							variant='outline'
							className='flex items-center border border-gray-200'
						>
							<svg
								className='w-4 h-4 mr-2'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
									clipRule='evenodd'
								/>
							</svg>
							Refresh
						</Button>
						<Link href='/admin/posts/create'>
							<Button className='flex items-center'>
								<PlusCircle size={16} className='mr-2' />
								Create Post
							</Button>
						</Link>
					</div>
				</div>

				{isLoading ? (
					<div className='flex items-center justify-center h-64'>
						<div className='w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : error ? (
					<div className='p-4 mb-4 border-l-4 border-red-500 rounded bg-red-50'>
						<div className='flex'>
							<div className='ml-3'>
								<p className='text-sm text-red-700'>
									Error loading posts: {error?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : (
					<>
						{data && data.length === 0 ? (
							<div className='p-8 text-center bg-white rounded-lg shadow'>
								<div className='inline-block p-4 mb-4 bg-gray-100 rounded-full'>
									<FileText size={32} className='text-gray-400' />
								</div>
								<h3 className='mb-2 text-lg font-medium text-gray-800'>No Posts Found</h3>
								<p className='mb-4 text-gray-500'>There are no posts available at the moment.</p>
								<Link href='/manager/posts/create'>
									<Button>
										<PlusCircle size={16} className='mr-2' />
										Create First Post
									</Button>
								</Link>
							</div>
						) : (
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
								{data?.map((post) => (
									<div
										key={post.id}
										className='overflow-hidden transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md'
									>
										<div className='relative overflow-hidden aspect-video'>
											<img
												src={post?.images?.[0] || '/placeholder-image.jpg'}
												alt={post.title}
												className='object-cover w-full h-full'
											/>
											<div className='absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 hover:opacity-100 bg-opacity-40'>
												<Link href={`/admin/posts/${post.id}`}>
													<Button className='text-gray-800 bg-white hover:bg-gray-100'>
														View Details
													</Button>
												</Link>
											</div>
										</div>
										<div className='p-4'>
											<div className='flex items-center justify-between mb-2'>
												<h2 className='text-lg font-semibold text-gray-800 line-clamp-1'>
													{post.title}
												</h2>
												<span
													className={`px-2 py-1 text-xs font-medium rounded-full ${
														post.status === 'Publish'
															? 'bg-green-100 text-green-800'
															: post.status === 'Rejected'
															? 'bg-red-100 text-red-800'
															: 'bg-yellow-100 text-yellow-800'
													}`}
												>
													{post.status === 'Publish'
														? 'Published'
														: post.status === 'Rejected'
														? 'Rejected'
														: 'Pending'}
												</span>
											</div>

											<div className='flex items-center mb-1 text-sm text-gray-500'>
												<Calendar size={14} className='mr-2' />
												{formatDate(post.publishDate)}
											</div>

											{post.location && (
												<div className='flex items-center mb-2 text-sm text-gray-500'>
													<MapPin size={14} className='mr-2' />
													<span className='line-clamp-1'>{post.location}</span>
												</div>
											)}

											<p className='mb-4 text-sm text-gray-600 line-clamp-2'>
												{post?.description || 'No description available.'}
											</p>

											<div className='flex items-center gap-2 pt-2 border-t border-gray-100'>
												{post.status !== 'Publish' && post.status !== 'Rejected' ? (
													<>
														<Button
															variant='outline'
															onClick={() => handleApprove(post.id)}
															className='flex-1 text-green-600 border-green-500 hover:bg-green-50'
															disabled={
																approveMutation.isPending &&
																approveMutation.variables === post.id
															}
														>
															<CheckCircle size={16} className='mr-2' />
															{approveMutation.isPending &&
															approveMutation.variables === post.id
																? 'Approving...'
																: 'Approve'}
														</Button>
														<Button
															variant='outline'
															onClick={() => openRejectDialog(post.id)}
															className='flex-1 text-red-600 border-red-500 hover:bg-red-50'
															disabled={
																rejectMutation.isPending &&
																rejectMutation.variables?.postID === post.id
															}
														>
															<XCircle size={16} className='mr-2' />
															{rejectMutation.isPending &&
															rejectMutation.variables?.postID === post.id
																? 'Rejecting...'
																: 'Reject'}
														</Button>
													</>
												) : post.status === 'Publish' ? (
													<Button
														variant='outline'
														disabled
														className='w-full text-green-600 border-green-500 cursor-not-allowed bg-green-50 opacity-60'
													>
														<CheckCircle size={16} className='mr-2' />
														Published
													</Button>
												) : (
													<Button
														variant='outline'
														disabled
														className='w-full text-red-600 border-red-500 cursor-not-allowed bg-red-50 opacity-60'
													>
														<XCircle size={16} className='mr-2' />
														Rejected
													</Button>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</div>

			{/* Reject Post Dialog */}
			<Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='flex items-center text-red-600'>
							<XCircle className='mr-2' size={18} />
							Reject Post
						</DialogTitle>
					</DialogHeader>
					<div className='py-4'>
						<p className='mb-4'>
							Please provide a reason for rejecting this post. This will be visible to the post author.
						</p>
						<Textarea
							placeholder='Enter rejection reason...'
							value={rejectReason}
							onChange={(e) => setRejectReason(e.target.value)}
							className='min-h-[100px]'
						/>
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => setRejectDialogOpen(false)}
							disabled={rejectMutation.isPending}
						>
							Cancel
						</Button>
						<Button
							type='button'
							variant='destructive'
							onClick={handleRejectPost}
							disabled={rejectMutation.isPending}
						>
							{rejectMutation.isPending ? 'Rejecting...' : 'Reject Post'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	);
};

export default Post;
