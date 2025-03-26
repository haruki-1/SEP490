import axios from 'axios';

export const assignHomestay = async ({ staffId, homestayId }) => {
  try {
    const response = await axios.post('https://localhost:7194/api/cleaning/assign', {
      staffId,
      homestayId,
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning homestay:', error);
    throw error;
  }
};
