import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { Textarea } from '@/components/components/ui/textarea';
import { Star } from 'lucide-react';
import { createFeedback } from 'pages/api/feedback/createFeedback';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FeedbackModal = ({ isOpen, onClose, homestayID, homestayName }) => {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [description, setDescription] = useState('');
	const queryClient = useQueryClient();

	const feedbackMutation = useMutation({
		mutationFn: async ({ homestayID, rating, description }) => {
			return await createFeedback(homestayID, rating, description);
		},
		onSuccess: () => {
			toast.success('Feedback submitted successfully!');
			queryClient.invalidateQueries({ queryKey: ['historyBooking'] });
			onClose();
			// Reset form
			setRating(0);
			setDescription('');
		},
		onError: (error) => {
			toast.error(`Failed to submit feedback: ${error.response?.data?.message || error.message}`);
		},
	});

	const handleSubmit = () => {
		if (rating === 0) {
			toast.warning('Please select a rating');
			return;
		}

		if (!description.trim()) {
			toast.warning('Please enter some feedback');
			return;
		}

		feedbackMutation.mutate({ homestayID, rating, description });
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Leave Feedback</DialogTitle>
					<DialogDescription>Share your experience at {homestayName}</DialogDescription>
				</DialogHeader>

				<div className='py-4 space-y-4'>
					{/* Star Rating */}
					<div className='flex flex-col items-center space-y-2'>
						<span className='text-sm font-medium text-gray-700'>How would you rate your experience?</span>
						<div className='flex space-x-1'>
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									type='button'
									className='p-1 transition-all'
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
								>
									<Star
										className={`w-8 h-8 ${
											(hoverRating || rating) >= star
												? 'text-yellow-400 fill-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								</button>
							))}
						</div>
						<span className='text-sm text-gray-500'>
							{rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
						</span>
					</div>

					{/* Feedback Text */}
					<div className='space-y-2'>
						<label htmlFor='feedback' className='text-sm font-medium text-gray-700'>
							Your Feedback
						</label>
						<Textarea
							id='feedback'
							placeholder='Tell us about your experience...'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={4}
							className='w-full'
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={onClose} disabled={feedbackMutation.isPending}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={feedbackMutation.isPending}>
						{feedbackMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackModal;