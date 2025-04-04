import api from "utils/api";

export const addHomeStayAmenity = async (amenityData) => {
	try {
		const response = await api.post('/HomeStay/add-home-stay-amenity', amenityData);
		return response.data;
	} catch (error) {
		console.error('Error adding home stay amenity:', error);
		throw error;
	}
};
