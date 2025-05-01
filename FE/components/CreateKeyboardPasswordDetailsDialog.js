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
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Button } from '@/components/components/ui/button';
import { Calendar } from '@/components/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { changeKeyboardPassword } from 'pages/api/ttlock/changeKeyboardPassword';
import { cn } from './lib/utils';

const formatDateToString = (date) => {
	return date ? format(date, 'yyyy-MM-dd') : null;
};

const CreateKeyboardPasswordDetailsDialog = ({
	isOpen,
	onOpenChange,
	homeStayID,
	lockID,
	keyboardPwdId,
	initialKeyboardPwd,
}) => {
	const [name, setName] = useState('');
	const [newPasscode, setNewPasscode] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const changePasswordMutation = useMutation({
		mutationFn: ({ homeStayID, lockID, keyboardPwdId, newPasscode, startDate, endDate, name }) =>
			changeKeyboardPassword(
				homeStayID,
				lockID,
				keyboardPwdId,
				newPasscode,
				formatDateToString(startDate), // Convert to string
				endDate ? formatDateToString(endDate) : null, // Convert to string or null
				name
			),
		onSuccess: () => {
			toast.success('Keyboard password updated successfully');
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error.message || 'Unable to update keyboard password');
		},
	});

	const handleSubmit = () => {
		// Basic validation
		if (!name || !newPasscode) {
			toast.error('Please fill in all required fields');
			return;
		}

		if (endDate && startDate > endDate) {
			toast.error('Start date must be before end date');
			return;
		}

		changePasswordMutation.mutate({
			homeStayID,
			lockID,
			keyboardPwdId,
			newPasscode,
			startDate,
			endDate,
			name,
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Configure Keyboard Password</DialogTitle>
					<DialogDescription>Set details for your new keyboard password</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input
							id='name'
							placeholder='Enter password name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='col-span-3'
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='initialPwd' className='text-right'>
							Initial Password
						</Label>
						<Input id='initialPwd' value={initialKeyboardPwd} disabled className='col-span-3' />
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='newPasscode' className='text-right'>
							New Passcode
						</Label>
						<Input
							id='newPasscode'
							placeholder='Enter new passcode'
							value={newPasscode}
							onChange={(e) => setNewPasscode(e.target.value)}
							className='col-span-3'
						/>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Start Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'col-span-3 justify-start text-left font-normal',
										!startDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={startDate}
									onSelect={setStartDate}
									initialFocus
									fromDate={new Date()}
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>End Date (Optional)</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'col-span-3 justify-start text-left font-normal',
										!endDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{endDate ? format(endDate, 'PPP') : <span>Pick an end date (optional)</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={endDate}
									onSelect={setEndDate}
									initialFocus
									fromDate={startDate || new Date()}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant='outline'
						onClick={() => onOpenChange(false)}
						disabled={changePasswordMutation.isLoading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={changePasswordMutation.isLoading}>
						{changePasswordMutation.isLoading ? 'Updating...' : 'Update Password'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateKeyboardPasswordDetailsDialog;