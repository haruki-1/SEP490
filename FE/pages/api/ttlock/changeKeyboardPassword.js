import api from "@/utils/api";

export const changeKeyboardPassword = async (
	homeStayID,
	lockID,
	keyboardPwdId,
	newPasscode,
	startDate,
	endDate,
	name
) => {
	try {
		const formData = new FormData();
		formData.append('homeStayID', homeStayID);
		formData.append('lockID', lockID);
		formData.append('keyboardPwdId', keyboardPwdId);
		formData.append('newPasscode', newPasscode);
		formData.append('startDate', startDate);
		formData.append('endDate', endDate);
		formData.append('name', name);

		const response = await api.post('/ttlock/change-keyboard-password', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		throw new Error('Failed to change keyboard password');
	}
};