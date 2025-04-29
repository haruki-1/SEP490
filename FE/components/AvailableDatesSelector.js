import React, { useState, useEffect } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { useTranslation } from 'next-i18next';

// Calendar month view component with improved date selection
const AvailableDatesSelector = ({ availableDates = [], selectedDates, setSelectedDates, isDisabled }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { t } = useTranslation('common');
    const [selectionMode, setSelectionMode] = useState('checkin'); // 'checkin' or 'checkout'
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);

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

    // Handle date selection
	const handleDateClick = (day) => {
		if (isDisabled || !day.isAvailable) return;
	
		if (selectionMode === 'checkin') {
			// Set check-in date and switch to checkout mode
			setCheckinDate(day);
			setCheckoutDate(null);
			setSelectionMode('checkout');
			setSelectedDates([day.calendarId]);
		} else {
			// For checkout, we need to select all dates from checkin to checkout (inclusive)
			if (day.date < checkinDate.date) {
				// If selected date is before checkin, swap them
				setCheckoutDate(checkinDate);
				setCheckinDate(day);
				setSelectionMode('checkin');
				
				// Select all dates between new checkin and checkout
				const startDate = new Date(day.date);
				const endDate = new Date(checkinDate.date);
				const selectedIds = [];
				
				for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
					const dateStr = d.toISOString().split('T')[0];
					const dateItem = processedDates.find(item => 
						item.dateObj.toISOString().split('T')[0] === dateStr
					);
					if (dateItem) {
						selectedIds.push(dateItem.id);
					}
				}
				setSelectedDates(selectedIds);
			} else {
				// Normal case - select all dates from checkin to checkout (inclusive)
				setCheckoutDate(day);
				setSelectionMode('checkin');
				
				const startDate = new Date(checkinDate.date);
				const endDate = new Date(day.date);
				const selectedIds = [];
				
				for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
					const dateStr = d.toISOString().split('T')[0];
					const dateItem = processedDates.find(item => 
						item.dateObj.toISOString().split('T')[0] === dateStr
					);
					if (dateItem) {
						selectedIds.push(dateItem.id);
					}
				}
				setSelectedDates(selectedIds);
			}
		}
	};
	
	const calculateNights = () => {
		if (!checkinDate || !checkoutDate) return 0;
		// Calculate difference in days (inclusive of checkout date)
		const timeDiff = checkoutDate.date.getTime() - checkinDate.date.getTime();
		const dayDiff = timeDiff / (1000 * 60 * 60 * 24) + 1; // Add 1 to include checkout day
		return dayDiff;
	};
	
	
    // Clear selection function
    const clearSelection = () => {
        setCheckinDate(null);
        setCheckoutDate(null);
        setSelectedDates([]);
        setSelectionMode('checkin');
    };

    // Check if a date is in the selected range
	const isInSelectedRange = (day) => {
		if (!checkinDate || !checkoutDate) return false;
		return day.date >= checkinDate.date && day.date <= checkoutDate.date;
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
                                            ? day.calendarId === checkinDate?.calendarId
                                                ? 'bg-blue-600 text-white font-medium'
                                                : day.calendarId === checkoutDate?.calendarId
                                                ? 'bg-blue-400 text-white font-medium'
                                                : isInSelectedRange(day)
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'hover:bg-blue-50 border border-gray-200'
                                            : day.isBooked
                                            ? 'bg-red-50 text-red-300 cursor-not-allowed border border-red-100'
                                            : day.isPast
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    disabled={!day.isAvailable || isDisabled}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day.day}
                                    {day.isBooked && (
                                        <span className='absolute bottom-0 w-1 h-1 -translate-x-1/2 bg-red-400 rounded-full left-1/2'></span>
                                    )}
                                    {day.calendarId === checkinDate?.calendarId && (
                                        <span className='absolute text-xs bottom-1'>IN</span>
                                    )}
                                    {day.calendarId === checkoutDate?.calendarId && (
                                        <span className='absolute text-xs bottom-1'>OUT</span>
                                    )}
                                </button>
                            ) : (
                                <div className='w-full h-full'></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Selected dates info */}
                {(checkinDate || checkoutDate) && (
				<div className='flex items-center justify-between px-3 py-2 mt-3 text-sm rounded-lg bg-blue-50'>
					<span className='text-blue-700'>
						{checkinDate && checkoutDate ? (
							<>
								<strong>{calculateNights()}</strong> {calculateNights() === 1 ? 'night' : 'nights'} selected
								<div className='text-xs'>
									{checkinDate.date.toLocaleDateString()} to {checkoutDate.date.toLocaleDateString()}
								</div>
							</>
						) : (
							<>
								{checkinDate ? 'Select check-out date' : 'Select check-in date'}
							</>
						)}
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