'use client';

import { CalendarIcon, Check, ChevronsUpDown, MapPin, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Button } from './components/ui/button';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getCityList } from '@/pages/api/city/getCityList';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './components/ui/command';
import { cn } from './lib/utils';
import { useTranslation } from 'next-i18next';

export default function SearchForm() {
	const router = useRouter();
	const [range, setRange] = useState({ from: undefined, to: undefined });
	const [openCity, setOpenCity] = useState(false);
	const [openCalendar, setOpenCalendar] = useState(false);
	const [selectedCity, setSelectedCity] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const { t } = useTranslation('common');

	const {
		data: cities,
		isLoading,
		error: citiesError,
	} = useQuery({
		queryKey: ['cities'],
		queryFn: getCityList,
	});

	// Handle search
	const handleSearch = () => {
		if (!selectedCity) {
			return;
		}

		setIsSearching(true);

		// Build the search URL with query parameters
		let searchUrl = `/searchList?city=${encodeURIComponent(selectedCity)}`;

		// Add date range parameters if available
		if (range.from) {
			searchUrl += `&from=${range.from.toISOString()}`;
		}

		if (range.to) {
			searchUrl += `&to=${range.to.toISOString()}`;
		}

		// Redirect to the search results page
		router.push(searchUrl);
	};

	return (
		<div className='w-full'>
			<div className='bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-4 flex flex-col md:flex-row gap-3 border border-gray-100 animate-fadeIn'>
				{/* Location */}
				<div className='flex-1'>
					<div className='text-xs font-medium text-gray-500 mb-1 ml-1'>WHERE</div>
					<Popover open={openCity} onOpenChange={setOpenCity}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								role='combobox'
								aria-expanded={openCity}
								className='w-full justify-between h-12 border-gray-200 bg-white hover:bg-gray-50'
							>
								<div className='flex items-center'>
									<MapPin className='mr-2 h-5 w-5 text-blue-500' />
									<span className={selectedCity ? 'text-gray-900 font-medium' : 'text-gray-500'}>
										{selectedCity || t('wheree')}
									</span>
								</div>
								<ChevronsUpDown className='h-4 w-4 text-gray-400' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-full p-0 max-h-[300px]' align='start'>
							<Command className='rounded-lg'>
								<CommandInput placeholder='Search city...' className='h-10' />
								<CommandList>
									<CommandEmpty>No city found.</CommandEmpty>
									<CommandGroup heading='Popular Destinations'>
										{!isLoading &&
											cities?.map((city) => (
												<CommandItem
													key={city}
													value={city}
													onSelect={(currentValue) => {
														setSelectedCity(
															currentValue === selectedCity ? '' : currentValue
														);
														setOpenCity(false);
													}}
													className='flex items-center py-2'
												>
													<MapPin className='mr-2 h-4 w-4 text-gray-400' />
													{city}
													<Check
														className={cn(
															'ml-auto',
															selectedCity === city
																? 'opacity-100 text-blue-500'
																: 'opacity-0'
														)}
													/>
												</CommandItem>
											))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>

				{/* Date Range Picker */}
				<div className='flex-1'>
					<div className='text-xs font-medium text-gray-500 mb-1 ml-1'>WHEN</div>
					<Popover open={openCalendar} onOpenChange={setOpenCalendar}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn(
									'w-full justify-start text-left h-12 font-normal border-gray-200 bg-white hover:bg-gray-50',
									!range?.from && 'text-gray-500'
								)}
							>
								<CalendarIcon className='mr-2 h-5 w-5 text-blue-500' />
								{range?.from ? (
									range.to ? (
										<span className='text-gray-900 font-medium'>
											{format(range.from, 'MMM d')} - {format(range.to, 'MMM d, yyyy')}
										</span>
									) : (
										<span className='text-gray-900 font-medium'>
											{format(range.from, 'MMM d, yyyy')}
										</span>
									)
								) : (
									t('select-dates')
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-0 border-gray-200' align='start'>
							<div className='p-3 bg-white rounded-lg'>
								<div className='space-y-1 mb-2'>
									<h4 className='font-medium text-sm'>{t('check-dates')}</h4>
									<p className='text-xs text-gray-500'>{t('select-stay')}</p>
								</div>
								<DayPicker
									mode='range'
									selected={range}
									onSelect={setRange}
									numberOfMonths={2}
									weekStartsOn={1}
									disabled={{ before: new Date() }}
									className='flex gap-4'
									styles={{
										caption: { fontWeight: 'bold' },
										head: { fontSize: '0.9rem', color: '#6B7282' },
										day: { height: '2.25rem', width: '2.25rem' },
									}}
									modifiersStyles={{
										selected: {
											backgroundColor: '#3b82f6',
											color: 'white',
											fontWeight: 'bold',
										},
										today: {
											color: '#3b82f6',
											fontWeight: 'bold',
											border: '1px solid #3b82f6',
										},
									}}
								/>
								<div className='flex justify-end mt-4'>
									<Button
										size='sm'
										className='bg-blue-600 hover:bg-blue-700'
										onClick={() => setOpenCalendar(false)}
									>
										{t('apply')}
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				{/* Search Button */}
				<div className='flex items-end'>
					<Button
						className='h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium'
						onClick={handleSearch}
						disabled={isSearching || !selectedCity}
					>
						{isSearching ? (
							<div className='flex items-center'>
								<div className='h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2'></div>
								<span>{t('searching')}</span>
							</div>
						) : (
							<div className='flex items-center'>
								<Search className='mr-2 h-5 w-5' />
								<span>{t('search')}</span>
							</div>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
