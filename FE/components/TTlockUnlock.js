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

const TTlockUnlock = ({ isOpen, onOpenChange, locks, homeStayID }) => {
    const [confirmingUnlock, setConfirmingUnlock] = useState(null);
    const [confirmingKeyboardPassword, setConfirmingKeyboardPassword] = useState(null);
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

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Mở khóa khóa nhà </DialogTitle>
                    <DialogDescription>Lưu ý chỉ mở được 1 lần</DialogDescription>
                </DialogHeader>

                <div className='space-y-4'>
                    {locks.map((lock) => (
                        <div key={lock.lockId} className='flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <Lock className='w-6 h-6 text-primary' />
                                    <div>
                                        <h3 className='text-md font-semibold'>{lock.lockAlias}</h3>
                                    </div>
                                </div>

                                <div className='flex items-center space-x-2'>
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
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TTlockUnlock;