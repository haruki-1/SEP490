import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider, SidebarTrigger } from '@/components/components/ui/sidebar';
import { AppSidebar } from '@/components/components/ui/app-sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from '@/components/components/ui/sonner';
import ManagerBreadcrumb from '@/components/ManagerBreadcrumb';

const AdminLayout = ({ children }) => {
	return (
		<div className='flex items-center justify-center bg-gray-100'>
			<Head>
				<title>Runa: Incredible Places to Stay and Things to Do</title>
				<meta
					name='description'
					content='Find holiday rentals, cabins, beach houses, unique homes and experiences around the world – all made possible by Hosts on Airbnb.'
				/>
				<link rel='icon' href='images/logo.svg' />
			</Head>
			<SidebarProvider>
				<AppSidebar />
				<main className='w-full p-3 overflow-x-hidden'>
					<div className='flex items-center gap-2'>
						<SidebarTrigger />
						<ManagerBreadcrumb />
					</div>
					<div className='px-0 py-4'>{children}</div>
					<ToastContainer />
					<Toaster position='top-right' richColors />
				</main>
			</SidebarProvider>
		</div>
	);
};

export default AdminLayout;