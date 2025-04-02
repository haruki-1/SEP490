import React, { useState, useEffect } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { useTranslation } from 'next-i18next';

// Calendar month view component with improved date selection
const AvailableDatesSelector = ({ availableDates = [], selectedDates, setSelectedDates, isDisabled }) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const { t } = useTranslation('common');

	// Track drag state without relying on complex drag logic
	const [isDragging, setIsDragging] = useState(false);

	// Process available dates for easier access
	const processedDates = React.useMemo(() => {
		return (availableDates || []).map((date) => ({
			...date,
			dateObj: new Date(date.date),
		}));
	}, [availableDates]);

	// Initialize with current month if there are available dates
	useEffect(() => {
		if (processedDates.length > 0) {
			const upcomingDates = processedDates
				.filter((date) => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);
					return date.dateObj >= today && !date.isBooked && !date.isDeleted;
				})
				.sort((a, b) => a.dateObj - b.dateObj);

			if (upcomingDates.length > 0) {
				setCurrentMonth(new Date(upcomingDates[0].dateObj));
			}
		}
	}, [processedDates]);

	// Generate calendar for the current month
	const generateCalendar = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();

		// First day of the month
		const firstDay = new Date(year, month, 1);
		const firstDayIndex = firstDay.getDay();

		// Last day of the month
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();

		// Create array of days, with empty spots for padding
		const days = [];

		// Add empty slots for days before the first day of the month
		for (let i = 0; i < firstDayIndex; i++) {
			days.push(null);
		}

		// Add the actual days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			date.setHours(0, 0, 0, 0);

			// Find if this date is in the available dates
			const dateItem = processedDates.find((d) => {
				return (
					d.dateObj.getFullYear() === year && d.dateObj.getMonth() === month && d.dateObj.getDate() === day
				);
			});

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			days.push({
				day,
				date,
				dateString: date.toISOString().split('T')[0],
				isAvailable: dateItem && !dateItem.isBooked && !dateItem.isDeleted && date >= today,
				isBooked: dateItem?.isBooked,
				calendarId: dateItem?.id,
				isPast: date < today,
			});
		}

		return days;
	};

	const calendar = generateCalendar();

	// Navigation functions
	const goToPreviousMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
	};

	const goToNextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
	};

	// Handle simple click on a date
	const handleDateClick = (calendarId) => {
		if (isDisabled || !calendarId) return;

		// Simple toggle logic
		if (selectedDates.includes(calendarId)) {
			// If already selected, remove it
			setSelectedDates(selectedDates.filter((id) => id !== calendarId));
		} else {
			// If not selected, add it
			setSelectedDates([...selectedDates, calendarId]);
		}
	};

	// Start mouse down for drag
	const handleMouseDown = (calendarId) => {
		if (isDisabled || !calendarId) return;
		document.addEventListener('mouseup', handleMouseUp);
		setIsDragging(true);
	};

	// Handle mouse up to end drag
	const handleMouseUp = () => {
		setIsDragging(false);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	// Handle mouse over for drag selection
	const handleMouseOver = (calendarId) => {
		if (!isDragging || !calendarId || isDisabled) return;

		// If we're dragging and not already selected, add this date
		if (!selectedDates.includes(calendarId)) {
			setSelectedDates([...selectedDates, calendarId]);
		}
	};

	// Clear selection function
	const clearSelection = () => {
		setSelectedDates([]);
	};

	return (
		<div className='flex flex-col gap-3'>
			<h3 className='flex items-center text-base font-semibold text-gray-700'>
				<Calendar className='w-4 h-4 mr-2 text-blue-500' />
				{t('availabledates')}
			</h3>

			<div className='p-4 bg-white border border-gray-100 rounded-lg shadow-sm'>
				{/* Month navigation */}
				<div className='flex items-center justify-between mb-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={goToPreviousMonth}
						className='p-1 rounded-full hover:bg-gray-100'
					>
						<ChevronLeft className='w-5 h-5 text-gray-600' />
					</Button>

					<h4 className='text-sm font-semibold text-gray-800'>
						{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
					</h4>

					<Button
						variant='ghost'
						size='sm'
						onClick={goToNextMonth}
						className='p-1 rounded-full hover:bg-gray-100'
					>
						<ChevronRight className='w-5 h-5 text-gray-600' />
					</Button>
				</div>

				{/* Day labels */}
				<div className='grid grid-cols-7 mb-2'>
					{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
						<div key={i} className='flex items-center justify-center'>
							<span className='text-xs font-medium text-gray-500'>{day}</span>
						</div>
					))}
				</div>

				{/* Calendar grid */}
				<div className='grid grid-cols-7 gap-1'>
					{calendar.map((day, index) => (
						<div key={index} className='aspect-square'>
							{day ? (
								<button
									type='button'
									className={`w-full h-full flex items-center justify-center rounded-md text-sm relative ${
										day.isAvailable
											? selectedDates.includes(day.calendarId)
												? 'bg-blue-500 text-white font-medium hover:bg-blue-600'
												: 'hover:bg-blue-50 border border-gray-200'
											: day.isBooked
											? 'bg-red-50 text-red-300 cursor-not-allowed border border-red-100'
											: day.isPast
											? 'text-gray-300 cursor-not-allowed'
											: 'text-gray-300 cursor-not-allowed'
									}`}
									disabled={!day.isAvailable || isDisabled}
									onClick={() => day.isAvailable && handleDateClick(day.calendarId)}
									onMouseDown={() => day.isAvailable && handleMouseDown(day.calendarId)}
									onMouseOver={() => day.isAvailable && handleMouseOver(day.calendarId)}
								>
									{day.day}
									{day.isBooked && (
										<span className='absolute bottom-0 w-1 h-1 -translate-x-1/2 bg-red-400 rounded-full left-1/2'></span>
									)}
								</button>
							) : (
								<div className='w-full h-full'></div>
							)}
						</div>
					))}
				</div>

				{/* Selected dates info */}
				{selectedDates.length > 0 && (
					<div className='flex items-center justify-between px-3 py-2 mt-3 text-sm rounded-lg bg-blue-50'>
						<span className='text-blue-700'>
							<strong>{selectedDates.length}</strong> {selectedDates.length === 1 ? 'night' : 'nights'}{' '}
							selected
						</span>
						<Button
							variant='ghost'
							size='sm'
							className='px-2 text-xs text-blue-600 h-7 hover:bg-blue-100'
							onClick={clearSelection}
						>
							Clear
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AvailableDatesSelector;