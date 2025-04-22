import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User, Search, ChevronDown, Bell, LogOut, Settings, Calendar, CalendarIcon, MapPin } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { searchHomeStay } from 'pages/api/homestay/searchHomeStay';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTranslation } from 'next-i18next';
import { getCityList } from 'pages/api/city/getCityList';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './components/ui/command';
import { Check } from 'react-feather';
import { cn } from './lib/utils';
import { useAuth } from 'context/AuthProvider';

const Header = () => {
	const router = useRouter();
	const { dataProfile, logout } = useAuth();
	const [location, setLocation] = useState('');
	const [scrolled, setScrolled] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [cityPickerOpen, setCityPickerOpen] = useState(false);
	const [openCity, setOpenCity] = useState(false);
	const [selectedCity, setSelectedCity] = useState('');
	const { t } = useTranslation('common');

	// Date selection states
	const [checkInDate, setCheckInDate] = useState(null);
	const [checkOutDate, setCheckOutDate] = useState(null);
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

	const {
		data: cities,
		isLoading,
		error: citiesError,
	} = useQuery({
		queryKey: ['cities'],
		queryFn: getCityList,
	});

	// Handle scroll effect for transparent to solid header
	useEffect(() => {
		setIsMounted(true);

		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrolled]);

	// Handle range selection
	const handleRangeSelect = (range) => {
		setSelectedRange(range);
		setCheckInDate(range?.from || null);
		setCheckOutDate(range?.to || null);
	};

	const handleCitySelect = (city) => {
		setSelectedCity(city);
		setLocation(city);
		setCityPickerOpen(false);
	};

	const handleSearch = async (e) => {
		e.preventDefault();

		if (!checkInDate || !checkOutDate) {
			toast.error('Please select both check-in and check-out dates');
			return;
		}

		// Format dates for API call
		const formattedCheckIn = format(checkInDate, 'yyyy-MM-dd');
		const formattedCheckOut = format(checkOutDate, 'yyyy-MM-dd');

		try {
			setIsSearching(true);

			// Call the search API
			const results = await searchHomeStay(
				location.trim(), // Pass city parameter first
				formattedCheckIn,
				formattedCheckOut
			);

			// Navigate to search results page with query params
			router.push({
				pathname: '/search',
				query: {
					checkIn: formattedCheckIn,
					checkOut: formattedCheckOut,
					location: location.trim() || undefined,
				},
			});
		} catch (error) {
			console.error('Search failed:', error);
			toast.error('Failed to search homestays. Please try again.');
		} finally {
			setIsSearching(false);
		}
	};

	const isActivePath = (path) => {
		// Exact match or nested routes (e.g., /home-stay/details)
		return router.pathname === path || router.pathname.startsWith(`${path}/`);
	};

	// Get initials for avatar fallback
	const getInitials = (name) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	// DayPicker styles
	const dayPickerClassNames = {
		months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
		month: 'space-y-4',
		caption: 'flex justify-center pt-1 relative items-center',
		caption_label: 'text-sm font-medium',
		nav: 'space-x-1 flex items-center',
		nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
		nav_button_previous: 'absolute left-1',
		nav_button_next: 'absolute right-1',
		table: 'w-full border-collapse space-y-1',
		head_row: 'flex',
		head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
		row: 'flex w-full mt-2',
		cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
		day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 rounded-md',
		day_selected: 'bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
		day_today: 'bg-gray-100',
		day_outside: 'text-gray-400 opacity-50',
		day_disabled: 'text-gray-400 opacity-50',
		day_range_middle: 'aria-selected:bg-blue-100 aria-selected:text-blue-800',
		day_range_end: 'rounded-r-md',
		day_range_start: 'rounded-l-md',
	};

	return (
		<header
			className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-200 ${
				scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-white/80 py-3 md:py-4'
			}`}
		>
			<div className='container-lg'>
				<div className='relative flex items-center justify-between'>
					{/* Logo */}
					<div className='flex items-center gap-3'>
						<Link
							href='/'
							className='flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
						>
							<div className='relative w-10 h-10 overflow-hidden border-2 border-blue-100 rounded-full shadow-sm'>
								<Image src='/images/logo.jpg' alt='logo' fill className='object-cover' priority />
							</div>
						</Link>

						{/* Desktop Navigation */}

						<nav className='items-center hidden ml-6 space-x-1 md:flex'>
							<Link
								key='/home-stay'
								href='/home-stay'
								className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
						isActivePath('/home-stay')
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
					}
                  `}
							>
								{t('homestays')}
							</Link>
							<Link
								key='/posts'
								href='/posts'
								className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
						isActivePath('/posts')
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
					}
                  `}
							>
								{t('posts')}
							</Link>
						</nav>
					</div>

					{/* Search bar - Desktop */}
					<div className='items-center hidden w-full max-w-md mx-6 md:flex'>
						<form onSubmit={handleSearch} className='relative flex items-center w-full gap-2'>
							{/* City selector with dropdown */}
							<Popover open={cityPickerOpen} onOpenChange={setCityPickerOpen}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										role='combobox'
										aria-expanded={cityPickerOpen}
										className='justify-between w-full border-gray-200 rounded-l-full rounded-r-none'
									>
										{location ? (
											<div className='flex items-center'>
												<MapPin className='w-4 h-4 mr-2 text-gray-500' />
												{location}
											</div>
										) : (
											<div className='flex items-center text-gray-500'>
												<MapPin className='w-4 h-4 mr-2' />
												{t('where')}
											</div>
										)}
										<ChevronDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-[300px] p-0'>
									<Command>
										<CommandInput placeholder={t('search-city')} />
										<CommandGroup heading='Popular Destinations'>
											<CommandList>
												{isLoading ? (
													<div className='flex items-center justify-center py-6'>
														<div className='w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin'></div>
													</div>
												) : (
													cities?.map((city) => (
														<CommandItem
															key={city}
															value={city}
															onSelect={() => {
																handleCitySelect(city);
																setCityPickerOpen(false);
															}}
															className='flex items-center'
														>
															<MapPin className='w-4 h-4 mr-2 text-gray-400' />
															{city}
															<Check
																className={cn(
																	'ml-auto',
																	location === city
																		? 'opacity-100 text-blue-500'
																		: 'opacity-0'
																)}
															/>
														</CommandItem>
													))
												)}
											</CommandList>
										</CommandGroup>
										<CommandEmpty>{t('no-city-found')}</CommandEmpty>
									</Command>
								</PopoverContent>
							</Popover>

							{/* Date Picker */}
							<Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className={`rounded-none border-l-0 border-r-0 px-3 ${
											checkInDate && checkOutDate ? 'text-blue-600' : 'text-gray-500'
										}`}
									>
										<CalendarIcon className='w-4 h-4 mr-2' />
										{checkInDate && checkOutDate ? (
											<span className='text-xs'>
												{format(checkInDate, 'MMM d')} - {format(checkOutDate, 'MMM d')}
											</span>
										) : (
											<span>{t('select-dates')}</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='center'>
									<div className='p-3'>
										<div className='mb-2 space-y-1'>
											<h4 className='text-sm font-medium'>{t('check-dates')}</h4>
											<p className='text-xs text-gray-500'>{t('select-stay')}</p>
										</div>
										<DayPicker
											mode='range'
											selected={selectedRange}
											onSelect={handleRangeSelect}
											numberOfMonths={2}
											defaultMonth={new Date()}
											fromDate={new Date()}
											classNames={dayPickerClassNames}
										/>
										<div className='flex justify-end mt-4'>
											<Button size='sm' onClick={() => setDatePickerOpen(false)}>
												{t('apply')}
											</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>

							<Button type='submit' className='rounded-l-none rounded-r-full' disabled={isSearching}>
								{isSearching ? (
									<div className='w-4 h-4 mr-1 border-t-2 border-white rounded-full animate-spin' />
								) : (
									<Search className='w-4 h-4 mr-1' />
								)}
								{t('search')}
							</Button>
						</form>
					</div>

					{/* Right side elements */}
					<div className='flex items-center gap-1 md:gap-3'>
						{/* Theme toggle and language on desktop */}
						<div className='items-center hidden gap-2 md:flex'>
							<ThemeToggle />
							<LanguageSwitcher />
						</div>

						{/* User menu or login button */}
						{dataProfile ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='relative h-10 rounded-full focus:ring-0 focus:ring-offset-0'
									>
										<Avatar className='border border-gray-200 h-9 w-9'>
											{dataProfile.avatar ? (
												<AvatarImage
													src={dataProfile.avatar}
													alt={dataProfile.fullName || 'User'}
												/>
											) : null}
											<AvatarFallback className='font-medium text-blue-600 bg-blue-100'>
												{getInitials(dataProfile.fullName)}
											</AvatarFallback>
										</Avatar>
										<span className='sr-only'>User menu</span>
										<Badge
											variant='outline'
											className='absolute px-1 bg-green-500 border-2 border-white rounded-full -bottom-1 right-2 size-4'
										>
											<span className='sr-only'>Online</span>
										</Badge>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end' className='w-56'>
									<DropdownMenuLabel>
										<div className='flex flex-col space-y-1'>
											<p className='text-sm font-medium leading-none'>
												{dataProfile.fullName || 'User'}
											</p>
											<p className='text-xs leading-none text-gray-500'>
												{dataProfile.email || ''}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem
											onClick={() => router.push('/profile')}
											className='cursor-pointer'
										>
											<User className='w-4 h-4 mr-2' />
											<span>{t('profile')}</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={logout}
										className='text-red-600 cursor-pointer focus:text-red-600'
									>
										<LogOut className='w-4 h-4 mr-2' />
										<span>{t('logout')}</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className='flex gap-2'>
								<Link href='/auth/login'>
									<Button variant='ghost' size='sm' className='hidden sm:inline-flex'>
										{t('login')}
									</Button>
								</Link>
								<Link href='/auth/register'>
									<Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
										{t('register')}
									</Button>
								</Link>
							</div>
						)}

						{/* Mobile menu */}
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon' className='ml-1 md:hidden'>
									<Menu className='w-5 h-5' />
									<span className='sr-only'>Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='left' className='flex flex-col h-full'>
								<div className='flex items-center gap-2 mt-2 mb-6'>
									<div className='relative w-10 h-10 overflow-hidden rounded-full'>
										<Image src='/images/logo.jpg' alt='logo' fill className='object-cover' />
									</div>
									<span className='text-lg font-semibold'>{t('homestay')}</span>
								</div>

								{/* Mobile search form */}
								<form onSubmit={handleSearch} className='mb-6 space-y-4'>
									<div className='space-y-2'>
										<label className='text-sm font-medium'>Location</label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant='outline'
													role='combobox'
													className='justify-between w-full'
												>
													{location ? (
														<div className='flex items-center'>
															<MapPin className='w-4 h-4 mr-2 text-gray-500' />
															{location}
														</div>
													) : (
														<div className='flex items-center text-gray-500'>
															<MapPin className='w-4 h-4 mr-2' />
															Select a city
														</div>
													)}
													<ChevronDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
												</Button>
											</PopoverTrigger>
											<PopoverContent className='w-[250px] p-0'>
												<Command>
													<CommandInput placeholder='Search city...' />
													<CommandEmpty>
														{isLoading ? 'Loading...' : 'No city found.'}
													</CommandEmpty>
													<CommandGroup>
														<CommandList className='max-h-[200px] overflow-y-auto'>
															{isLoading ? (
																<div className='flex items-center justify-center py-6'>
																	<div className='w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin'></div>
																</div>
															) : cities && cities.length > 0 ? (
																cities.map((city) => (
																	<CommandItem
																		key={city.id}
																		value={city.name}
																		onSelect={() => handleCitySelect(city.name)}
																	>
																		<MapPin className='w-4 h-4 mr-2 text-gray-400' />
																		{city.name}
																	</CommandItem>
																))
															) : (
																<CommandItem disabled>No cities available</CommandItem>
															)}
														</CommandList>
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
									</div>

									<div className='space-y-2'>
										<label className='text-sm font-medium'>{t('check-dates')}</label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant='outline'
													className='justify-start w-full font-normal text-left'
												>
													<CalendarIcon className='w-4 h-4 mr-2' />
													{checkInDate && checkOutDate ? (
														<span>
															{format(checkInDate, 'MMM d')} -{' '}
															{format(checkOutDate, 'MMM d')}
														</span>
													) : (
														<span>{t('select-dates')}</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<div className='p-3'>
													<DayPicker
														mode='range'
														selected={selectedRange}
														onSelect={handleRangeSelect}
														defaultMonth={new Date()}
														fromDate={new Date()}
														classNames={dayPickerClassNames}
													/>
												</div>
											</PopoverContent>
										</Popover>
									</div>

									<Button type='submit' className='w-full' disabled={isSearching}>
										{isSearching ? (
											<div className='w-4 h-4 mr-2 border-t-2 border-white rounded-full animate-spin' />
										) : (
											<Search className='w-4 h-4 mr-2' />
										)}
										{t('search')}
									</Button>
								</form>

								{/* Mobile navigation */}
								<nav className='mb-6 space-y-1'>
									<Link
										key='/home-stay'
										href='/home-stay'
										className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
						isActivePath('/home-stay')
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
					}
                  `}
									>
										{t('homestays')}
									</Link>
									<Link
										key='/posts'
										href='/posts'
										className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
						isActivePath('/posts')
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
					}
                  `}
									>
										{t('posts')}
									</Link>
								</nav>

								<div className='mt-auto space-y-4'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium text-gray-600'>Theme</p>
										<ThemeToggle />
									</div>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium text-gray-600'>Language</p>
										<LanguageSwitcher />
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;