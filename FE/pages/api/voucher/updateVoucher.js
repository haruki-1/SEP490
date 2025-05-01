import api from "utils/api";

export const updateVoucher = async (id, voucherData) => {
	try {
		const response = await api.put(`/Voucher/edit-voucher/${id}`, voucherData);
		return response.data;
	} catch (error) {
		console.error('Error updating voucher:', error);
		throw error;
	}
};
