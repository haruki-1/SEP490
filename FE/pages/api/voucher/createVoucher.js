import api from "utils/api";

export const createVoucher = async (voucherData) => {
	try {
		const response = await api.post('/Voucher/create-voucher', voucherData);
		return response.data;
	} catch (error) {
		console.error('Error creating voucher:', error);
		throw error;
	}
};
