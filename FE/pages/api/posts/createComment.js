export const createComment = async (userId, commentData) => {
	const url = 'https://localhost:7194/api/Post/create-comment';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'X-User-Id': userId,
			},
			body: JSON.stringify(commentData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating comment:', error);
		return null;
	}
};
