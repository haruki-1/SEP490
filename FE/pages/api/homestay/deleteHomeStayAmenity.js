import api from "utils/api";

export const deleteHomeStayAmenity = async (homeStayID, amenityID) => {
	try {
		const response = await api.delete(
			`/HomeStay/delete-home-stay-amenity?HomeStayID=${homeStayID}&AmenityID=${amenityID}`
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting homestay amenity:', error);
		throw error;
	}
};
