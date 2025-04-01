import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/components/ui/card';
import { Loader2, MessageSquare, Star, Calendar, Send } from 'lucide-react';
import { getHomeStayByUser } from '@/pages/api/booking/bookingByUser';
import { replyFeedbackByUserEmail } from '@/pages/api/feedback/replyFeedbackByUserEmail';
import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar';
import { Button } from '@/components/components/ui/button';
import { Textarea } from '@/components/components/ui/textarea';
import { Input } from '@/components/components/ui/input';
import { Badge } from '@/components/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/components/ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';
import ManagerLayout from '../layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/components/ui/aletr';
import { getFeedbackByHomeStay } from '@/pages/api/feedback/getFeebackByHomstay';

const Feedbacks = () => {
	const [selectedHomeStay, setSelectedHomeStay] = useState(null);
	const [selectedFeedback, setSelectedFeedback] = useState(null);
	const [replyContent, setReplyContent] = useState('');
	const [replySubject, setReplySubject] = useState('');
	const [replyDialogOpen, setReplyDialogOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { dataProfile } = useAuth();

	const getInitials = (name) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	const renderStarRating = (rating) => {
		return (
			<div className='flex items-center'>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
					/>
				))}
				<span className='ml-2 text-sm font-medium'>{rating}/5</span>
			</div>
		);
	};

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A';
		try {
			return format(new Date(dateString), 'MMM dd, yyyy');
		} catch (error) {
			return dateString;
		}
	};

	const {
		data: homeStays,
		isLoading: homeStaysLoading,
		isError: homeStaysError,
	} = useQuery({
		queryKey: ['homestays', dataProfile?.id],
		queryFn: () => getHomeStayByUser(dataProfile?.id),
		enabled: !!dataProfile?.id,
		refetchOnWindowFocus: false,
	});

	const {
		data: feedbacks,
		isLoading: feedbacksLoading,
		isError: feedbacksError,
		refetch: refetchFeedbacks,
	} = useQuery({
		queryKey: ['feedbacks', selectedHomeStay],
		queryFn: () => getFeedbackByHomeStay(selectedHomeStay),
		enabled: !!selectedHomeStay,
	});

	// Handle homestay selection change
	const handleHomeStayChange = (value) => {
		setSelectedHomeStay(value);
	};

	const handleReplyOpen = (feedback) => {
		setSelectedFeedback(feedback);
		setReplyContent(feedback.reply || '');

		// Set default subject based on homestay and rating
		const homestayName = homeStays?.find((h) => h.id === selectedHomeStay)?.name || 'Homestay';
		setReplySubject(`Response to your ${feedback.rating}-star feedback about ${homestayName}`);

		setReplyDialogOpen(true);
	};

	const handleSubmitReply = async () => {
		if (!replyContent.trim()) {
			toast.error('Reply content cannot be empty');
			return;
		}

		if (!replySubject.trim()) {
			toast.error('Subject cannot be empty');
			return;
		}

		try {
			setIsSubmitting(true);
			await replyFeedbackByUserEmail({
				feedbackId: selectedFeedback.id,
				subject: replySubject,
				message: replyContent,
			});

			toast.success('Your reply has been sent successfully');

			setReplyDialogOpen(false);
			refetchFeedbacks();
		} catch (error) {
			toast.error('Failed to send reply. Please try again.');
			console.error('Error replying to feedback:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<ManagerLayout>
			<div className='min-h-screen p-6 bg-gray-50'>
				<Card className='w-full shadow-sm'>
					<CardHeader className='border-b bg-gradient-to-r from-blue-50 to-indigo-50'>
						<div className='flex items-center space-x-2'>
							<MessageSquare className='w-6 h-6 text-indigo-600' />
							<CardTitle className='text-2xl font-bold text-gray-800'>Homestay Feedbacks</CardTitle>
						</div>
						<CardDescription className='text-gray-600'>
							View and respond to guest feedback for your homestays
						</CardDescription>
					</CardHeader>
					<CardContent className='p-6'>
						{/* HomeStay Selection */}
						<div className='p-4 mb-8 bg-white border rounded-lg shadow-sm'>
							<label className='block mb-2 text-sm font-medium text-gray-700'>Select HomeStay:</label>
							<Select onValueChange={handleHomeStayChange} disabled={homeStaysLoading || homeStaysError}>
								<SelectTrigger className='w-full border-gray-300 md:w-80 focus:ring-indigo-500 focus:border-indigo-500'>
									<SelectValue placeholder='Select a homestay' />
								</SelectTrigger>
								<SelectContent>
									{homeStays?.map((homeStay) => (
										<SelectItem key={homeStay.id} value={homeStay.id}>
											{homeStay.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Loading State */}
						{homeStaysLoading && (
							<div className='flex items-center justify-center py-16 bg-white border rounded-lg shadow-sm'>
								<Loader2 className='w-8 h-8 text-indigo-600 animate-spin' />
								<p className='ml-2 text-gray-600'>Loading homestays...</p>
							</div>
						)}

						{/* Feedbacks Table */}
						{feedbacksLoading ? (
							<div className='flex items-center justify-center py-16 bg-white border rounded-lg shadow-sm'>
								<Loader2 className='w-8 h-8 text-indigo-600 animate-spin' />
								<p className='ml-2 text-gray-600'>Loading feedbacks...</p>
							</div>
						) : selectedHomeStay ? (
							feedbacks?.length > 0 ? (
								<div className='overflow-hidden bg-white border rounded-lg shadow-sm'>
									<Table>
										<TableHeader className='bg-gray-50'>
											<TableRow>
												<TableHead className='font-semibold text-gray-700'>Guest</TableHead>
												<TableHead className='font-semibold text-gray-700'>
													<Star className='inline w-4 h-4 mr-1' />
													Rating
												</TableHead>
												<TableHead className='hidden font-semibold text-gray-700 md:table-cell'>
													Feedback
												</TableHead>
												<TableHead className='font-semibold text-gray-700'>Status</TableHead>
												<TableHead className='font-semibold text-right text-gray-700'>
													Action
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{feedbacks?.map((feedback) => (
												<TableRow key={feedback.id} className='hover:bg-gray-50'>
													<TableCell className='flex items-center space-x-3'>
														<Avatar className='flex-shrink-0 w-10 h-10 border-2 border-white shadow'>
															{feedback?.user?.avatar ? (
																<AvatarImage
																	src={feedback?.user.avatar}
																	alt={feedback?.user?.fullName || 'Guest'}
																/>
															) : (
																<AvatarImage
																	src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${
																		feedback?.user?.email || 'guest'
																	}`}
																	alt='Guest'
																/>
															)}
															<AvatarFallback className='font-medium text-white bg-indigo-600'>
																{getInitials(feedback?.user?.fullName)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className='font-medium text-gray-800'>
																{feedback?.user?.fullName || 'Anonymous'}
															</p>
															<p className='text-xs text-gray-500'>
																{feedback?.user?.email || 'No email'}
															</p>
														</div>
													</TableCell>

													<TableCell>{renderStarRating(feedback.rating)}</TableCell>
													<TableCell className='hidden md:table-cell'>
														<div
															className='max-w-xs overflow-hidden text-ellipsis whitespace-nowrap'
															title={feedback.description}
														>
															{feedback.description || 'No comment'}
														</div>
													</TableCell>
													<TableCell>
														{feedback.isReply ? (
															<Badge
																variant='outline'
																className='text-green-700 border-green-200 bg-green-50'
															>
																Replied
															</Badge>
														) : (
															<Badge
																variant='outline'
																className='bg-amber-50 text-amber-700 border-amber-200'
															>
																Pending
															</Badge>
														)}
													</TableCell>
													<TableCell className='text-right'>
														<Button
															variant={feedback.reply ? 'outline' : 'default'}
															size='sm'
															className={
																feedback.reply
																	? 'text-indigo-600 border-indigo-200 hover:bg-indigo-50'
																	: 'bg-indigo-600 hover:bg-indigo-700'
															}
															disabled={feedback.isReply}
															onClick={() => handleReplyOpen(feedback)}
														>
															{feedback.reply ? 'View & Edit' : 'Reply'}
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							) : (
								<div className='py-16 text-center bg-white border rounded-lg shadow-sm'>
									<MessageSquare className='w-12 h-12 mx-auto mb-4 text-gray-300' />
									<p className='text-lg text-gray-500'>No feedbacks found for this homestay</p>
									<p className='mt-2 text-sm text-gray-400'>
										Feedbacks will appear here once guests submit them
									</p>
								</div>
							)
						) : (
							<div className='py-16 text-center bg-white border rounded-lg shadow-sm'>
								<MessageSquare className='w-12 h-12 mx-auto mb-4 text-gray-300' />
								<p className='text-lg text-gray-500'>Please select a homestay to view feedbacks</p>
							</div>
						)}

						{/* Error States */}
						{homeStaysError && (
							<Alert variant='destructive' className='mt-6'>
								<AlertTitle>Error Loading Homestays</AlertTitle>
								<AlertDescription>Unable to load homestays. Please try again later.</AlertDescription>
							</Alert>
						)}
						{feedbacksError && (
							<Alert variant='destructive' className='mt-6'>
								<AlertTitle>Error Loading Feedbacks</AlertTitle>
								<AlertDescription>Unable to load feedbacks. Please try again later.</AlertDescription>
							</Alert>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Reply Dialog */}
			{selectedFeedback && (
				<Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
					<DialogContent className='sm:max-w-lg'>
						<DialogHeader>
							<DialogTitle className='text-xl font-semibold text-gray-800'>
								{selectedFeedback?.reply ? 'Edit Reply' : 'Reply to Feedback'}
							</DialogTitle>
						</DialogHeader>

						<div className='space-y-4'>
							<div className='p-4 space-y-2 border rounded-lg bg-gray-50'>
								<div className='flex items-center mb-2 space-x-3'>
									<Avatar className='w-8 h-8'>
										<AvatarImage
											src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${
												selectedFeedback?.user?.email || 'guest'
											}`}
											alt='Guest'
										/>
										<AvatarFallback className='font-medium text-white bg-indigo-600'>
											{getInitials(selectedFeedback?.user?.fullName)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className='font-medium text-gray-800'>
											{selectedFeedback?.user?.fullName || 'Guest'}
										</p>
										<div className='flex items-center text-sm text-gray-500'>
											{renderStarRating(selectedFeedback.rating)}
										</div>
									</div>
								</div>
								<p className='italic text-gray-700'>{selectedFeedback.description}</p>
								<p className='text-xs text-gray-500'>{formatDate(selectedFeedback.createdAt)}</p>
							</div>

							{/* Subject input field */}
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>Email Subject:</label>
								<Input
									value={replySubject}
									onChange={(e) => setReplySubject(e.target.value)}
									placeholder='Enter email subject'
									className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
								/>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>Your Reply:</label>
								<Textarea
									value={replyContent}
									onChange={(e) => setReplyContent(e.target.value)}
									placeholder='Type your reply here...'
									className='border-gray-300 min-h-32 focus:border-indigo-500 focus:ring-indigo-500'
								/>
							</div>

							<DialogFooter className='mt-6'>
								<Button variant='outline' onClick={() => setReplyDialogOpen(false)} className='mr-2'>
									Cancel
								</Button>
								<Button
									onClick={handleSubmitReply}
									className={`bg-indigo-600 hover:bg-indigo-700`}
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className='w-4 h-4 mr-2 animate-spin' />
											Sending...
										</>
									) : (
										<>
											<Send className='w-4 h-4 mr-2' />
											{selectedFeedback?.reply ? 'Update Reply' : 'Send Reply'}
										</>
									)}
								</Button>
							</DialogFooter>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</ManagerLayout>
	);
};
export default Feedbacks;
