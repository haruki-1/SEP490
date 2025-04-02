import React, { useState } from 'react';
import { getAllAmenity } from '@/pages/api/amenity/getAmenity';
import { addSystemAmenity } from '@/pages/api/amenity/addSystemAmenity';
import { editAmenity } from '@/pages/api/amenity/editAmenity';
import { deleteAmenity } from '@/pages/api/amenity/deleteAmenity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/components/ui/alert-dialog';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import { Card, CardContent } from '@/components/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/components/ui/select';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ManagerLayout from '../layout';

const Amenity = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [amenityName, setAmenityName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentAmenity, setCurrentAmenity] = useState(null);
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
	});

	const openCreateDialog = () => {
		setAmenityName('');
		setDialogOpen(true);
	};

	const openEditDialog = (amenity) => {
		setCurrentAmenity(amenity);
		setAmenityName(amenity.name);
		setEditDialogOpen(true);
	};

	const openDeleteDialog = (amenity) => {
		setCurrentAmenity(amenity);
		setDeleteDialogOpen(true);
	};

	const handleInputChange = (e) => {
		setAmenityName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!amenityName.trim()) {
			toast({
				title: 'Error',
				description: 'Amenity name cannot be empty',
				variant: 'destructive',
			});
			return;
		}

		try {
			setIsSubmitting(true);
			await addSystemAmenity([amenityName]);

			// Close dialog and reset form
			setDialogOpen(false);
			setAmenityName('');

			// Refetch the amenity list
			queryClient.invalidateQueries(['amenity']);

			toast.success('Amenity added successfully');
		} catch (error) {
			toast.error('Failed to add amenity');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();

		if (!amenityName.trim()) {
			toast({
				title: 'Error',
				description: 'Amenity name cannot be empty',
				variant: 'destructive',
			});
			return;
		}

		try {
			setIsSubmitting(true);
			await editAmenity(currentAmenity.id, amenityName);

			// Close dialog and reset form
			setEditDialogOpen(false);
			setAmenityName('');
			setCurrentAmenity(null);

			// Refetch the amenity list
			queryClient.invalidateQueries(['amenity']);

			toast.success('Amenity updated successfully');
		} catch (error) {
			toast.error('Failed to update amenity');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!currentAmenity) return;

		try {
			setIsSubmitting(true);
			await deleteAmenity(currentAmenity.id);

			// Close dialog and reset
			setDeleteDialogOpen(false);
			setCurrentAmenity(null);

			// Refetch the amenity list
			queryClient.invalidateQueries(['amenity']);

			toast.success('Amenity deleted successfully');
		} catch (error) {
			toast.error('Failed to delete amenity');
		} finally {
			setIsSubmitting(false);
		}
	};

	const dataAmenity = data || [];
	const totalPages = Math.ceil(dataAmenity?.length / itemsPerPage);

	const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const handleItemsPerPageChange = (value) => {
		setItemsPerPage(Number(value));
		setCurrentPage(1);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentData = dataAmenity.slice(startIndex, startIndex + itemsPerPage);

	return (
		<ManagerLayout>
			<div className='flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-bold'>Amenity List</h2>
					<Button onClick={openCreateDialog}>Create Amenity</Button>

					{/* Create Amenity Dialog */}
					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Add New Amenity</DialogTitle>
								<DialogDescription>
									Enter the name of the amenity you want to add to the system.
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit}>
								<div className='grid gap-4 py-4'>
									<div className='grid items-center grid-cols-4 gap-4'>
										<Label htmlFor='name' className='text-right'>
											Name
										</Label>
										<Input
											id='name'
											name='name'
											className='col-span-3'
											value={amenityName}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type='submit' disabled={isSubmitting}>
										{isSubmitting ? 'Saving...' : 'Save changes'}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>

					{/* Edit Amenity Dialog */}
					<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Edit Amenity</DialogTitle>
								<DialogDescription>Update the name of the selected amenity.</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleEditSubmit}>
								<div className='grid gap-4 py-4'>
									<div className='grid items-center grid-cols-4 gap-4'>
										<Label htmlFor='edit-name' className='text-right'>
											Name
										</Label>
										<Input
											id='edit-name'
											name='edit-name'
											className='col-span-3'
											value={amenityName}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type='submit' disabled={isSubmitting}>
										{isSubmitting ? 'Updating...' : 'Update amenity'}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>

					{/* Delete Confirmation Dialog */}
					<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action will delete the amenity "{currentAmenity?.name}". This action cannot be
									undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDelete}
									disabled={isSubmitting}
									className='bg-red-600 hover:bg-red-700'
								>
									{isSubmitting ? 'Deleting...' : 'Delete'}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
				{isLoading ? (
					<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50'>
						<div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : error ? (
					<p>Error: {error.message}</p>
				) : (
					<Card className='shadow-md rounded-2xl'>
						<CardContent className='p-4'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-1/6'>Name</TableHead>
										<TableHead className='w-2/6'>Home Stay Amenities</TableHead>
										<TableHead className='w-1/6'>isDeleted</TableHead>
										<TableHead className='w-1/6'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{currentData.length > 0 ? (
										currentData.map((facility) => (
											<TableRow key={facility.id}>
												<TableCell>{facility.name}</TableCell>
												<TableCell>
													{facility.homeStayAmenities === null && (
														<span>Not homestay amenity</span>
													)}
												</TableCell>
												<TableCell>
													{facility.isDeleted === false && <span>false</span>}
												</TableCell>
												<TableCell className='flex items-center gap-1'>
													<Button
														size='sm'
														variant='outline'
														onClick={() => openEditDialog(facility)}
													>
														<Pencil className='w-4 h-4' />
													</Button>
													<Button
														size='sm'
														variant='destructive'
														onClick={() => openDeleteDialog(facility)}
													>
														<Trash2 className='w-4 h-4' />
													</Button>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5} className='text-center'>
												No facilities found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
				<div className='flex items-center justify-between'>
					<div>
						<Select onValueChange={handleItemsPerPageChange} defaultValue={itemsPerPage.toString()}>
							<SelectTrigger className='w-20'>{itemsPerPage}</SelectTrigger>
							<SelectContent>
								{[5, 10, 15, 20].map((num) => (
									<SelectItem key={num} value={num.toString()}>
										{num}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='space-x-2'>
						<Button onClick={handlePrevPage} disabled={currentPage === 1}>
							Previous
						</Button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
							Next
						</Button>
					</div>
				</div>
			</div>
		</ManagerLayout>
	);
};

export default Amenity;