import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { uploadImages } from '@/pages/api/homestay/uploadImageHomeStay';
import { Label } from '@/components/components/ui/label';
import { ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/components/ui/textarea';
import { useParams } from 'next/navigation';
import { editPost } from '@/pages/api/posts/updatePost';
import { getPostDetail } from '@/pages/api/posts/getPostDetail';
import AdminLayout from '@/pages/admin/layout';

const MAX_IMAGES = 8;

const EditPostPage = () => {
	const { id } = useParams() ?? {};
	const queryClient = useQueryClient();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		location: '',
		images: [],
	});

	const postQuery = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPostDetail(id),
		enabled: !!id,
	});

	useEffect(() => {
		if (postQuery.data) {
			setFormData({
				title: postQuery.data.title ?? '',
				description: postQuery.data.description ?? '',
				location: postQuery.data.location ?? '',
				images: postQuery.data.images ?? [],
			});
		}
	}, [postQuery.data]);

	console.log('formData', formData);

	const updatePostMutation = useMutation({
		mutationFn: (updatedData) => editPost({ ...updatedData, id: id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
			toast.success('Post updated successfully!');
		},
		onError: () => toast.error('Failed to update post. Please try again.'),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImagesChange = async (e) => {
		const files = Array.from(e.target.files);
		const remainingSlots = MAX_IMAGES - formData.images.length;
		const filesToAdd = files.slice(0, remainingSlots);

		if (!filesToAdd.length) {
			toast.warning(`You can only add up to ${MAX_IMAGES} images.`);
			return;
		}

		try {
			const { urls } = await uploadImages(filesToAdd);
			if (!urls?.length) throw new Error('Invalid upload response.');

			setFormData((prev) => ({
				...prev,
				images: [...prev.images, ...urls],
			}));
			toast.success('Images uploaded successfully!');
		} catch (err) {
			console.error(err);
			toast.error('Failed to upload images.');
		}

		if (filesToAdd.length < files.length) {
			toast.warning(`Only ${remainingSlots} image(s) added. Max ${MAX_IMAGES} images allowed.`);
		}
	};

	const handleDeleteImage = (index) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title || !formData.description || !formData.location) {
			toast.warning('Please fill in all fields.');
			return;
		}
		updatePostMutation.mutate(formData);
	};

	return (
		<AdminLayout>
			<div>
				<h2 className='mb-4 text-2xl font-bold'>Edit Post</h2>
				{postQuery.isLoading ? (
					<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50'>
						<div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : postQuery.error ? (
					<p>Error: {error.message}</p>
				) : (
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<Label className='block mb-2 font-medium'>Images</Label>
							<Input
								type='file'
								accept='image/*'
								multiple
								onChange={handleImagesChange}
								className='hidden'
								id='imagesInput'
							/>
							<div className='grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8'>
								{formData.images.map((url, index) => (
									<div key={index} className='relative group'>
										<img
											src={url}
											alt={`Preview ${index}`}
											className='object-cover w-full rounded-lg aspect-square'
										/>
										<button
											type='button'
											onClick={() => handleDeleteImage(index)}
											className='absolute p-1 rounded-full opacity-0 top-1 right-1 bg-black/50 group-hover:opacity-100'
										>
											<X className='w-4 h-4 text-white' />
										</button>
									</div>
								))}
								{formData.images.length < MAX_IMAGES && (
									<div
										onClick={() => document.getElementById('imagesInput').click()}
										className='flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer aspect-square hover:bg-gray-50'
									>
										<ImagePlus className='w-8 h-8 text-gray-400' />
									</div>
								)}
							</div>
						</div>

						<div>
							<Label className='block mb-2 font-medium'>Title</Label>
							<Input
								name='title'
								placeholder='Title'
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<Label className='block mb-2 font-medium'>Description</Label>
							<Textarea
								name='description'
								placeholder='Description'
								value={formData.description}
								onChange={handleChange}
								required
								className='h-40'
							/>
						</div>

						<div>
							<Label className='block mb-2 font-medium'>Location</Label>
							<Input
								name='location'
								placeholder='Location'
								value={formData.location}
								onChange={handleChange}
								required
							/>
						</div>

						<Button type='submit' className='w-full' disabled={updatePostMutation.isLoading}>
							{updatePostMutation.isLoading ? 'Updating...' : 'Update Post'}
						</Button>
					</form>
				)}
			</div>
		</AdminLayout>
	);
};

export default EditPostPage;
