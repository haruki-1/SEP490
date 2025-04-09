import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser, FaEnvelope, FaIdCard, FaUserTag, FaBan, FaUnlock } from 'react-icons/fa';
import { getUsers } from 'pages/api/user/getUsers';
import { blockUser } from 'pages/api/user/blockUser';
import { unblockUser } from 'pages/api/user/unblockUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { toast } from 'sonner';
import AdminLayout from '../layout';

const Users = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(10);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [actionType, setActionType] = useState('block'); // 'block' or 'unblock'

	const queryClient = useQueryClient();

	// Fetch users with React Query
	const {
		data: usersData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['users', currentPage, pageSize],
		queryFn: () => getUsers(currentPage, pageSize),
		keepPreviousData: true,
	});

	// Block user mutation
	const blockMutation = useMutation({
		mutationFn: (userId) => blockUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			toast.success('User blocked successfully');
			setConfirmDialogOpen(false);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to block user');
		},
	});

	// Unblock user mutation (separate API call)
	const unblockMutation = useMutation({
		mutationFn: (userId) => unblockUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			toast.success('User unblocked successfully');
			setConfirmDialogOpen(false);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to unblock user');
		},
	});

	// Role badge color mapping
	const getRoleBadgeColor = (role) => {
		switch (role) {
			case 'Admin':
				return 'bg-red-100 text-red-800';
			case 'Manager':
				return 'bg-blue-100 text-blue-800';
			case 'User':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const openConfirmDialog = (user, type) => {
		setSelectedUser(user);
		setActionType(type);
		setConfirmDialogOpen(true);
	};

	const handleUserAction = () => {
		if (!selectedUser) return;

		if (actionType === 'block') {
			blockMutation.mutate(selectedUser.id);
		} else {
			unblockMutation.mutate(selectedUser.id);
		}
	};

	const renderPagination = () => {
		if (!usersData) return null;

		const { totalPage } = usersData;
		const pages = [];

		// Previous button
		pages.push(
			<button
				key='prev'
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-3 py-1 mx-1 text-sm font-medium border rounded-md disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50'
			>
				Previous
			</button>
		);

		// Page numbers
		for (let i = 1; i <= totalPage; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`px-3 py-1 rounded-md mx-1 text-sm font-medium ${
						currentPage === i ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'
					}`}
				>
					{i}
				</button>
			);
		}

		// Next button
		pages.push(
			<button
				key='next'
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPage}
				className='px-3 py-1 mx-1 text-sm font-medium border rounded-md disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50'
			>
				Next
			</button>
		);

		return (
			<div className='flex justify-center mt-6'>
				<div className='flex'>{pages}</div>
			</div>
		);
	};

	// User status badge
	const UserStatusBadge = ({ isDeleted }) => {
		return isDeleted ? (
			<span className='ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full'>Blocked</span>
		) : null;
	};

	// Get the correct loading state based on action type
	const isActionLoading = () => {
		return actionType === 'block' ? blockMutation.isPending : unblockMutation.isPending;
	};

	return (
		<AdminLayout>
			<div>
				<div className='flex items-center justify-between mb-6'>
					<h1 className='text-2xl font-bold text-gray-800'>Users Management</h1>
					<button
						onClick={() => refetch()}
						className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
					>
						Refresh
					</button>
				</div>

				{isLoading ? (
					<div className='flex items-center justify-center h-64'>
						<div className='w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin'></div>
					</div>
				) : isError ? (
					<div className='p-4 mb-4 border-l-4 border-red-500 rounded bg-red-50'>
						<div className='flex'>
							<div className='ml-3'>
								<p className='text-sm text-red-700'>
									Error loading users: {error?.message || 'Unknown error'}
								</p>
							</div>
						</div>
					</div>
				) : (
					<>
						{/* Card summary */}
						<div className='grid grid-cols-1 gap-4 mb-6 md:grid-cols-4'>
							<div className='p-4 bg-white border rounded-lg shadow-sm'>
								<div className='flex items-center'>
									<div className='p-3 text-blue-500 rounded-full bg-blue-50'>
										<FaUser className='w-5 h-5' />
									</div>
									<div className='ml-4'>
										<p className='text-sm font-medium text-gray-500'>Total Users</p>
										<p className='text-xl font-bold'>{(usersData?.totalPage || 0) * pageSize}</p>
									</div>
								</div>
							</div>

							{/* Display counts for each role type */}
							{['Admin', 'Manager', 'User'].map((role, index) => {
								const roleCount = usersData?.data.filter((user) => user.role === role).length || 0;
								const icons = [FaIdCard, FaUserTag, FaEnvelope];
								const Icon = icons[index];

								return (
									<div key={role} className='p-4 bg-white border rounded-lg shadow-sm'>
										<div className='flex items-center'>
											<div
												className={`p-3 rounded-full ${
													role === 'Admin'
														? 'bg-red-50 text-red-500'
														: role === 'Manager'
														? 'bg-blue-50 text-blue-500'
														: 'bg-green-50 text-green-500'
												}`}
											>
												<Icon className='w-5 h-5' />
											</div>
											<div className='ml-4'>
												<p className='text-sm font-medium text-gray-500'>{role}s</p>
												<p className='text-xl font-bold'>{roleCount}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* Desktop table view */}
						<div className='hidden overflow-hidden border border-gray-200 rounded-lg shadow-sm md:block'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead className='bg-gray-50'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
										>
											Name
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
										>
											Email
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
										>
											Role
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{usersData?.data.map((user) => (
										<tr key={user.id} className='hover:bg-gray-50'>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm font-medium text-gray-900'>
													{user.fullName}
													<UserStatusBadge isDeleted={user.isDelete} />
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-500'>{user.email}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(
														user.role
													)}`}
												>
													{user.role}
												</span>
											</td>
											<td className='px-6 py-4 text-sm whitespace-nowrap'>
												{user.role !== 'Admin' ? (
													user.isDelete ? (
														<button
															onClick={() => openConfirmDialog(user, 'unblock')}
															className='flex items-center text-green-600 hover:text-green-900'
															disabled={
																blockMutation.isPending || unblockMutation.isPending
															}
														>
															<FaUnlock className='mr-1' />
															<span>Unblock</span>
														</button>
													) : (
														<button
															onClick={() => openConfirmDialog(user, 'block')}
															className='flex items-center text-red-600 hover:text-red-900'
															disabled={
																blockMutation.isPending || unblockMutation.isPending
															}
														>
															<FaBan className='mr-1' />
															<span>Block</span>
														</button>
													)
												) : (
													<span className='text-gray-400'>Cannot modify admin</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Mobile card view */}
						<div className='space-y-4 md:hidden'>
							{usersData?.data.map((user) => (
								<div key={user.id} className='p-4 bg-white border rounded-lg shadow-sm'>
									<div className='flex items-center justify-between mb-2'>
										<div className='flex items-center'>
											<span
												className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(
													user.role
												)}`}
											>
												{user.role}
											</span>
											<UserStatusBadge isDeleted={user.isDelete} />
										</div>
										{user.role !== 'Admin' &&
											(user.isDelete ? (
												<button
													onClick={() => openConfirmDialog(user, 'unblock')}
													className='flex items-center text-sm text-green-600 hover:text-green-900'
													disabled={blockMutation.isPending || unblockMutation.isPending}
												>
													<FaUnlock className='mr-1' />
													<span>Unblock</span>
												</button>
											) : (
												<button
													onClick={() => openConfirmDialog(user, 'block')}
													className='flex items-center text-sm text-red-600 hover:text-red-900'
													disabled={blockMutation.isPending || unblockMutation.isPending}
												>
													<FaBan className='mr-1' />
													<span>Block</span>
												</button>
											))}
									</div>
									<h3 className='text-lg font-medium'>{user.fullName}</h3>
									<p className='mb-2 text-sm text-gray-500'>{user.email}</p>
									<p className='text-xs text-gray-400 truncate'>ID: {user.id}</p>
								</div>
							))}
						</div>

						{/* Pagination */}
						{renderPagination()}
					</>
				)}
			</div>

			{/* Block/Unblock User Confirmation Dialog */}
			<Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle
							className={`flex items-center ${
								actionType === 'block' ? 'text-red-600' : 'text-green-600'
							}`}
						>
							{actionType === 'block' ? (
								<>
									<FaBan className='mr-2' /> Block User
								</>
							) : (
								<>
									<FaUnlock className='mr-2' /> Unblock User
								</>
							)}
						</DialogTitle>
					</DialogHeader>
					<div className='py-4'>
						<p>Are you sure you want to {actionType} this user?</p>
						{selectedUser && (
							<div className='p-4 mt-4 rounded-md bg-gray-50'>
								<p>
									<span className='font-medium'>Name:</span> {selectedUser.fullName}
								</p>
								<p>
									<span className='font-medium'>Email:</span> {selectedUser.email}
								</p>
								<p>
									<span className='font-medium'>Role:</span> {selectedUser.role}
								</p>
							</div>
						)}
						<p className='mt-4 text-sm text-gray-500'>
							{actionType === 'block'
								? 'This action will prevent the user from accessing the system.'
								: "This action will restore the user's access to the system."}
						</p>
					</div>
					<DialogFooter>
						<Button type='button' variant='outline' onClick={() => setConfirmDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							type='button'
							variant={actionType === 'block' ? 'destructive' : 'default'}
							onClick={handleUserAction}
							disabled={isActionLoading()}
							className={
								actionType === 'block'
									? 'bg-red-600 hover:bg-red-700'
									: 'bg-green-600 hover:bg-green-700 text-white'
							}
						>
							{isActionLoading()
								? `${actionType === 'block' ? 'Blocking' : 'Unblocking'}...`
								: `${actionType === 'block' ? 'Block' : 'Unblock'} User`}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	);
};

export default Users;
