import React from 'react';
import { Button } from '@/components/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { deletePost } from '@/pages/api/posts/deletePost';
import Swal from 'sweetalert2';
import { Pencil, Trash2, PlusCircle, Calendar, MapPin, FileText } from 'lucide-react';
import { getPostsByUser } from '@/pages/api/posts/getPostsByUser';
import ManagerLayout from '../layout';

const Post = () => {
	const queryClient = useQueryClient();

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['userPosts'],
		queryFn: getPostsByUser,
	});

	const deleteMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries(['userPosts']);
			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'The post has been deleted.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: () => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Failed to delete post. Please try again.',
			});
		},
	});

	const handleDelete = (postID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "This action can't be undone!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMutation.mutate(postID);
			}
		});
	};

	// Format date
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<ManagerLayout>
			<div className='p-6'>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold text-gray-800'>My Posts</h1>
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
						<Link href='/manager/posts/create'>
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
									Error loading your posts: {error?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : (
					<>
						{!data || data.length === 0 ? (
							<div className='p-8 text-center bg-white rounded-lg shadow'>
								<div className='inline-block p-4 mb-4 bg-gray-100 rounded-full'>
									<FileText size={32} className='text-gray-400' />
								</div>
								<h3 className='mb-2 text-lg font-medium text-gray-800'>No Posts Found</h3>
								<p className='mb-4 text-gray-500'>You haven't created any posts yet.</p>
								<Link href='/admin/posts/create'>
									<Button>
										<PlusCircle size={16} className='mr-2' />
										Create First Post
									</Button>
								</Link>
							</div>
						) : (
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
												<Link href={`/manager/posts/${post.id}`}>
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

											{/* Hiển thị reason reject khi bài viết bị từ chối */}
											{post.status === 'Rejected' && post.reasonReject && (
												<div className='p-2 mb-4 rounded-md bg-red-50'>
													<div className='flex items-start'>
														<AlertTriangle size={16} className='mt-0.5 mr-2 text-red-500' />
														<div>
															<h4 className='text-xs font-semibold text-red-800'>
																Rejection Reason:
															</h4>
															<p className='text-xs text-red-700 line-clamp-3'>
																{post.reasonReject}
															</p>
														</div>
													</div>
												</div>
											)}

											<div className='flex items-center gap-2 pt-2 border-t border-gray-100'>
												<Link href={`/manager/posts/edit/${post.id}`} className='flex-1'>
													<Button
														variant='outline'
														className='w-full text-green-600 border-green-500 hover:bg-green-50'
													>
														<Pencil size={16} className='mr-2' />
														Edit
													</Button>
												</Link>
												<Button
													variant='destructive'
													onClick={() => handleDelete(post.id)}
													className='flex-1'
												>
													<Trash2 size={16} className='mr-2' />
													Delete
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</ManagerLayout>
	);
};

export default Post;