import axios from 'axios';
import moment from 'moment';

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

export async function createExpenditure(body) {
  try {
    const { data } = await axios.post('/expenditure', body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateUserCategories(id, body) {
  const { data: { categories } } = await axios.patch(`user/category/${id}`, body);

  return categories;
}

export async function getUserId() {
  const { data: { id } } = await axios.get('/token');

  return id;
}

export async function getUserCategories() {
  const userId = await getUserId();
  const { data: { categories } } = await axios.get(`/user/category/${userId}`);

  return categories;
}

export async function getCategories() {
  const { data: { categories } } = await axios.get('/category');

  return categories;
}

export async function getExpenditure(category) {
  const userId = await getUserId();

  const date = moment().format('YYYY-MM-') + moment().daysInMonth();

  const url = `/expenditure/${userId}?date=${date}&category=${category}`;

  const { data: { expenditures } } = await axios.get(url);

  return expenditures;
}

export async function deleteExpend(id) {
  const { data: { expenditure } } = await axios.delete(`/expenditure/${id}`);

  return expenditure;
}
