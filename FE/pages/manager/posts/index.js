import React from 'react';
import ManagerLayout from '../layout';
import { Button } from '@/components/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Pencil, Trash2 } from 'lucide-react';
import { getAllPost } from '@/pages/api/posts/getPosts';
import { deletePost } from '@/pages/api/posts/deletePost';

const Post = () => {
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ['posts'],
		queryFn: getAllPost,
	});

	const deleteMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries(['posts']);
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
				text: 'Failed to delete post Please try again.',
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

	return (
		<ManagerLayout>
			<div>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Post List</h2>
					<Link href='/manager/posts/create'>
						<Button>Create Post</Button>
					</Link>
				</div>
				{isLoading ? (
					<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50'>
						<div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : error ? (
					<p>Error: {error.message}</p>
				) : (
					<div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5'>
						{data?.map((post) => (
							<div
								key={post.id}
								className='group [perspective:1000px] w-full h-[350px] overflow-y-hidden overflow-x-hidden'
							>
								<div className='relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
									<div className='absolute w-full h-full backface-hidden [backface-visibility:hidden]'>
										<img
											src={post?.images?.[0]}
											className='object-cover w-full h-full rounded-lg shadow-lg cursor-pointer'
										/>
										<div className='text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-1/2 w-full -translate-x-1/2 flex justify-center items-center flex-col bg-white/40'>
											<h2 className='text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white '>
												{post.title}
											</h2>
										</div>
									</div>

									<div className='absolute w-full h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-4 flex flex-col justify-between'>
										<div>
											<h2 className='text-[1.2rem] font-semibold text-gray-800'>{post.title}</h2>
											<span className='text-sm font-semibold text-gray-800'>
												{new Date(post.publishDate).toLocaleDateString()}
											</span>
											<p className='text-gray-600 line-clamp-1'>{post.location}</p>
											<p className='text-gray-600 line-clamp-2'>
												<strong>Description:</strong> {post?.description}
											</p>
										</div>
										<div className='flex flex-col gap-1'>
											<Link href={`/manager/posts/${post.id}`}>
												<Button className='w-full'>View Detail</Button>
											</Link>
											<div className='flex items-center gap-2'>
												<Link href={`/manager/posts/edit/${post.id}`} className='w-1/2'>
													<Button className='w-full bg-green-500 hover:bg-green-700'>
														<Pencil />
													</Button>
												</Link>

												<Button
													variant='destructive'
													onClick={() => handleDelete(post.id)}
													className='w-1/2'
												>
													<Trash2 />
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</ManagerLayout>
	);
};

export default Post;
