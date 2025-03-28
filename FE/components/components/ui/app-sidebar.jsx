import { usePathname } from 'next/navigation';
import { Bath, Boxes, ChevronUp, Currency, Home, Hotel, Newspaper, PaintRoller, Ticket, User, User2 } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import Image from 'next/image';
import { useAuth } from '@/context/AuthProvider';

const items = [
	{ title: 'Home', url: '/manager', icon: Home },
	{ title: 'Homestay', url: '/manager/homestay', icon: Hotel },
	{ title: 'Facility', url: '/manager/facility', icon: Boxes },
	{ title: 'Amenity', url: '/manager/amenity', icon: Bath },
	// { title: 'Cost', url: '/manager/cost', icon: Currency },
	{ title: 'Posts', url: '/manager/posts', icon: Newspaper },
	{ title: 'Voucher', url: '/manager/voucher', icon: Ticket },
	// { title: 'Cleaning', url: '/manager/cleaning', icon: PaintRoller },
	{ title: 'Account', url: '/manager/profile', icon: User },
];

export function AppSidebar() {
	const { logout, dataProfile } = useAuth();
	const pathname = usePathname();

	console.log(dataProfile);

	return (
		<Sidebar className='z-0'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='text-base'>Manager Homestay</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const isActive =
									pathname === item.url ||
									(item.url !== '/manager' && pathname?.startsWith(item.url));

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className={`flex items-center gap-2 p-2 rounded-md transition ${
													isActive ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
												}`}
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									{dataProfile ? (
										dataProfile.avatar ? (
											<Image
												src={dataProfile.avatar}
												width={50}
												height={50}
												alt='avt'
												className='object-contain rounded-md size-8'
											/>
										) : (
											<User2 className='size-8' />
										)
									) : (
										<User2 className='size-8' />
									)}

									{dataProfile?.fullName}
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={logout}>
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
