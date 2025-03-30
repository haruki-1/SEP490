import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/components/ui/button';
import { Checkbox } from '@/components/components/ui/checkbox';
import { Slider } from '@/components/components/ui/slider';
import {
	Car,
	Star,
	Wifi,
	PocketIcon as Pool,
	Trash2,
	Pencil,
	Calendar,
	List,
	Grid,
	Coffee,
	Utensils,
	Tv,
	X,
	Filter,
	Search,
	Loader,
	FilterX,
	Eye,
	Lock,
	AlertCircle,
	RefreshCw,
} from 'lucide-react';
import { Label } from '@/components/components/ui/label';
import Link from 'next/link';
import { deleteHomeStay } from '@/pages/api/homestay/deleteHomeStay';
import Swal from 'sweetalert2';
import AdminLayout from '../layout';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/components/ui/dialog';
import { Input } from '@/components/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { getAllFacility } from '@/pages/api/facility/getFacility';
import { addHomeStayFacility } from '@/pages/api/homestay/createHomeStayFacility';
import { deleteHomeStayFacility } from '@/pages/api/homestay/deleteHomeStayFacility';
import { getAllAmenity } from '@/pages/api/amenity/getAmenity';
import { addHomeStayAmenity } from '@/pages/api/homestay/createHomeStayAmenity';
import { deleteHomeStayAmenity } from '@/pages/api/homestay/deleteHomeStayAmenity';
import { getHomeStayDetail } from '@/pages/api/homestay/getHomeStayDetail';
import { Badge } from '@/components/components/ui/badge';
import { getHomeStayByUser } from '@/pages/api/booking/bookingByUser';
import { useAuth } from '@/context/AuthProvider';
import { addTTLockAccount } from '@/pages/api/ttlock/addTTLockAccount';
import { getTTLockUserLocks } from '@/pages/api/ttlock/getTTLockUserLocks';
import TTLockUserLocksDialog from '@/components/TTLockUserLocksDialog';
import { editTTLockAccount } from '@/pages/api/ttlock/editTTLockAccount';

