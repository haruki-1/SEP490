import api from "utils/api";

export const deleteHomeStayFacility = async (homeStayID, facilityID) => {
	try {
		const response = await api.delete(
			`/HomeStay/delete-home-stay-facility?HomeStayID=${homeStayID}&FacilityID=${facilityID}`
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting homestay facility:', error);
		throw error;
	}
};
