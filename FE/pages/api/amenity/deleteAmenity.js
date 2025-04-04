import api from "@/utils/api";

export const deleteAmenity = async (amentityID) => {
	try {
		const response = await api.delete(`/Amenity/delete-amentity?AmentityID=${amentityID}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting amenity:', error);
		throw error;
	}
};