const Homestay = () => {
	const queryClient = useQueryClient();
	const { dataProfile } = useAuth();
	const [selectedHomeStayID, setSelectedHomeStayID] = useState(null);
	const [editTTLockDialog, setEditTTLockDialog] = useState({
		isOpen: false,
		homeStayID: null,
		ttLockUserName: '',
		password: '',
	});

	const editTTLockMutation = useMutation({
		mutationFn: editTTLockAccount,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			Swal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'TTLock account updated successfully.',
				timer: 1500,
				showConfirmButton: false,
			});
			setEditTTLockDialog({
				isOpen: false,
				homeStayID: null,
				ttLockUserName: '',
				password: '',
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to update TTLock account: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const openEditTTLockDialog = (homeStay) => {
		setEditTTLockDialog({
			isOpen: true,
			homeStayID: homeStay.id,
			ttLockUserName: typeof homeStay.tTlockAccuont?.userName === 'string' ? homeStay.tTlockAccuont.userName : '',
			password: '',
		});
	};

	// Update the handleEditTTLockSubmit function
	const handleEditTTLockSubmit = () => {
		const { homeStayID, ttLockUserName, password } = editTTLockDialog;

		if (!ttLockUserName) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Username is required.',
			});
			return;
		}

		// Make sure all values are strings to avoid [object Object] in the payload
		const payload = {
			TTLockUserName: String(ttLockUserName),
			Password: password ? String(password) : '',
			HomeStayID: String(homeStayID),
		};

		console.log('Data to be sent:', payload);

		editTTLockMutation.mutate(payload);
	};

	const [userLocksDialog, setUserLocksDialog] = useState({
		isOpen: false,
		locks: [],
	});

	const [filters, setFilters] = useState({
		amenityNames: [],
		priceRange: [0, 1000],
		standard: [],
		searchText: '',
	});

	const [isFilterExpanded, setIsFilterExpanded] = useState(true);
	const [activeFiltersCount, setActiveFiltersCount] = useState(0);

	const [facilityDialog, setFacilityDialog] = useState({
		isOpen: false,
		homestayId: null,
		facilityId: '',
		quantity: 1,
	});

	const [manageFacilitiesDialog, setManageFacilitiesDialog] = useState({
		isOpen: false,
		homestayId: null,
	});

	const [amenityDialog, setAmenityDialog] = useState({
		isOpen: false,
		homestayId: null,
		selectedAmenities: [],
	});

	const [manageAmenitiesDialog, setManageAmenitiesDialog] = useState({
		isOpen: false,
		homestayId: null,
	});

	// Fetch facility data from API
	const { data: facilities, isLoading: facilitiesLoading } = useQuery({
		queryKey: ['facilities'],
		queryFn: getAllFacility,
	});

	// Fetch homestay details for facilities
	const { data: selectedHomestay, isLoading: detailsLoading } = useQuery({
		queryKey: ['homeStayDetail', manageFacilitiesDialog.homestayId || manageAmenitiesDialog.homestayId],
		queryFn: () => getHomeStayDetail(manageFacilitiesDialog.homestayId || manageAmenitiesDialog.homestayId),
		enabled: !!(
			(manageFacilitiesDialog.homestayId && manageFacilitiesDialog.isOpen) ||
			(manageAmenitiesDialog.homestayId && manageAmenitiesDialog.isOpen)
		),
	});

	// Fetch amenity data from API
	const { data: amenities, isLoading: amenitiesLoading } = useQuery({
		queryKey: ['amenity'],
		queryFn: getAllAmenity,
	});

	const {
		data,
		isLoading,
		refetch: refetchHomeStays,
		error,
	} = useQuery({
		queryKey: ['homeStaysByUser', dataProfile?.id],
		queryFn: () => getHomeStayByUser(dataProfile?.id),
		enabled: !!dataProfile?.id,
	});

	// Update active filters count
	useEffect(() => {
		let count = 0;
		if (filters.amenityNames.length > 0) count++;
		if (filters.standard.length > 0) count++;
		if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
		if (filters.searchText) count++;
		setActiveFiltersCount(count);
	}, [filters]);

	const handleCheckboxChange = (value, category) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[category]: prevFilters[category].includes(value)
				? prevFilters[category].filter((item) => item !== value)
				: [...prevFilters[category], value],
		}));
	};

	const handlePriceChange = (value) => {
		setFilters((prevFilters) => ({ ...prevFilters, priceRange: value }));
	};

	const handleSearchChange = (e) => {
		setFilters((prevFilters) => ({ ...prevFilters, searchText: e.target.value }));
	};

	const clearFilters = () => {
		setFilters({
			amenityNames: [],
			priceRange: [0, 1000],
			standard: [],
			searchText: '',
		});
	};

	const toggleFilter = () => {
		setIsFilterExpanded(!isFilterExpanded);
	};

	const homestay = data;

	const currentDate = new Date().toISOString().slice(0, 10);

	const getPriceForToday = (calendar) => {
		// If no calendar array or empty, return null (Decommission)
		if (!calendar || calendar.length === 0) return null;

		// Find today's price entry
		const todayPrice = calendar.find((item) => item.date.slice(0, 10) === currentDate);

		// If there's no calendar entry for today, check if all calendar entries are expired
		if (!todayPrice) {
			// Check if all calendar entries are in the past
			const allExpired = calendar.every((item) => {
				const entryDate = new Date(item.date.slice(0, 10));
				const today = new Date(currentDate);
				return entryDate < today;
			});

			// If all entries are expired, return null (Decommission)
			if (allExpired) return null;

			// If there's no entry for today but some future entries exist,
			// find the next valid entry (first future date)
			const futureEntries = calendar
				.filter((item) => {
					const entryDate = new Date(item.date.slice(0, 10));
					const today = new Date(currentDate);
					return entryDate >= today;
				})
				.sort((a, b) => new Date(a.date) - new Date(b.date));

			// Return the price of the next valid date or null if none found
			return futureEntries.length > 0 ? futureEntries[0].price : null;
		}

		// If there's a calendar entry for today, return its price
		return todayPrice.price;
	};

	const deleteMutation = useMutation({
		mutationFn: deleteHomeStay,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'The homestay has been deleted.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: () => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Failed to delete homestay. Please try again.',
			});
		},
	});

	const facilityMutation = useMutation({
		mutationFn: addHomeStayFacility,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			queryClient.invalidateQueries(['homeStayDetail', facilityDialog.homestayId]);
			setFacilityDialog({ isOpen: false, homestayId: null, facilityId: '', quantity: 1 });
			Swal.fire({
				icon: 'success',
				title: 'Added!',
				text: 'Facility has been added to the homestay.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to add facility: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const deleteFacilityMutation = useMutation({
		mutationFn: ({ homeStayID, facilityID }) => deleteHomeStayFacility(homeStayID, facilityID),
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			queryClient.invalidateQueries(['homeStayDetail', manageFacilitiesDialog.homestayId]);
			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'Facility has been removed from the homestay.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to delete facility: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const amenityMutation = useMutation({
		mutationFn: addHomeStayAmenity,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			queryClient.invalidateQueries(['homeStayDetail', amenityDialog.homestayId]);
			setAmenityDialog({ isOpen: false, homestayId: null, selectedAmenities: [] });
			Swal.fire({
				icon: 'success',
				title: 'Added!',
				text: 'Amenities have been added to the homestay.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to add amenities: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const deleteAmenityMutation = useMutation({
		mutationFn: ({ homeStayID, amenityID }) => deleteHomeStayAmenity(homeStayID, amenityID),
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			queryClient.invalidateQueries(['homeStayDetail', manageAmenitiesDialog.homestayId]);
			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'Amenity has been removed from the homestay.',
				timer: 1500,
				showConfirmButton: false,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to delete amenity: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const handleDelete = (homeStayID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "This action can't be undone!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMutation.mutate(homeStayID);
			}
		});
	};

	const openFacilityDialog = (homestayId) => {
		setFacilityDialog({
			isOpen: true,
			homestayId,
			facilityId: '',
			quantity: 1,
		});
	};

	const openManageFacilitiesDialog = (homestayId) => {
		setManageFacilitiesDialog({
			isOpen: true,
			homestayId,
		});
	};

	const openManageAmenitiesDialog = (homestayId) => {
		setManageAmenitiesDialog({
			isOpen: true,
			homestayId,
		});
	};

	const openAmenityDialog = (homestayId) => {
		setAmenityDialog({
			isOpen: true,
			homestayId,
			selectedAmenities: [],
		});
	};

	const handleFacilitySubmit = () => {
		const { homestayId, facilityId, quantity } = facilityDialog;

		if (!facilityId) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please select a facility.',
			});
			return;
		}

		facilityMutation.mutate({
			homeStayID: homestayId,
			facilityID: facilityId,
			quantity: Number(quantity),
		});
	};

	const handleDeleteFacility = (homeStayID, facilityID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "This action can't be undone!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteFacilityMutation.mutate({ homeStayID, facilityID });
			}
		});
	};

	const handleDeleteAmenity = (homeStayID, amenityID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "This action can't be undone!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteAmenityMutation.mutate({ homeStayID, amenityID });
			}
		});
	};

	const handleAmenitySubmit = () => {
		const { homestayId, selectedAmenities } = amenityDialog;

		if (selectedAmenities.length === 0) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please select at least one amenity.',
			});
			return;
		}

		amenityMutation.mutate({
			homeStayID: homestayId,
			amenityName: selectedAmenities,
		});
	};

	const handleAmenitySelect = (amenityName) => {
		setAmenityDialog((prev) => {
			const isSelected = prev.selectedAmenities.includes(amenityName);
			return {
				...prev,
				selectedAmenities: isSelected
					? prev.selectedAmenities.filter((name) => name !== amenityName)
					: [...prev.selectedAmenities, amenityName],
			};
		});
	};

	// Function to get facility name by ID
	const getFacilityName = (facilityID) => {
		if (!facilities) return 'Loading...';
		const facility = facilities.find((f) => f.id === facilityID);
		return facility ? facility.name : 'Unknown Facility';
	};

	// Function to get amenity icon
	const getAmenityIcon = (name) => {
		const lowercaseName = name.toLowerCase();
		if (lowercaseName.includes('wifi')) return <Wifi className='w-4 h-4' />;
		if (lowercaseName.includes('parking')) return <Car className='w-4 h-4' />;
		if (lowercaseName.includes('pool') || lowercaseName.includes('swimming')) return <Pool className='w-4 h-4' />;
		if (lowercaseName.includes('breakfast') || lowercaseName.includes('coffee'))
			return <Coffee className='w-4 h-4' />;
		if (lowercaseName.includes('tv') || lowercaseName.includes('television')) return <Tv className='w-4 h-4' />;
		if (lowercaseName.includes('kitchen') || lowercaseName.includes('cooking'))
			return <Utensils className='w-4 h-4' />;
		return <Star className='w-4 h-4' />;
	};

	const [ttLockDialog, setTTLockDialog] = useState({
		isOpen: false,
		homeStayID: null,
		ttLockUserName: '',
		password: '',
	});

	const ttLockMutation = useMutation({
		mutationFn: addTTLockAccount,
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			Swal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'TTLock account added successfully.',
				timer: 1500,
				showConfirmButton: false,
			});
			setTTLockDialog({
				isOpen: false,
				homeStayID: null,
				ttLockUserName: '',
				password: '',
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to add TTLock account: ${error.message || 'Please try again.'}`,
			});
		},
	});

	const openTTLockDialog = (homeStayID) => {
		setTTLockDialog({
			isOpen: true,
			homeStayID,
			ttLockUserName: '',
			password: '',
		});
	};

	const handleTTLockSubmit = () => {
		const { homeStayID, ttLockUserName, password } = ttLockDialog;

		if (!ttLockUserName || !password) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Please fill in all fields.',
			});
			return;
		}

		ttLockMutation.mutate({
			ttLockUserName,
			password,
			homeStayID,
		});
	};

	const ttLockUserLocksQuery = useMutation({
		mutationFn: (homeStayID) => getTTLockUserLocks(homeStayID),
		onSuccess: (data) => {
			setUserLocksDialog({
				isOpen: true,
				locks: data.data,
			});
		},
		onError: (error) => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: `Failed to fetch TTLock user locks: ${error.message}`,
			});
		},
	});

	return (
		<AdminLayout>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center'>
					<h1 className='text-2xl font-bold'>Homestay List</h1>
					{activeFiltersCount > 0 && (
						<Badge className='ml-2 bg-black'>
							{activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} active
						</Badge>
					)}
				</div>
				<Link href='/manager/homestay/create'>
					<Button>Create Homestay</Button>
				</Link>
			</div>

			{/* Filter section */}
			<div className='mb-6 overflow-hidden bg-white rounded-lg shadow-md'>
				<div className='flex items-center justify-between p-4 border-b cursor-pointer' onClick={toggleFilter}>
					<div className='flex items-center'>
						<Filter className='w-5 h-5 mr-2' />
						<h2 className='text-xl font-semibold'>Filters</h2>
					</div>
					<button className='text-gray-500 hover:text-gray-700'>
						{isFilterExpanded ? (
							<X className='w-5 h-5' />
						) : (
							<span className='text-sm'>
								{activeFiltersCount > 0 ? `${activeFiltersCount} active` : 'Show'}
							</span>
						)}
					</button>
				</div>

				{isFilterExpanded && (
					<div className='p-6'>
						{/* Search */}
						<div className='mb-6'>
							<div className='relative'>
								<Search className='absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
								<Input
									className='pl-10'
									placeholder='Search by name or location'
									value={filters.searchText}
									onChange={handleSearchChange}
								/>
							</div>
						</div>

						{/* Price Range */}
						<div className='mb-6'>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-lg font-medium'>Price Range</h3>
								<span className='text-sm text-gray-500'>
									${filters.priceRange[0]} - ${filters.priceRange[1]}
								</span>
							</div>
							<Slider
								min={0}
								max={1000}
								step={50}
								value={filters.priceRange}
								onValueChange={handlePriceChange}
								className='w-full'
							/>
							<div className='flex justify-between mt-2 text-sm text-gray-600'>
								<span>$0</span>
								<span>$1000</span>
							</div>
						</div>

						{/* Amenities */}
						<div className='mb-6'>
							<h3 className='mb-3 text-lg font-medium'>Amenities</h3>
							{amenitiesLoading ? (
								<div className='p-4 text-center'>Loading amenities...</div>
							) : amenities && amenities.length > 0 ? (
								<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6'>
									{amenities.map((amenity) => (
										<button
											key={amenity.id}
											className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
												filters.amenityNames.includes(amenity.name)
													? 'bg-primary/10 border-primary'
													: 'bg-gray-50 border-gray-200 hover:border-gray-300'
											} transition-colors`}
											onClick={() => handleCheckboxChange(amenity.name, 'amenityNames')}
										>
											<div
												className={`mb-1 ${
													filters.amenityNames.includes(amenity.name)
														? 'text-primary'
														: 'text-gray-500'
												}`}
											>
												{getAmenityIcon(amenity.name)}
											</div>
											<span
												className={`text-xs font-medium ${
													filters.amenityNames.includes(amenity.name)
														? 'text-primary'
														: 'text-gray-700'
												}`}
											>
												{amenity.name}
											</span>
										</button>
									))}
								</div>
							) : (
								<p className='text-center text-gray-500'>No amenities available</p>
							)}
						</div>

						{/* Standard/Rating */}
						<div className='mb-4'>
							<h3 className='mb-3 text-lg font-medium'>Rating</h3>
							<div className='flex flex-wrap gap-2'>
								{[1, 2, 3, 4, 5].map((rating) => (
									<button
										key={rating}
										className={`flex items-center px-4 py-2 rounded-full text-sm transition-colors ${
											filters.standard.includes(rating)
												? 'bg-primary text-white'
												: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
										}`}
										onClick={() => handleCheckboxChange(rating, 'standard')}
									>
										<Star
											className={`w-4 h-4 mr-1 ${
												filters.standard.includes(rating) ? 'fill-white' : ''
											}`}
										/>
										<span>
											{rating} {rating === 1 ? 'Star' : 'Stars'}
										</span>
									</button>
								))}
							</div>
						</div>

						{/* Filter actions */}
						<div className='flex justify-end mt-6'>
							<Button
								variant='outline'
								className='mr-2'
								onClick={clearFilters}
								disabled={activeFiltersCount === 0}
							>
								Clear Filters
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Results section */}
			{isLoading ? (
				<div className='flex items-center justify-center rounded-lg h-80 bg-gray-50'>
					<div className='flex flex-col items-center space-y-3'>
						<Loader className='w-8 h-8 text-primary animate-spin' />
						<p className='font-medium text-gray-600'>Loading homestays...</p>
					</div>
				</div>
			) : error ? (
				<div className='flex items-center justify-center rounded-lg h-80 bg-red-50'>
					<div className='flex flex-col items-center space-y-3'>
						<AlertCircle className='w-10 h-10 text-red-500' />
						<p className='font-medium text-red-600'>Error: {error.message}</p>
						<Button variant='outline' onClick={() => window.location.reload()}>
							<RefreshCw className='w-4 h-4 mr-2' /> Try Again
						</Button>
					</div>
				</div>
			) : homestay?.length === 0 ? (
				<div className='flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm h-80'>
					<Search className='w-12 h-12 mb-4 text-gray-300' />
					<p className='mb-3 text-xl font-semibold text-gray-700'>No homestays found</p>
					<p className='max-w-md mb-6 text-center text-gray-500'>
						Try adjusting your filters or broadening your search criteria
					</p>
					<Button onClick={clearFilters} disabled={activeFiltersCount === 0} className='px-6'>
						<FilterX className='w-4 h-4 mr-2' /> Clear All Filters
					</Button>
				</div>
			) : (
				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{homestay?.map((homeStay) => {
						const priceForToday = getPriceForToday(homeStay.calendar);

						return (
							<>
								<div
									key={homeStay.id}
									className='group relative h-[420px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
								>
									{/* Card Front */}
									<div className='absolute inset-0 z-10 w-full h-full overflow-hidden transition-all duration-500 ease-in-out transform rounded-xl group-hover:opacity-0 group-hover:scale-95'>
										{/* Main Image */}
										<div className='relative w-full h-full'>
											<img
												src={homeStay?.mainImage}
												alt={homeStay.name}
												className='object-cover w-full h-full rounded-xl'
											/>

											{/* Overlay Gradient */}
											<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl'></div>

											{/* Status Tags */}
											<div className='absolute top-0 left-0 right-0 flex items-start justify-between p-4'>
												{homeStay?.isDeleted === true && (
													<span className='px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-red-500 rounded-full shadow-lg'>
														Deleted
													</span>
												)}
												<div className='ml-auto'>
													<span className='px-3 py-1 text-xs font-bold tracking-wider text-white uppercase rounded-full shadow-lg bg-blue-500/90'>
														{homeStay?.openIn}
													</span>
												</div>
											</div>

											{/* Content at Bottom */}
											<div className='absolute bottom-0 left-0 right-0 p-5'>
												<h2 className='mb-2 text-2xl font-bold text-white'>{homeStay.name}</h2>
												<div className='flex items-center mb-1'>
													{[...Array(5)].map((_, index) => (
														<svg
															key={index}
															className={`w-5 h-5 ${
																homeStay.standar > index
																	? 'text-yellow-400'
																	: 'text-gray-400/50'
															}`}
															fill='currentColor'
															viewBox='0 0 20 20'
														>
															<path d='M10 15l-5.09 3.09 1.64-6.88L0 6.91l6.91-.59L10 0l2.09 6.32 6.91.59-4.55 4.3 1.64 6.88L10 15z' />
														</svg>
													))}
													<span className='ml-2 text-sm text-white'>
														{homeStay.standar} out of 5
													</span>
												</div>
												<p className='text-sm truncate text-white/80'>
													{homeStay.address}, {homeStay.city}
												</p>
											</div>
										</div>
									</div>

									{/* Card Back (Details) */}
									<div className='absolute inset-0 z-20 flex flex-col w-full h-full p-5 transition-all duration-500 ease-in-out transform bg-white opacity-0 rounded-xl group-hover:opacity-100 group-hover:scale-100'>
										<div className='flex-1'>
											<h2 className='mb-2 text-xl font-semibold text-gray-800'>
												{homeStay.name}
											</h2>
											<p className='mb-4 text-gray-600'>
												{homeStay.address}, {homeStay.city}
											</p>

											<div className='p-3 mb-4 rounded-lg bg-gray-50'>
												<div className='flex items-center justify-between'>
													<span className='font-medium text-gray-700'>Today's Rate:</span>
													{priceForToday !== null ? (
														<span className='text-xl font-bold text-green-600'>
															${priceForToday}
														</span>
													) : (
														<span className='px-2 py-1 text-sm text-red-600 bg-red-100 rounded'>
															Not Available
														</span>
													)}
												</div>
											</div>
										</div>

										{/* Actions Section */}
										<div className='mt-2 space-y-3'>
											<Link href={`/manager/homestay/${homeStay.id}`} className='block'>
												<Button className='w-full font-medium'>
													<Eye className='w-4 h-4 mr-2' /> View Details
												</Button>
											</Link>

											<div className='grid grid-cols-7 gap-2'>
												<Link
													href={`/manager/homestay/edit/${homeStay.id}`}
													className='col-span-1'
												>
													<Button
														className='w-full bg-emerald-500 hover:bg-emerald-600'
														title='Edit'
														disabled={homeStay?.isDeleted === true}
													>
														<Pencil className='w-4 h-4' />
													</Button>
												</Link>

												<Button
													variant='destructive'
													className='col-span-1'
													onClick={() => handleDelete(homeStay.id)}
													disabled={homeStay?.isDeleted === true}
													title='Delete'
												>
													<Trash2 className='w-4 h-4' />
												</Button>

												<Button
													variant='outline'
													className='col-span-1'
													onClick={() => openManageFacilitiesDialog(homeStay.id)}
													disabled={homeStay?.isDeleted === true}
													title='Manage Facilities'
												>
													<List className='w-4 h-4' />
												</Button>

												<Button
													variant='outline'
													className='col-span-1'
													onClick={() => openManageAmenitiesDialog(homeStay.id)}
													disabled={homeStay?.isDeleted === true}
													title='Manage Amenities'
												>
													<Grid className='w-4 h-4' />
												</Button>

												<Link
													href={`/manager/homestay/calendar/${homeStay.id}`}
													className='col-span-1'
												>
													<Button
														variant='outline'
														className='w-full'
														disabled={homeStay?.isDeleted === true}
														title='Manage Calendar'
													>
														<Calendar className='w-4 h-4' />
													</Button>
												</Link>

												{homeStay.tTlockAccuont.length > 0 ? (
													<Button
														variant='outline'
														className='col-span-1'
														onClick={() => {
															setSelectedHomeStayID(homeStay.id);
															ttLockUserLocksQuery.mutate(homeStay.id);
														}}
														disabled={
															homeStay?.isDeleted === true ||
															ttLockUserLocksQuery.isLoading
														}
														title='Show TTLock Locks'
													>
														<Lock className='w-4 h-4' />
														{ttLockUserLocksQuery.isLoading && (
															<Loader className='w-4 h-4 ml-2 animate-spin' />
														)}
													</Button>
												) : (
													<Button
														variant='outline'
														className='col-span-1'
														onClick={() => openTTLockDialog(homeStay.id)}
														disabled={homeStay?.isDeleted === true}
														title='Add TTLock Account'
													>
														<Lock className='w-4 h-4' />
													</Button>
												)}
												<Button
													variant='outline'
													className='col-span-1'
													onClick={() => openEditTTLockDialog(homeStay)}
													disabled={homeStay?.isDeleted === true}
													title='Edit TTLock Account'
												>
													<Pencil className='w-4 h-4' />
												</Button>

												<Dialog
													open={editTTLockDialog.isOpen}
													onOpenChange={(open) =>
														setEditTTLockDialog((prev) => ({ ...prev, isOpen: open }))
													}
												>
													<DialogContent className='sm:max-w-md'>
														<DialogHeader>
															<DialogTitle>Edit TTLock Account</DialogTitle>
															<DialogDescription>
																Update your TTLock account credentials for this
																homestay.
															</DialogDescription>
														</DialogHeader>
														<div className='grid gap-4 py-4'>
															<div className='grid items-center grid-cols-4 gap-4'>
																<Label
																	htmlFor='editTTLockUsername'
																	className='text-right'
																>
																	Username
																</Label>
																<Input
																	id='editTTLockUsername'
																	value={editTTLockDialog.ttLockUserName}
																	onChange={(e) =>
																		setEditTTLockDialog((prev) => ({
																			...prev,
																			ttLockUserName: e.target.value,
																		}))
																	}
																	className='col-span-3'
																	placeholder='Enter TTLock username'
																/>
															</div>
															<div className='grid items-center grid-cols-4 gap-4'>
																<Label
																	htmlFor='editTTLockPassword'
																	className='text-right'
																>
																	New Password
																</Label>
																<Input
																	id='editTTLockPassword'
																	type='password'
																	value={editTTLockDialog.password}
																	onChange={(e) =>
																		setEditTTLockDialog((prev) => ({
																			...prev,
																			password: e.target.value,
																		}))
																	}
																	className='col-span-3'
																	placeholder='Enter new password (optional)'
																/>
															</div>
														</div>
														<DialogFooter>
															<Button
																type='submit'
																onClick={handleEditTTLockSubmit}
																disabled={editTTLockMutation.isLoading}
															>
																{editTTLockMutation.isLoading
																	? 'Updating...'
																	: 'Update Account'}
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>

												<TTLockUserLocksDialog
													isOpen={userLocksDialog.isOpen}
													onOpenChange={(open) =>
														setUserLocksDialog((prev) => ({ ...prev, isOpen: open }))
													}
													locks={userLocksDialog.locks}
													homeStayID={selectedHomeStayID}
												/>
											</div>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</div>
			)}

			<Dialog
				open={ttLockDialog.isOpen}
				onOpenChange={(open) => setTTLockDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Add TTLock Account</DialogTitle>
						<DialogDescription>Enter your TTLock account credentials for this homestay.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='ttLockUsername' className='text-right'>
								Username
							</Label>
							<Input
								id='ttLockUsername'
								value={ttLockDialog.ttLockUserName}
								onChange={(e) =>
									setTTLockDialog((prev) => ({
										...prev,
										ttLockUserName: e.target.value,
									}))
								}
								className='col-span-3'
								placeholder='Enter TTLock username'
							/>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='ttLockPassword' className='text-right'>
								Password
							</Label>
							<Input
								id='ttLockPassword'
								type='password'
								value={ttLockDialog.password}
								onChange={(e) =>
									setTTLockDialog((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								className='col-span-3'
								placeholder='Enter TTLock password'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleTTLockSubmit} disabled={ttLockMutation.isLoading}>
							{ttLockMutation.isLoading ? 'Adding...' : 'Add Account'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Dialogs (unchanged) */}
			{/* Add Facility Dialog */}
			<Dialog
				open={facilityDialog.isOpen}
				onOpenChange={(open) => setFacilityDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Add Facility to Homestay</DialogTitle>
						<DialogDescription>
							Select a facility and enter the quantity to add to this homestay.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='facility' className='text-right'>
								Facility
							</Label>
							<div className='col-span-3'>
								<Select
									value={facilityDialog.facilityId}
									onValueChange={(value) =>
										setFacilityDialog((prev) => ({ ...prev, facilityId: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a facility' />
									</SelectTrigger>
									<SelectContent>
										{facilitiesLoading ? (
											<SelectItem value='' disabled>
												Loading facilities...
											</SelectItem>
										) : facilities && facilities.length > 0 ? (
											facilities.map((facility) => (
												<SelectItem key={facility.id} value={facility.id}>
													{facility.name}
												</SelectItem>
											))
										) : (
											<SelectItem value='' disabled>
												No facilities available
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='quantity' className='text-right'>
								Quantity
							</Label>
							<Input
								id='quantity'
								type='number'
								min='1'
								value={facilityDialog.quantity}
								onChange={(e) => setFacilityDialog((prev) => ({ ...prev, quantity: e.target.value }))}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleFacilitySubmit} disabled={facilityMutation.isLoading}>
							{facilityMutation.isLoading ? 'Adding...' : 'Add Facility'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Manage Facilities Dialog */}
			<Dialog
				open={manageFacilitiesDialog.isOpen}
				onOpenChange={(open) => setManageFacilitiesDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Manage Facilities</DialogTitle>
						<DialogDescription>View and remove facilities from this homestay.</DialogDescription>
					</DialogHeader>
					<div className='py-4'>
						{detailsLoading ? (
							<p className='py-4 text-center'>Loading facilities...</p>
						) : !selectedHomestay?.facility || selectedHomestay.facility.length === 0 ? (
							<p className='py-4 text-center text-gray-500'>No facilities added to this homestay yet.</p>
						) : (
							<div className='space-y-2 overflow-y-auto max-h-60'>
								{selectedHomestay.facility.map((facility) => (
									<div
										key={facility.facilityID}
										className='flex items-center justify-between p-3 rounded-lg bg-gray-50'
									>
										<div>
											<p className='font-medium'>{facility.name}</p>
											{facility.description && (
												<p className='text-sm text-gray-500'>{facility.description}</p>
											)}
										</div>
										<Button
											variant='ghost'
											size='icon'
											className='text-red-500 hover:text-red-700 hover:bg-red-50'
											onClick={() =>
												handleDeleteFacility(
													manageFacilitiesDialog.homestayId,
													facility.facilityID
												)
											}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
					<DialogFooter>
						<Button
							onClick={() => {
								setManageFacilitiesDialog((prev) => ({ ...prev, isOpen: false }));
								openFacilityDialog(manageFacilitiesDialog.homestayId);
							}}
						>
							Add New Facility
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Amenity Dialog */}
			<Dialog
				open={amenityDialog.isOpen}
				onOpenChange={(open) => setAmenityDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Add Amenities to Homestay</DialogTitle>
						<DialogDescription>Select the amenities you want to add to this homestay.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label className='mb-2'>Available Amenities</Label>
							{amenitiesLoading ? (
								<p className='text-sm text-gray-500'>Loading amenities...</p>
							) : amenities && amenities.length > 0 ? (
								<div className='grid grid-cols-2 gap-2'>
									{amenities.map((amenity) => (
										<div key={amenity.id} className='flex items-center space-x-2'>
											<Checkbox
												id={`amenity-${amenity.id}`}
												checked={amenityDialog.selectedAmenities.includes(amenity.name)}
												onCheckedChange={() => handleAmenitySelect(amenity.name)}
											/>
											<Label htmlFor={`amenity-${amenity.id}`} className='text-sm cursor-pointer'>
												{amenity.name}
											</Label>
										</div>
									))}
								</div>
							) : (
								<p className='text-sm text-gray-500'>No amenities available</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleAmenitySubmit} disabled={amenityMutation.isLoading}>
							{amenityMutation.isLoading ? 'Adding...' : 'Add Amenities'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Manage Amenities Dialog */}
			<Dialog
				open={manageAmenitiesDialog.isOpen}
				onOpenChange={(open) => setManageAmenitiesDialog((prev) => ({ ...prev, isOpen: open }))}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Manage Amenities</DialogTitle>
						<DialogDescription>View and remove amenities from this homestay.</DialogDescription>
					</DialogHeader>
					<div className='py-4'>
						{detailsLoading ? (
							<p className='py-4 text-center'>Loading amenities...</p>
						) : !selectedHomestay?.amenities || selectedHomestay.amenities.length === 0 ? (
							<p className='py-4 text-center text-gray-500'>No amenities added to this homestay yet.</p>
						) : (
							<div className='space-y-2 overflow-y-auto max-h-60'>
								{selectedHomestay.amenities.map((amenity) => (
									<div
										key={amenity.id}
										className='flex items-center justify-between p-3 rounded-lg bg-gray-50'
									>
										<div className='flex items-center'>
											{getAmenityIcon(amenity.name)}
											<p className='ml-2 font-medium'>{amenity.name}</p>
										</div>
										<Button
											variant='ghost'
											size='icon'
											className='text-red-500 hover:text-red-700 hover:bg-red-50'
											onClick={() =>
												handleDeleteAmenity(manageAmenitiesDialog.homestayId, amenity.id)
											}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
					<DialogFooter>
						<Button
							onClick={() => {
								setManageAmenitiesDialog((prev) => ({ ...prev, isOpen: false }));
								openAmenityDialog(manageAmenitiesDialog.homestayId);
							}}
						>
							Add New Amenities
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	);
};

export default Homestay;
