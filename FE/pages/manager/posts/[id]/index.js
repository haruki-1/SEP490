import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getPostDetail } from 'pages/api/posts/getPostDetail';
import { getUserById } from 'pages/api/user/getUserById';
import ManagerLayout from 'pages/manager/layout';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const PostDetail = () => {
	const { id } = useParams() ?? {};

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

	return (
		<ManagerLayout>
			<div>
				{isLoading ? (
					<p className='text-center py-8 h-screen'>Loading...</p>
				) : error ? (
					<p className='text-center text-red-500 py-8'>Error fetching details</p>
				) : (
					<div className='p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg space-y-6'>
						<h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center'>{data?.title}</h2>
						<div className='flex items-center gap-1'>
							<img src={userPost?.avatar} alt='' className='size-10 rounded-full' />
							<div className='flex flex-col text-sm'>
								<p>{userPost?.fullName}</p>
								<span>{new Date(data?.publishDate).toLocaleDateString('vi-VN')}</span>
							</div>
						</div>

						<PhotoProvider>
							<div className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4'>
								{data?.images?.map((img, index) => (
									<PhotoView key={index} src={img}>
										<div className='border rounded-md'>
											<img
												src={img}
												alt={`Image ${index + 1}`}
												className='rounded-lg w-full h-full object-cover cursor-pointer hover:opacity-90 transition'
											/>
										</div>
									</PhotoView>
								))}
							</div>
						</PhotoProvider>

						<div className='flex flex-col gap-3'>
							<p className='text-gray-600 text-base sm:text-lg leading-relaxed'>{data?.description}</p>
							<span>{data?.location}</span>
						</div>
					</div>
				)}
			</div>
		</ManagerLayout>
	);
};

export default PostDetail;
