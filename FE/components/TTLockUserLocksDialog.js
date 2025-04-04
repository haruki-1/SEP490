import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { Battery, Lock, Unlock, Keyboard } from 'lucide-react';
import { Badge } from '@/components/components/ui/badge';
import { toast } from 'sonner';
import { unlockRemoteTTLock } from 'pages/api/ttlock/unlockRemoteTTLock';
import { createTTLockKeyboardPassword } from 'pages/api/ttlock/createTTLockKeyboardPassword';
import CreateKeyboardPasswordDetailsDialog from './CreateKeyboardPasswordDetailsDialog';

const TTLockUserLocksDialog = ({ isOpen, onOpenChange, locks, homeStayID }) => {
	const [confirmingUnlock, setConfirmingUnlock] = useState(null);
	const [confirmingKeyboardPassword, setConfirmingKeyboardPassword] = useState(null);
	const [isCreateKeyboardPasswordDialogOpen, setIsCreateKeyboardPasswordDialogOpen] = useState(false);
	const [keyboardPasswordDetails, setKeyboardPasswordDetails] = useState(null);

	const unlockMutation = useMutation({
		mutationFn: ({ homeStayID, lockID }) => unlockRemoteTTLock(homeStayID, lockID),
		onSuccess: () => {
			toast.success('Lock successfully unlocked');
			setConfirmingUnlock(null);
		},
		onError: (error) => {
			toast.error(error.message || 'Unable to unlock the lock');
			setConfirmingUnlock(null);
		},
	});

	const keyboardPasswordMutation = useMutation({
		mutationFn: ({ homeStayID, lockID }) => createTTLockKeyboardPassword(homeStayID, lockID),
		onSuccess: (data) => {
			toast.success('Keyboard password created successfully');
			setConfirmingKeyboardPassword(null);

			console.log('data', data.response.list?.[0]);

			if (data.response) {
				const firstPassword = data.response.list[0];
				const newKeyboardPasswordDetails = {
					homeStayID: homeStayID,
					lockID: firstPassword.lockId,
					keyboardPwdId: firstPassword.keyboardPwdId,
					initialKeyboardPwd: firstPassword.keyboardPwd,
				};

				setIsCreateKeyboardPasswordDialogOpen(true);

				console.log('Setting Keyboard Password Details:', newKeyboardPasswordDetails);
				setKeyboardPasswordDetails(newKeyboardPasswordDetails);
			} else {
				toast.error('Unexpected response format');
			}
		},
		onError: (error) => {
			toast.error(error.message || 'Unable to create keyboard password');
			setConfirmingKeyboardPassword(null);
		},
	});

	const handleUnlock = (lockId) => {
		setConfirmingUnlock(lockId);
	};

	const handleCreateKeyboardPassword = (lockId) => {
		setConfirmingKeyboardPassword(lockId);
	};

	const confirmUnlock = () => {
		if (confirmingUnlock) {
			unlockMutation.mutate({ homeStayID, lockID: confirmingUnlock });
		}
	};

	const confirmCreateKeyboardPassword = () => {
		if (confirmingKeyboardPassword) {
			keyboardPasswordMutation.mutate({
				homeStayID,
				lockID: confirmingKeyboardPassword,
			});
		}
	};

	const cancelUnlock = () => {
		setConfirmingUnlock(null);
	};

	const cancelCreateKeyboardPassword = () => {
		setConfirmingKeyboardPassword(null);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>TTLock User Locks</DialogTitle>
					<DialogDescription>List of locks associated with your TTLock account</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					{locks.map((lock) => (
						<div key={lock.lockId} className='flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-4'>
									<Lock className='w-6 h-6 text-primary' />
									<div>
										<h3 className='text-md font-semibold'>{lock.lockAlias}</h3>
										<p className='text-sm text-gray-500'>Lock ID: {lock.lockId}</p>
									</div>
								</div>

								<div className='flex items-center space-x-2'>
									<Battery className='w-5 h-5 text-green-600' />
									<Badge
										variant={
											lock.electricQuantity > 80
												? 'default'
												: lock.electricQuantity > 50
												? 'secondary'
												: 'destructive'
										}
									>
										{lock.electricQuantity}%
									</Badge>
								</div>
							</div>

							<div className='flex space-x-2'>
								{confirmingUnlock === lock.lockId ? (
									<div className='flex space-x-2 w-full'>
										<Button
											variant='outline'
											size='sm'
											onClick={confirmUnlock}
											disabled={unlockMutation.isLoading}
											className='flex-1'
										>
											Confirm Unlock
										</Button>
										<Button
											variant='destructive'
											size='sm'
											onClick={cancelUnlock}
											disabled={unlockMutation.isLoading}
											className='flex-1'
										>
											Cancel
										</Button>
									</div>
								) : (
									<Button
										variant='outline'
										size='sm'
										onClick={() => handleUnlock(lock.lockId)}
										disabled={unlockMutation.isLoading}
										className='flex-1'
									>
										{unlockMutation.isLoading ? 'Unlocking...' : 'Unlock'}
										<Unlock className='w-4 h-4 ml-2' />
									</Button>
								)}

								{confirmingKeyboardPassword === lock.lockId ? (
									<div className='flex space-x-2 w-full'>
										<Button
											variant='outline'
											size='sm'
											onClick={confirmCreateKeyboardPassword}
											disabled={keyboardPasswordMutation.isLoading}
											className='flex-1'
										>
											Confirm Create
										</Button>
										<Button
											variant='destructive'
											size='sm'
											onClick={cancelCreateKeyboardPassword}
											disabled={keyboardPasswordMutation.isLoading}
											className='flex-1'
										>
											Cancel
										</Button>
									</div>
								) : (
									<Button
										variant='secondary'
										size='sm'
										onClick={() => handleCreateKeyboardPassword(lock.lockId)}
										disabled={keyboardPasswordMutation.isLoading}
										className='flex-1'
									>
										{keyboardPasswordMutation.isLoading
											? 'Creating...'
											: 'Create Keyboard Password'}
										<Keyboard className='w-4 h-4 ml-2' />
									</Button>
								)}
							</div>
							{keyboardPasswordDetails && isCreateKeyboardPasswordDialogOpen && (
								<CreateKeyboardPasswordDetailsDialog
									isOpen={!!isCreateKeyboardPasswordDialogOpen}
									onOpenChange={(open) => {
										console.log('CreateKeyboardPasswordDetailsDialog onOpenChange:', open);
										if (!open) {
											setKeyboardPasswordDetails(null);
										}
									}}
									homeStayID={keyboardPasswordDetails.homeStayID}
									lockID={keyboardPasswordDetails.lockID}
									keyboardPwdId={keyboardPasswordDetails.keyboardPwdId}
									initialKeyboardPwd={keyboardPasswordDetails.initialKeyboardPwd}
								/>
							)}
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TTLockUserLocksDialog;