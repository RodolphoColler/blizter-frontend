import axios from 'axios';

export default async function register(body) {
  const url = 'http://localhost:3001/user';
  try {
    const { data: { token } } = await axios.post(url, body);

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
