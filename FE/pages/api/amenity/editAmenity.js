import api from "utils/api";

export const editAmenity = async (amentityID, amentityName) => {
	try {
		const response = await api.put('/Amenity/edit-amenity', {
			amentityID: amentityID,
			amentityName: amentityName,
		});
		return response.data;
	} catch (error) {
		console.error('Error editing amenity:', error);
		throw error;
	}
};