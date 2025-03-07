'use client';

import { CalendarIcon, Check, ChevronsUpDown, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Button } from './components/ui/button';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './components/ui/command';
import { cn } from './components/ui/utils';
import { getCityList } from '@/pages/api/city/getCityList';

export default function SearchForm() {
	const router = useRouter();
	const [range, setRange] = useState({ from: undefined, to: undefined });
	const [openCity, setOpenCity] = useState(false);
	const [selectedCity, setSelectedCity] = useState('');
	const [isSearching, setIsSearching] = useState(false);

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
			<div className='bg-white rounded-lg border-2 border-red-500 p-4 flex flex-col md:flex-row gap-4'>
				{/* Location */}
				<div className='flex-1'>
					<Popover open={openCity} onOpenChange={setOpenCity}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								role='combobox'
								aria-expanded={openCity}
								className='w-full justify-between h-12 border-gray-300'
							>
								<div className='flex items-center'>
									<MapPin className='mr-2 h-5 w-5 text-gray-400' />
									{selectedCity || 'Where are you going?'}
								</div>
								<ChevronsUpDown className='opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-full p-0'>
							<Command>
								<CommandInput placeholder='Search city...' className='h-9' />
								<CommandList>
									<CommandEmpty>No city found.</CommandEmpty>
									<CommandGroup>
										{cities?.map((city) => (
											<CommandItem
												key={city}
												value={city}
												onSelect={(currentValue) => {
													setSelectedCity(currentValue === selectedCity ? '' : currentValue);
													setOpenCity(false);
												}}
											>
												{city}
												<Check
													className={cn(
														'ml-auto',
														selectedCity === city ? 'opacity-100' : 'opacity-0'
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
				{/* <div className='flex-1'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn(
									'w-full justify-start text-left h-12 font-normal border-gray-300',
									!range?.from && 'text-muted-foreground'
								)}
							>
								<CalendarIcon className='mr-2 h-5 w-5' />
								{range?.from ? (
									range.to ? (
										<>
											{format(range.from, 'dd/MM/yyyy')} - {format(range.to, 'dd/MM/yyyy')}
										</>
									) : (
										format(range.from, 'dd/MM/yyyy')
									)
								) : (
									'Select dates'
								)}
							</Button>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-4' align='start'>
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
							/>
						</PopoverContent>
					</Popover>
				</div> */}

				{/* Search Button */}
				<Button
					className='h-12 px-8 bg-[#006CE4] hover:bg-[#006CE4]/90 text-white font-medium'
					onClick={handleSearch}
					disabled={isSearching || !selectedCity}
				>
					{isSearching ? 'Searching...' : 'Search'}
				</Button>
			</div>
		</div>
	);
}
