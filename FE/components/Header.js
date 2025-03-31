import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User, Search, ChevronDown, Bell, LogOut, Settings, Calendar, CalendarIcon } from 'lucide-react';
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
import { Input } from './components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { searchHomeStay } from '@/pages/api/homestay/searchHomeStay';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAuth } from '@/context/AuthProvider';
import AmenityList from './AmenityList';
import { useTranslation } from 'next-i18next';

const Header = () => {
	const router = useRouter();
	const { dataProfile, logout } = useAuth();
	const [location, setLocation] = useState('');
	const [scrolled, setScrolled] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const { t } = useTranslation('common');

	// Date selection states
	const [checkInDate, setCheckInDate] = useState(null);
	const [checkOutDate, setCheckOutDate] = useState(null);
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

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
			const results = await searchHomeStay(formattedCheckIn, formattedCheckOut);

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
							className='flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md'
						>
							<div className='relative h-10 w-10 overflow-hidden rounded-full border-2 border-blue-100 shadow-sm'>
								<Image src='/images/logo.jpg' alt='logo' fill className='object-cover' priority />
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className='hidden md:flex items-center ml-6 space-x-1'>
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
					<div className='hidden md:flex items-center max-w-md w-full mx-6'>
						<form onSubmit={handleSearch} className='relative flex w-full items-center gap-2'>
							<Input
								type='text'
								placeholder={t('where')}
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className='border-gray-200 rounded-l-full focus:ring-blue-500 focus:border-blue-500 rounded-r-none'
							/>

							<Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className={`rounded-none border-l-0 border-r-0 px-3 ${
											checkInDate && checkOutDate ? 'text-blue-600' : 'text-gray-500'
										}`}
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
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
										<div className='space-y-1 mb-2'>
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

							<Button type='submit' className='rounded-r-full rounded-l-none' disabled={isSearching}>
								{isSearching ? (
									<div className='h-4 w-4 border-t-2 border-white rounded-full animate-spin mr-1' />
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
						<div className='hidden md:flex items-center gap-2'>
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
										<Avatar className='h-9 w-9 border border-gray-200'>
											{dataProfile.avatar ? (
												<AvatarImage
													src={dataProfile.avatar}
													alt={dataProfile.fullName || 'User'}
												/>
											) : null}
											<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
												{getInitials(dataProfile.fullName)}
											</AvatarFallback>
										</Avatar>
										<span className='sr-only'>User menu</span>
										<Badge
											variant='outline'
											className='absolute -bottom-1 right-2 size-4 px-1 rounded-full bg-green-500 border-2 border-white'
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
											<User className='mr-2 h-4 w-4' />
											<span>{t('profile')}</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => router.push('/bookings')}
											className='cursor-pointer'
										>
											<Settings className='mr-2 h-4 w-4' />
											<span>{t('my-bookings')}</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => router.push('/help')}
											className='cursor-pointer'
										>
											<User className='mr-2 h-4 w-4' />
											<span>{t('Help-center')}</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
								<DropdownMenuSeparator />
							<DropdownMenuItem
										onClick={logout}
										className='cursor-pointer text-red-600 focus:text-red-600'
									>
										<LogOut className='mr-2 h-4 w-4' />
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
									{t('sign-up')}
									</Button>
								</Link>
							</div>
						)}
						{/* Mobile menu */}
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon' className='md:hidden ml-1'>
									<Menu className='h-5 w-5' />
									<span className='sr-only'>Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='left' className='flex flex-col h-full'>
								<div className='flex items-center gap-2 mb-6 mt-2'>
									<div className='relative h-10 w-10 overflow-hidden rounded-full'>
										<Image src='/images/logo.jpg' alt='logo' fill className='object-cover' />
									</div>
									<span className='text-lg font-semibold'>{t('homestay')}</span>
								</div>

								{/* Mobile search form */}
								<form onSubmit={handleSearch} className='space-y-4 mb-6'>
									<div className='space-y-2'>
										<label className='text-sm font-medium'>Location</label>
										<Input
											type='text'
											placeholder='Where are you going?'
											value={location}
											onChange={(e) => setLocation(e.target.value)}
											className='w-full'
										/>
									</div>

									<div className='space-y-2'>
										<label className='text-sm font-medium'>{t('check-dates')}</label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant='outline'
													className='w-full justify-start text-left font-normal'
												>
													<CalendarIcon className='mr-2 h-4 w-4' />
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
											<div className='h-4 w-4 border-t-2 border-white rounded-full animate-spin mr-2' />
										) : (
											<Search className='w-4 h-4 mr-2' />
										)}
										{t('search')}
									</Button>
								</form>
								{/* Mobile navigation */}
								<nav className='space-y-1 mb-6'>
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
						{/* <div className="w-full mt-4">
        					<AmenityList />
    					</div> */}
			</div>
		</header>
	);
};

export default Header;
