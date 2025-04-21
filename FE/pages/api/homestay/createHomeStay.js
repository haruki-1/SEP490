// Updated createHomeStay function
export const createHomeStay = async (userId, homeStayData) => {
	const url = 'https://duongcongson-001-site1.jtempurl.com/api/HomeStay/add-home-stay';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'X-User-Id': userId,
			},
			body: JSON.stringify(homeStayData),
		});

		// Important: Check if the response is not ok and throw an error
		if (!response.ok) {
			// For 409 conflict errors
			if (response.status === 409) {
				throw new Error('Duplicate homestay name. Please choose a different name.');
			}
			// For other errors
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// Re-throw the error so it can be caught by the mutation
		throw error;
	}
};