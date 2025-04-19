'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/components/ui/button';
import { Calendar, ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import Swal from 'sweetalert2';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/components/ui/dialog';
import { createCalendar } from 'pages/api/calendar/createCalendar';
import { getHomeStayDetail } from 'pages/api/homestay/getHomeStayDetail';
import { deleteCalendarEntry } from 'pages/api/calendar/deleteCalendar';
import { updateCalendarEntry } from 'pages/api/calendar/updateCalendar';
import ManagerLayout from 'pages/manager/layout';

const HomeStayCalendar = () => {
	const { id } = useParams() ?? {};
	const router = useRouter();
	const queryClient = useQueryClient();
	// This line can be removed since we're now using the formatDateForComparison function

	const [calendarDialog, setCalendarDialog] = useState({
		isOpen: false,
		startDate: new Date().toISOString().split('T')[0],
		endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
		price: 100,
	});

	const [editDialog, setEditDialog] = useState({
		isOpen: false,
		calendarId: '',
		date: '',
		price: 0,
		homeStayID: '',
	});

	// Fetch homestay details
	const {
		data: homestay,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['homeStayDetail', id],
		queryFn: () => getHomeStayDetail(id),
		enabled: !!id,
	});

	const calendarMutation = useMutation({
		mutationFn: createCalendar,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStayDetail', id]);
			setCalendarDialog({
				isOpen: false,
				startDate: new Date().toISOString().split('T')[0],
				endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
				price: 100,
			});
			Swal.fire({
				icon: 'success',
				title: 'Added!',
				text: 'Calendar entries have been added to the homestay.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to add calendar entries: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const deleteCalendarMutation = useMutation({
		mutationFn: deleteCalendarEntry,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStayDetail', id]);
			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'Calendar entry has been deleted.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to delete calendar entry: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const updateCalendarMutation = useMutation({
		mutationFn: ({ calendarId, data }) => updateCalendarEntry(calendarId, data),
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStayDetail', id]);
			setEditDialog({
				isOpen: false,
				calendarId: '',
				date: '',
				price: 0,
				homeStayID: '',
			});
			Swal.fire({
				icon: 'success',
				title: 'Updated!',
				text: 'Calendar entry has been updated.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to update calendar entry: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const openCalendarDialog = () => {
		setCalendarDialog({
			isOpen: true,
			startDate: new Date().toISOString().split('T')[0],
			endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
			price: 100,
		});
	};

	const openEditDialog = (entry) => {
		// Get the original date from the entry and format it properly to avoid timezone issues
		const originalDate = new Date(entry.date);

		// Format the date as YYYY-MM-DD manually to preserve the correct date
		const year = originalDate.getFullYear();
		const month = String(originalDate.getMonth() + 1).padStart(2, '0');
		const day = String(originalDate.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;

		setEditDialog({
			isOpen: true,
			calendarId: entry.id,
			date: formattedDate,
			price: entry.price,
			homeStayID: id,
		});
	};

	const handleCalendarSubmit = () => {
		const { startDate, endDate, price } = calendarDialog;

		if (!startDate || !endDate) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please select start and end dates.',
			});
			return;
		}

		if (new Date(startDate) > new Date(endDate)) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Start date cannot be after end date.',
			});
			return;
		}

		if (price <= 0) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Price must be greater than zero.',
			});
			return;
		}

		// Generate array of dates between start and end
		const calendarEntries = [];
		let currentDate = new Date(startDate);
		const endDateObj = new Date(endDate);

		while (currentDate <= endDateObj) {
			calendarEntries.push({
				date: new Date(currentDate).toISOString(),
				price: Number(price),
				homeStayID: id,
			});
			currentDate.setDate(currentDate.getDate() + 1);
		}

		calendarMutation.mutate(calendarEntries);
	};

	const handleEditSubmit = () => {
		const { calendarId, date, price, homeStayID } = editDialog;

		if (!date) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please select a date.',
			});
			return;
		}

		if (price <= 0) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Price must be greater than zero.',
			});
			return;
		}

		// Create a date object with time set to noon to avoid timezone issues
		const dateObject = new Date(date);
		dateObject.setHours(12, 0, 0, 0);

		updateCalendarMutation.mutate({
			calendarId,
			data: {
				date: dateObject.toISOString(),
				price: Number(price),
				homeStayID: homeStayID,
			},
		});
	};

	const handleDeleteCalendarEntry = (calendarId) => {
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
				deleteCalendarMutation.mutate(calendarId);
			}
		});
	};

	// Helper function to format dates consistently for comparison
	const formatDateForComparison = (dateInput) => {
		const date = new Date(dateInput);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
			2,
			'0'
		)}`;
	};

	const isDateInPast = (dateString) => {
		const date = new Date(dateString);
		date.setHours(0, 0, 0, 0);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	return (
		<ManagerLayout>
			<div className='sec-com'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							size='icon'
							onClick={() => router.push('/manager/homestay')}
							className='mr-2'
						>
							<ArrowLeft className='w-4 h-4' />
						</Button>
						<h1 className='text-2xl font-bold'>Calendar Management</h1>
					</div>
					{/* <Button onClick={openCalendarDialog} className='flex items-center gap-2'>
						<Plus className='w-4 h-4' /> Add Calendar Entries
					</Button> */}
				</div>

				{isLoading ? (
					<div className='flex items-center justify-center h-64'>
						<p>Loading...</p>
					</div>
				) : error ? (
					<div className='flex items-center justify-center h-64'>
						<p className='text-red-500'>Error: {error.message}</p>
					</div>
				) : (
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>{homestay?.name}</CardTitle>
								<CardDescription>
									{homestay?.address}, {homestay?.city}
								</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Calendar className='w-5 h-5' /> Calendar Entries
								</CardTitle>
								<CardDescription>Manage availability and pricing for this homestay</CardDescription>
							</CardHeader>
							<CardContent>
								{!homestay?.calendar || homestay.calendar.length === 0 ? (
									<div className='py-10 text-center text-gray-500'>
										No calendar entries yet. Add some dates to make this homestay available for
										booking.
									</div>
								) : (
									<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
										{homestay.calendar
											.sort((a, b) => new Date(a.date) - new Date(b.date))
											.map((entry) => {
												const entryDate = new Date(entry.date);
												const isToday =
													formatDateForComparison(entryDate) ===
													formatDateForComparison(new Date());
												const isPast = isDateInPast(entry.date);
												const isDeleted = entry.isDeleted;

												return (
													<div
														key={entry.id}
														className={`relative p-4 rounded-lg border ${
															isDeleted
																? 'bg-gray-300 border-gray-400 opacity-60 cursor-not-allowed'
																: isToday
																? 'bg-green-50 border-green-200'
																: isPast
																? 'bg-gray-50 border-gray-200 opacity-70'
																: 'bg-white border-gray-200'
														}`}
													>
														<div className='flex items-start justify-between'>
															<div>
																<p className='font-medium'>
																	{entryDate.toLocaleDateString('en-GB', {
																		day: '2-digit',
																		month: '2-digit',
																		year: 'numeric',
																	})}
																</p>
																<p className='text-lg font-semibold text-green-600'>
																	VND{entry.price}
																</p>
																{isToday && (
																	<span className='mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800'>
																		Today
																	</span>
																)}
																{isPast && !isToday && (
																	<span className='mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800'>
																		Past
																	</span>
																)}
																{isDeleted && (
																	<span className='mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800'>
																		Deleted
																	</span>
																)}
															</div>
															<div className='flex gap-1'>
																<Button
																	variant='ghost'
																	size='icon'
																	className='text-blue-500 hover:text-blue-700 hover:bg-blue-50'
																	onClick={() => openEditDialog(entry)}
																	disabled={isDeleted}
																>
																	<Edit2 className='w-4 h-4' />
																</Button>
																<Button
																	variant='ghost'
																	size='icon'
																	className='text-red-500 hover:text-red-700 hover:bg-red-50'
																	onClick={() => handleDeleteCalendarEntry(entry.id)}
																	disabled={isDeleted}
																>
																	<Trash2 className='w-4 h-4' />
																</Button>
															</div>
														</div>
													</div>
												);
											})}
									</div>
								)}
							</CardContent>
							<CardFooter className='flex justify-end'>
								<Button onClick={openCalendarDialog} className='flex items-center gap-2'>
									<Plus className='w-4 h-4' /> Add Calendar Entries
								</Button>
							</CardFooter>
						</Card>
					</div>
				)}
			</div>

			{/* Add Calendar Dialog */}
			<Dialog
				open={calendarDialog.isOpen}
				onOpenChange={(open) => setCalendarDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Add Calendar Entries</DialogTitle>
						<DialogDescription>
							Set a price for a range of dates to add to the homestay calendar.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='startDate' className='text-right'>
								Start Date
							</Label>
							<Input
								id='startDate'
								type='date'
								value={calendarDialog.startDate}
								onChange={(e) => setCalendarDialog((prev) => ({ ...prev, startDate: e.target.value }))}
								className='col-span-3'
							/>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='endDate' className='text-right'>
								End Date
							</Label>
							<Input
								id='endDate'
								type='date'
								value={calendarDialog.endDate}
								onChange={(e) => setCalendarDialog((prev) => ({ ...prev, endDate: e.target.value }))}
								className='col-span-3'
							/>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='price' className='text-right'>
								Price (VND)
							</Label>
							<Input
								id='price'
								type='number'
								min='1'
								step='0.01'
								value={calendarDialog.price}
								onChange={(e) => setCalendarDialog((prev) => ({ ...prev, price: e.target.value }))}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleCalendarSubmit} disabled={calendarMutation.isLoading}>
							{calendarMutation.isLoading ? 'Adding...' : 'Add Calendar Entries'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Calendar Dialog */}
			<Dialog
				open={editDialog.isOpen}
				onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Edit Calendar Entry</DialogTitle>
						<DialogDescription>Update the date or price for this calendar entry.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='editDate' className='text-right'>
								Date
							</Label>
							<Input
								id='editDate'
								type='date'
								value={editDialog.date}
								onChange={(e) => setEditDialog((prev) => ({ ...prev, date: e.target.value }))}
								className='col-span-3'
							/>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='editPrice' className='text-right'>
								Price (VND)
							</Label>
							<Input
								id='editPrice'
								type='number'
								min='1'
								step='0.01'
								value={editDialog.price}
								onChange={(e) => setEditDialog((prev) => ({ ...prev, price: e.target.value }))}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleEditSubmit} disabled={updateCalendarMutation.isLoading}>
							{updateCalendarMutation.isLoading ? 'Updating...' : 'Update Entry'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</ManagerLayout>
	);
};

export default HomeStayCalendar;