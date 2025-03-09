import React, { useState, useRef, useEffect } from 'react';
import ManagerLayout from '../layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllVouchers } from '@/pages/api/voucher/getVouchers';
import { createVoucher } from '@/pages/api/voucher/createVoucher';
import { updateVoucher } from '@/pages/api/voucher/updateVoucher';
import { receiveVoucher } from '@/pages/api/voucher/receiveVoucher';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Button } from '@/components/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { uploadImage } from '@/pages/api/image/uploadImage';
import { getUsers } from '@/pages/api/user/getUsers';

const VoucherList = () => {
	const [open, setOpen] = useState(false);
	const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [currentVoucherId, setCurrentVoucherId] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState('');
	const fileInputRef = useRef(null);
	const [targetUser, setTargetUser] = useState('');

	// Add pagination state for users
	const [userPage, setUserPage] = useState(1);
	const [userPageSize, setUserPageSize] = useState(10);
	const [totalUsers, setTotalUsers] = useState(0);

	const [voucherData, setVoucherData] = useState({
		image: '',
		code: '',
		discount: 0,
		description: '',
		startDate: new Date().toISOString().split('T')[0],
		endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
		isDeleted: false,
	});

	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ['vouchers'],
		queryFn: getAllVouchers,
	});

	// Updated users query with pagination parameters
	const { data: usersData, isLoading: usersLoading } = useQuery({
		queryKey: ['users', userPage, userPageSize],
		queryFn: () => getUsers(userPage, userPageSize),
		enabled: receiveDialogOpen,
		onSuccess: (data) => {
			// Assuming the API returns total count in a metadata field
			if (data.totalCount) {
				setTotalUsers(data.totalCount);
			}
		},
	});

	// Extract the actual users array from the response
	const users = usersData?.items || usersData || [];

	const uploadImageMutation = useMutation({
		mutationFn: uploadImage,
		onSuccess: (data) => {
			setVoucherData((prev) => ({
				...prev,
				image: data.imageUrl,
			}));
			setUploading(false);
		},
		onError: (error) => {
			console.error('Error uploading image:', error);
			setUploading(false);
			toast.error('Failed to upload image. Please try again.');
		},
	});

	const createVoucherMutation = useMutation({
		mutationFn: createVoucher,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vouchers'] });
			setOpen(false);
			resetForm();
			toast.success('Voucher created successfully');
		},
		onError: (error) => {
			console.error('Error creating voucher:', error);
			toast.error('Failed to create voucher. Please try again.');
		},
	});

	const updateVoucherMutation = useMutation({
		mutationFn: ({ id, data }) => updateVoucher(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vouchers'] });
			setOpen(false);
			resetForm();
			toast.success('Voucher updated successfully');
		},
		onError: (error) => {
			console.error('Error updating voucher:', error);
			toast.error('Failed to update voucher. Please try again.');
		},
	});

	const receiveVoucherMutation = useMutation({
		mutationFn: (data) => receiveVoucher(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['vouchers'] });
			setReceiveDialogOpen(false);
			setTargetUser('');
			setCurrentVoucherId(null);
			toast.success('Voucher assigned successfully');
		},
		onError: (error) => {
			console.error('Error assigning voucher:', error);
			toast.error('Failed to assign voucher. Please try again.');
		},
	});

	// Reset form and pagination when dialog closes
	const resetForm = () => {
		setVoucherData({
			image: '',
			code: '',
			discount: 0,
			description: '',
			startDate: new Date().toISOString().split('T')[0],
			endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
			isDeleted: false,
		});
		setPreview('');
		setEditMode(false);
		setCurrentVoucherId(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Reset user pagination when receive dialog opens
	useEffect(() => {
		if (receiveDialogOpen) {
			setUserPage(1);
		}
	}, [receiveDialogOpen]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVoucherData({
			...voucherData,
			[name]: name === 'discount' ? parseFloat(value) : value,
		});
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				const uploadedImageUrl = await uploadImage(file);
				setVoucherData((prev) => ({ ...prev, image: uploadedImageUrl.url }));

				// Create a preview
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(file);

				toast.success('Image uploaded successfully!');
			} catch (error) {
				console.error('Image upload failed:', error);
				toast.error('Failed to upload image.');
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!voucherData.image) {
			toast.warning('Please upload an image for the voucher.');
			return;
		}

		if (editMode && currentVoucherId) {
			// Update existing voucher
			const dataToUpdate = {
				image: voucherData.image,
				discount: voucherData.discount,
				description: voucherData.description,
				startDate: voucherData.startDate,
				endDate: voucherData.endDate,
				isDeleted: voucherData.isDeleted,
			};
			updateVoucherMutation.mutate({ id: currentVoucherId, data: dataToUpdate });
		} else {
			// Create new voucher
			createVoucherMutation.mutate(voucherData);
		}
	};

	const handleEdit = (voucher) => {
		// Format dates to yyyy-MM-dd for input[type="date"]
		const formatDate = (dateString) => {
			const date = new Date(dateString);
			return date.toISOString().split('T')[0];
		};

		setVoucherData({
			image: voucher.image,
			code: voucher.code,
			discount: voucher.discount,
			description: voucher.description,
			startDate: formatDate(voucher.startDate),
			endDate: formatDate(voucher.endDate),
			isDeleted: voucher.isDeleted || false,
		});
		setPreview(voucher.image);
		setEditMode(true);
		setCurrentVoucherId(voucher.voucherID);
		setOpen(true);
	};

	const openCreateDialog = () => {
		resetForm();
		setOpen(true);
	};

	const handleReceive = (voucherId) => {
		setCurrentVoucherId(voucherId);
		setTargetUser('');
		setUserPage(1); // Reset to first page when opening dialog
		setReceiveDialogOpen(true);
	};

	const handleReceiveSubmit = (e) => {
		e.preventDefault();

		if (!targetUser) {
			toast.warning('Please select a user');
			return;
		}

		receiveVoucherMutation.mutate({
			userID: targetUser,
			voucherID: currentVoucherId,
		});
	};

	const handleUserSelect = (userId) => {
		setTargetUser(userId);
	};

	// Handle page change for user pagination
	const handlePageChange = (page) => {
		setUserPage(page);
	};

	// Handle page size change
	const handlePageSizeChange = (size) => {
		setUserPageSize(size);
		setUserPage(1); // Reset to first page when changing page size
	};

	return (
		<ManagerLayout>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>Voucher List</h1>
				<Button onClick={openCreateDialog}>Add New Voucher</Button>
			</div>

			{/* Form Dialog - No changes here */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					{/* Dialog content unchanged */}
					<DialogHeader>
						<DialogTitle>{editMode ? 'Edit Voucher' : 'Create New Voucher'}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit} className='space-y-4'>
						{/* Form fields - no changes needed */}
						<div className='grid gap-2'>
							<Label htmlFor='image'>Voucher Image</Label>
							<div className='flex flex-col items-center gap-2'>
								{preview && (
									<div className='relative w-40 h-40 mb-2'>
										<img
											src={preview}
											alt='Preview'
											className='w-40 h-40 object-cover rounded border'
										/>
									</div>
								)}
								<Input
									ref={fileInputRef}
									id='image-upload'
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									disabled={uploading}
									className='max-w-sm'
								/>
								{uploading && <p className='text-sm text-gray-500'>Uploading...</p>}
							</div>
						</div>
						{/* Other form fields remain the same */}
						<div className='grid gap-2'>
							<Label htmlFor='code'>Voucher Code</Label>
							<Input
								id='code'
								name='code'
								value={voucherData.code}
								onChange={handleChange}
								required
								disabled={editMode}
							/>
						</div>
						{/* ...other fields... */}
						<div className='flex justify-end gap-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => {
									setOpen(false);
									resetForm();
								}}
							>
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={
									createVoucherMutation.isPending || updateVoucherMutation.isPending || uploading
								}
							>
								{editMode
									? updateVoucherMutation.isPending
										? 'Updating...'
										: 'Update Voucher'
									: createVoucherMutation.isPending
									? 'Creating...'
									: 'Create Voucher'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Updated Dialog for Voucher Receiving with User Select and Pagination */}
			<Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
				<DialogContent className='sm:max-w-[450px]'>
					<DialogHeader>
						<DialogTitle>Assign Voucher to User</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleReceiveSubmit} className='space-y-4'>
						<div className='grid gap-2'>
							<Label htmlFor='userId'>Select User</Label>
							{usersLoading ? (
								<div className='text-sm text-gray-500'>Loading users...</div>
							) : (
								<>
									<Select onValueChange={handleUserSelect} value={targetUser}>
										<SelectTrigger>
											<SelectValue placeholder='Select a user' />
										</SelectTrigger>
										<SelectContent>
											{users?.data?.map((user) => (
												<SelectItem key={user.id} value={user.id}>
													{user.userName} ({user.email})
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									{/* Page size selector */}
									<div className='flex items-center gap-2 mt-2'>
										<Label htmlFor='pageSize' className='text-sm'>
											Show:
										</Label>
										<Select
											value={userPageSize.toString()}
											onValueChange={(val) => handlePageSizeChange(Number(val))}
										>
											<SelectTrigger id='pageSize' className='w-20'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='5'>5</SelectItem>
												<SelectItem value='10'>10</SelectItem>
												<SelectItem value='20'>20</SelectItem>
												<SelectItem value='50'>50</SelectItem>
											</SelectContent>
										</Select>
										<span className='text-sm text-gray-500'>per page</span>
									</div>

									{/* Simple pagination controls */}
									{/* <div className='flex justify-between items-center mt-2'>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handlePageChange(userPage - 1)}
											disabled={userPage <= 1}
										>
											Previous
										</Button>
										<span className='text-sm'>
											Page {userPage} of {Math.ceil(totalUsers / userPageSize) || 1}
										</span>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handlePageChange(userPage + 1)}
											disabled={userPage >= Math.ceil(totalUsers / userPageSize)}
										>
											Next
										</Button>
									</div> */}
								</>
							)}
						</div>
						<div className='flex justify-end gap-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => {
									setReceiveDialogOpen(false);
									setTargetUser('');
									setCurrentVoucherId(null);
								}}
							>
								Cancel
							</Button>
							<Button type='submit' disabled={receiveVoucherMutation.isPending || !targetUser}>
								{receiveVoucherMutation.isPending ? 'Assigning...' : 'Assign Voucher'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Voucher list table - no changes */}
			{isLoading ||
			createVoucherMutation.isPending ||
			updateVoucherMutation.isPending ||
			receiveVoucherMutation.isPending ? (
				<div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'>
					<div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
				</div>
			) : error ? (
				<p>Error: {error.message}</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Image</TableHead>
							<TableHead>Code</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Discount (%)</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>End Date</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((voucher) => (
							<TableRow key={voucher.voucherID}>
								<TableCell>
									<img src={voucher.image} alt='Voucher' className='w-16 h-16 object-cover rounded' />
								</TableCell>
								<TableCell className='font-medium'>{voucher.code}</TableCell>
								<TableCell>{voucher.description}</TableCell>
								<TableCell>{voucher.discount}%</TableCell>
								<TableCell>{new Date(voucher.startDate).toLocaleDateString('vi')}</TableCell>
								<TableCell>{new Date(voucher.endDate).toLocaleDateString('vi')}</TableCell>
								<TableCell>
									<div className='flex gap-2 flex-wrap'>
										<Button onClick={() => handleEdit(voucher)}>Edit</Button>
										<Button variant='outline' onClick={() => handleReceive(voucher.voucherID)}>
											Assign
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</ManagerLayout>
	);
};

export default VoucherList;
