import api from "utils/api";

export const getHomeStayRevenueStatistics = async (homeStayID, year) => {
	try {
		const response = await api.get('/Booking/statistics-revenue-home-stay', {
			params: { homeStayID, year },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching homestay revenue statistics:', error);
		throw error;
	}
};