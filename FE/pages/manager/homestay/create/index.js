import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { Textarea } from '@/components/components/ui/textarea';
import { ImagePlus, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from 'context/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createHomeStay } from 'pages/api/homestay/createHomeStay';
import { uploadImage } from 'pages/api/image/uploadImage';
import { uploadImages } from 'pages/api/homestay/uploadImageHomeStay';
import ManagerLayout from '../../layout';

const MAX_IMAGES = 8;

// Required fields for the form
const REQUIRED_FIELDS = ['mainImage', 'name', 'description', 'address', 'city', 'checkInTime', 'checkOutTime'];

const CreateHomeStay = () => {
	const { dataProfile } = useAuth();
	const queryClient = useQueryClient();

	const [formData, setFormData] = useState({
		mainImage: '',
		name: '',
		openIn: '',
		description: '',
		standar: 1,
		address: '',
		city: '',
		isBlocked: false,
		checkInTime: '',
		checkOutTime: '',
		images: [],
		price: '',
		isDeleted: false,
		date: '',
	});

	// Add validation state
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const mutation = useMutation({
		mutationFn: (homeStayData) => createHomeStay(dataProfile.id, homeStayData),
		onSuccess: () => {
			queryClient.invalidateQueries(['homeStays']);
			toast.success('Homestay created successfully!');
			setFormData({
				mainImage: '',
				name: '',
				openIn: '',
				description: '',
				standar: 1,
				address: '',
				city: '',
				isBlocked: false,
				checkInTime: '',
				checkOutTime: '',
				images: [],
				price: '',
				isDeleted: false,
				date: '',
			});
			// Reset validation states
			setErrors({});
			setTouched({});
		},
		onError: (error) => {
			console.error('Error from API:', error);
			if (error.message && error.message.includes('Duplicate homestay name')) {
				toast.error('Homestay name already exists. Please choose a different name.');
			} else {
				toast.error(`Failed to create homestay: ${error.message}`);
			}
		},
	});

	// Validate form fields
	const validateField = (name, value) => {
		if (REQUIRED_FIELDS.includes(name) && !value) {
			return 'This field is required';
		}
		if (name === 'price' && value && isNaN(parseFloat(value))) {
			return 'Price must be a number';
		}
		return '';
	};

	// Validate the entire form
	const validateForm = () => {
		const newErrors = {};
		let isValid = true;

		// Check all required fields
		REQUIRED_FIELDS.forEach((field) => {
			const error = validateField(field, formData[field]);
			if (error) {
				newErrors[field] = error;
				isValid = false;
			}
		});

		setErrors(newErrors);
		// Mark all fields as touched during submit
		const allTouched = REQUIRED_FIELDS.reduce((acc, field) => ({ ...acc, [field]: true }), {});
		setTouched(allTouched);

		return isValid;
	};

	const handleSubmit = () => {
		if (!validateForm()) {
			toast.error('Please fill in all required fields');
			return;
		}

		const homeStayData = {
			...formData,
			openIn: formData.openIn ? formData.openIn.getFullYear() : '',
			checkInTime: formData.checkInTime
				? formData.checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				: '',
			checkOutTime: formData.checkOutTime
				? formData.checkOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				: '',
			date: formData.date ? formData.date.toISOString().split('T')[0] : '',
		};

		mutation.mutate(homeStayData);
	};

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		const newValue = type === 'number' ? Number(value) : value;

		setFormData({
			...formData,
			[name]: newValue,
		});

		// Field validation on change
		setErrors({
			...errors,
			[name]: validateField(name, newValue),
		});

		// Mark field as touched
		setTouched({
			...touched,
			[name]: true,
		});
	};

	const handleBlur = (field) => {
		setTouched({
			...touched,
			[field]: true,
		});

		setErrors({
			...errors,
			[field]: validateField(field, formData[field]),
		});
	};

	const handleMainImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				const uploadedImageUrl = await uploadImage(file);
				setFormData((prev) => ({ ...prev, mainImage: uploadedImageUrl.url }));
				// Clear error and set touched
				setErrors({ ...errors, mainImage: '' });
				setTouched({ ...touched, mainImage: true });
				toast.success('Main image uploaded successfully!');
			} catch (error) {
				console.error('Image upload failed:', error);
				toast.error('Failed to upload main image.');
			}
		}
	};

	const handleImagesChange = async (e) => {
		const files = Array.from(e.target.files);
		const remainingSlots = MAX_IMAGES - formData.images.length;
		const filesToAdd = files.slice(0, remainingSlots);

		if (!filesToAdd.length) {
			toast.warning(`You can only add up to ${MAX_IMAGES} images.`);
			return;
		}

		try {
			const response = await uploadImages(filesToAdd);
			console.log('Image upload response:', response);

			if (!response || !response.urls || !Array.isArray(response.urls)) {
				throw new Error('Image upload response is not a valid array of URLs.');
			}

			const imageUrls = response.urls.filter((url) => typeof url === 'string');

			setFormData((prev) => ({
				...prev,
				images: [...prev.images, ...imageUrls],
			}));
			toast.success('Images uploaded successfully!');
		} catch (error) {
			console.error('Image upload failed:', error);
			toast.error('Failed to upload images.');
		}

		if (filesToAdd.length < files.length) {
			toast.warning(`Only ${remainingSlots} image(s) added. Maximum of ${MAX_IMAGES} images allowed.`);
		}
	};

	const handleDeleteImage = (indexToDelete) => {
		setFormData({
			...formData,
			images: formData.images.filter((_, index) => index !== indexToDelete),
		});
	};

	const handleDateChange = (date, field) => {
		setFormData({
			...formData,
			[field]: date,
		});

		// Validate date fields
		if (REQUIRED_FIELDS.includes(field)) {
			setErrors({
				...errors,
				[field]: date ? '' : 'This field is required',
			});

			setTouched({
				...touched,
				[field]: true,
			});
		}
	};

	// Helper function to display required field indicator
	const RequiredIndicator = () => <span className='ml-1 text-red-500'>*</span>;

	// Helper to check if field should show error
	const showError = (field) => touched[field] && errors[field];

	return (
		<ManagerLayout>
			<div className='p-4 space-y-4'>
				<h2 className='text-xl font-bold'>Create Homestay</h2>
				<div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
					<div className='h-full'>
						<Label className='block mb-2 font-medium'>
							Main Image
							<RequiredIndicator />
						</Label>
						<Input type='file' accept='image/*' onChange={handleMainImageChange} className='hidden' />
						<div
							onClick={() => document.querySelector("input[type='file']").click()}
							className={`p-3 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${
								showError('mainImage') ? 'border-red-500' : ''
							}`}
						>
							{formData.mainImage ? (
								<img
									src={formData.mainImage}
									alt='Main'
									className='object-contain w-full rounded-lg h-96'
								/>
							) : (
								<div className='flex items-center justify-center w-full h-96'>
									<ImagePlus
										className={`w-8 h-8 ${
											showError('mainImage') ? 'text-red-500' : 'text-gray-400'
										}`}
									/>
								</div>
							)}
						</div>
						{showError('mainImage') && <p className='mt-1 text-sm text-red-500'>{errors.mainImage}</p>}
					</div>
					<div>
						<Label className='block mb-2 font-medium'>Images</Label>
						<Input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImagesChange}
							className='hidden'
							id='imagesInput'
						/>
						<div className='grid grid-cols-4 gap-4'>
							{formData.images.map((url, index) => (
								<div key={index} className='relative group'>
									<img
										src={url}
										alt={`Preview ${index}`}
										className='object-cover w-full rounded-lg aspect-square'
									/>
									<button
										onClick={() => handleDeleteImage(index)}
										className='absolute p-1 rounded-full opacity-0 top-1 right-1 bg-black/50 group-hover:opacity-100'
									>
										<X className='w-4 h-4 text-white' />
									</button>
								</div>
							))}
							{formData.images.length < MAX_IMAGES && (
								<div
									onClick={() => document.getElementById('imagesInput').click()}
									className='flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer aspect-square hover:bg-gray-50'
								>
									<ImagePlus className='w-8 h-8 text-gray-400' />
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label className='block mb-2 font-medium'>
							Homestay Name
							<RequiredIndicator />
						</Label>
						<Input
							name='name'
							placeholder='Homestay Name'
							value={formData.name}
							onChange={handleChange}
							onBlur={() => handleBlur('name')}
							className={showError('name') ? 'border-red-500' : ''}
						/>
						{showError('name') && <p className='mt-1 text-sm text-red-500'>{errors.name}</p>}
					</div>
					<div className='flex flex-col gap-1'>
						<Label className='block mb-2 font-medium'>Year Opened</Label>
						<DatePicker
							selected={formData.openIn}
							onChange={(date) => handleDateChange(date, 'openIn')}
							showYearPicker
							dateFormat='yyyy'
							placeholderText='Select Year'
							className='w-full px-2 py-1 bg-transparent border rounded'
							withPortal
						/>
					</div>
					<div>
						<Label className='block mb-2 font-medium'>
							Description
							<RequiredIndicator />
						</Label>
						<Textarea
							name='description'
							placeholder='Description'
							value={formData.description}
							onChange={handleChange}
							onBlur={() => handleBlur('description')}
							className={showError('description') ? 'border-red-500' : ''}
						/>
						{showError('description') && <p className='mt-1 text-sm text-red-500'>{errors.description}</p>}
					</div>
					<div>
						<Label className='block mb-2 font-medium'>
							Address
							<RequiredIndicator />
						</Label>
						<Textarea
							name='address'
							placeholder='Address'
							value={formData.address}
							onChange={handleChange}
							onBlur={() => handleBlur('address')}
							className={showError('address') ? 'border-red-500' : ''}
						/>
						{showError('address') && <p className='mt-1 text-sm text-red-500'>{errors.address}</p>}
					</div>
					<div>
						<Label className='block mb-2 font-medium'>Standard (1-5)</Label>
						<Input
							name='standar'
							type='number'
							min={1}
							max={5}
							value={formData.standar}
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label className='block mb-2 font-medium'>
							City
							<RequiredIndicator />
						</Label>
						<Input
							name='city'
							placeholder='City'
							value={formData.city}
							onChange={handleChange}
							onBlur={() => handleBlur('city')}
							className={showError('city') ? 'border-red-500' : ''}
						/>
						{showError('city') && <p className='mt-1 text-sm text-red-500'>{errors.city}</p>}
					</div>
					<div>
						<Label className='block mb-2 font-medium'>
							Check-In Time
							<RequiredIndicator />
						</Label>
						<DatePicker
							selected={formData.checkInTime}
							onChange={(date) => handleDateChange(date, 'checkInTime')}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={15}
							timeCaption='Time'
							dateFormat='h:mm aa'
							placeholderText='Check-In Time'
							className={`w-full px-2 py-1 bg-transparent border rounded ${
								showError('checkInTime') ? 'border-red-500' : ''
							}`}
							withPortal
							onBlur={() => handleBlur('checkInTime')}
						/>
						{showError('checkInTime') && <p className='mt-1 text-sm text-red-500'>{errors.checkInTime}</p>}
					</div>
					<div>
						<Label className='block mb-2 font-medium'>
							Check-Out Time
							<RequiredIndicator />
						</Label>
						<DatePicker
							selected={formData.checkOutTime}
							onChange={(date) => handleDateChange(date, 'checkOutTime')}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={15}
							timeCaption='Time'
							dateFormat='h:mm aa'
							placeholderText='Check-Out Time'
							className={`w-full px-2 py-1 bg-transparent border rounded ${
								showError('checkOutTime') ? 'border-red-500' : ''
							}`}
							withPortal
							onBlur={() => handleBlur('checkOutTime')}
						/>
						{showError('checkOutTime') && (
							<p className='mt-1 text-sm text-red-500'>{errors.checkOutTime}</p>
						)}
					</div>
					{/* <div>
						<Label className='block mb-2 font-medium'>
							Price
							<RequiredIndicator />
						</Label>
						<Input
							name='price'
							placeholder='Price'
							value={formData.price}
							onChange={handleChange}
							onBlur={() => handleBlur('price')}
							className={showError('price') ? 'border-red-500' : ''}
						/>
						{showError('price') && <p className='mt-1 text-sm text-red-500'>{errors.price}</p>}
					</div> */}
					<div>
						<Label className='block mb-2 font-medium'>Date</Label>
						<DatePicker
							selected={formData.date}
							onChange={(date) => handleDateChange(date, 'date')}
							placeholderText='Date'
							className='w-full px-2 py-1 bg-transparent border rounded'
							withPortal
						/>
					</div>
				</div>

				<div className='flex justify-end mt-4'>
					<Button variant='default' onClick={handleSubmit} className='w-full'>
						{mutation.isLoading ? 'Creating...' : 'Create'}
					</Button>
				</div>

				{/* Show overall validation message if any errors exist */}
				{Object.keys(errors).length > 0 && Object.values(errors).some((error) => error) && (
					<div className='mt-2 text-sm text-red-500'>
						Please fill in all required fields marked with <span className='text-red-500'>*</span>
					</div>
				)}
			</div>
		</ManagerLayout>
	);
};

export default CreateHomeStay;