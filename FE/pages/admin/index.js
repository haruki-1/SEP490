import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import AdminLayout from './layout';

const Admin = () => {
	const { isAuthenticated, dataProfile } = useAuth();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (!isAuthenticated) {
			window.location.href = '/auth/login';
		}
	}, [isAuthenticated]);

	if (!isClient || !isAuthenticated) {
		return null;
	}

	return <AdminLayout>{dataProfile?.fullName}</AdminLayout>;
};

export default Admin;
