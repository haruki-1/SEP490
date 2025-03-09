import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileNav from './MobileNav';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';
import { useAuth } from '@/context/AuthProvider';

// Define the navigation items with their paths
const NAV_ITEMS = [
	{ href: '/home-stay', label: 'Homestay' },
	{ href: '/posts', label: 'Posts' },
	{ href: '/online-experiences', label: 'Online Experiences' },
];

const Header = () => {
	const router = useRouter();
	const { dataProfile, logout } = useAuth();
	const [location, setLocation] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!location.trim()) return;
		router.push(`/search?location=${location.trim()}`);
		setLocation('');
	};

	const isActivePath = (path) => {
		// Exact match or nested routes (e.g., /home-stay/details)
		return router.pathname === path || router.pathname.startsWith(`${path}/`);
	};

	return (
		<header className='sticky top-0 z-50 w-full bg-white shadow-lg py-2 md:py-4'>
			<div className='container-lg flex justify-between items-center relative'>
				<div className='flex items-center cursor-pointer gap-2' onClick={() => router.push('/')}>
					<Image
						src='/images/logo.jpg'
						alt='logo'
						width={40}
						height={40}
						className='rounded-full shadow-xl border border-slate-500'
					/>
				</div>

				<nav className={`hidden md:flex space-x-8 text-sm font-medium text-gray-600`}>
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`
								transition-colors
								${isActivePath(item.href) ? 'text-blue-500 font-bold' : 'hover:text-blue-500 text-gray-600'}
							`}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className='flex items-center gap-3'>
					<ThemeToggle />
					{dataProfile ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div
									className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100
									text-slate-600 hover:text-slate-600
									`}
								>
									{dataProfile.avatar ? (
										<Image
											src={dataProfile.avatar}
											alt='avatar'
											width={40}
											height={40}
											className='rounded-full object-cover'
										/>
									) : (
										<User className='w-5 h-5' />
									)}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-44'>
								<DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
								<DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href='/auth/register'>
							<Button variant='outline' size='sm'>
								Login/Register
							</Button>
						</Link>
					)}

					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' className='md:hidden'>
								<Menu className='w-5 h-5 text-gray-600' />
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<div className='flex items-center cursor-pointer gap-2' onClick={() => router.push('/')}>
								<Image
									src='/images/logo.jpg'
									alt='logo'
									width={40}
									height={40}
									className='rounded-full shadow-xl border border-slate-500'
								/>
							</div>
							<nav className={`flex md:hidden mt-4 flex-col gap-4 text-sm font-medium text-gray-600`}>
								{NAV_ITEMS.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`
								transition-colors
								${isActivePath(item.href) ? 'text-blue-500 font-bold' : 'hover:text-blue-500 text-gray-600'}
							`}
									>
										{item.label}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};

export default Header;
