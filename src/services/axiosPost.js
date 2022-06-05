import axios from 'axios';

export default async function axiosPost(endpoint, body) {
  const url = `http://localhost:3001${endpoint}`;
  try {
    const { data } = await axios.post(url, body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
