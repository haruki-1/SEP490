import api from "utils/api";

export const changeRefundStatus = async (refundID) => {
	try {
		const response = await api.put(`/Refunds/change-status?refundID=${refundID}`);
		return response.data;
	} catch (error) {
		console.error('Error changing refund status:', error);
		throw error;
	}
};
