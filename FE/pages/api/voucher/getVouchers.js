import api from "utils/api";

export const getAllVouchers = async (onlyValid = false) => {
	try {
		const response = await api.get('/Voucher/list', {
			params: { onlyValid },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching vouchers:', error);
		throw error;
	}
};
