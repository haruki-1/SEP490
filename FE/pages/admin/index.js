import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import AdminLayout from './layout';

const Admin = () => {
	const { isAuthenticated, dataProfile } = useAuth();
	const [homestayId, setHomestayId] = useState('');
	const [homestays, setHomestays] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear());
	const [mounted, setMounted] = useState(false);

	const [filters, setFilters] = useState({
		amenityNames: [],
		minPrice: 0,
		maxPrice: 5000000,
		standard: [],
	});

	const {
		data: DataAmenity,
		isLoading: loadingAmenity,
		error: errorAmenity,
	} = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
		enabled: mounted,
	});

	const availableAmenities = DataAmenity?.map((amenity) => amenity.name) || [];

	const standardOptions = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		data: DataHomeStay,
		isLoading: loadingHomeStay,
		refetch: refetchHomeStays,
	} = useQuery({
		queryKey: ['homeStays', filters],
		queryFn: () => getAllHomeStay(filters),
		enabled: mounted && isAuthenticated,
	});

	useEffect(() => {
		if (DataHomeStay && DataHomeStay.length > 0) {
			const formattedHomestays = DataHomeStay.map((homestay) => ({
				id: homestay.homeStayId || homestay.id,
				name: homestay.name || homestay.title || 'Unnamed Homestay',
			}));

			setHomestays(formattedHomestays);

			if (!homestayId && formattedHomestays.length > 0) {
				setHomestayId(formattedHomestays[0].id);
			}
		}
	}, [DataHomeStay, homestayId]);

	const {
		data: revenueData,
		isLoading: isLoadingRevenue,
		error: revenueError,
	} = useQuery({
		queryKey: ['revenueStatistics', homestayId, year],
		queryFn: () => getHomeStayRevenueStatistics(homestayId, year),
		enabled: mounted && isAuthenticated && !!homestayId,
	});

	const isLoading = loadingHomeStay || isLoadingRevenue;

	const handleAmenityChange = (amenity) => {
		setFilters((prev) => {
			const newAmenities = prev.amenityNames.includes(amenity)
				? prev.amenityNames.filter((a) => a !== amenity)
				: [...prev.amenityNames, amenity];

			return { ...prev, amenityNames: newAmenities };
		});
	};

	const handleStandardChange = (standard) => {
		setFilters((prev) => {
			const newStandards = prev.standard.includes(standard)
				? prev.standard.filter((s) => s !== standard)
				: [...prev.standard, standard];

			return { ...prev, standard: newStandards };
		});
	};

	const handleResetFilters = () => {
		setFilters({
			amenityNames: [],
			minPrice: 0,
			maxPrice: 5000000,
			standard: [],
		});
	};

	const applyFilters = () => {
		refetchHomeStays();
	};

	if (!isClient || !isAuthenticated) {
		return null;
	}

	return <AdminLayout>{dataProfile?.fullName}</AdminLayout>;
};

export default Admin;
