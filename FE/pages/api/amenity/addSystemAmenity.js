import api from '@/utils/api';

export const addSystemAmenity = async (amenityNames) => {
	try {
		const response = await api.post('/Amenity/add-system-amenity', {
			amenityNames: amenityNames,
		});
		return response.data;
	} catch (error) {
		console.error('Error adding system amenities:', error);
		throw error;
	}
};