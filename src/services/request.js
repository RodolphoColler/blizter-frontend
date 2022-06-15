import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common.Authorization = localStorage.getItem('token');

export async function login(body) {
  try {
    const { data } = await axios.post('/login', body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function register(body) {
  try {
    const { data } = await axios.post('/user', body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function expenditure(body) {
  try {
    const { data } = await axios.post('/expenditure', body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getCategories() {
  const { data: { categories } } = await axios.get('/category');

  return categories;
}

export async function getUserId() {
  const { data: { id } } = await axios.get('/token');

  return id;
}
