export const createHomeStay = async (userId, homeStayData) => {
	const url = 'https://localhost:7049/api';

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

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating home stay:', error);
		return null;
	}
};
