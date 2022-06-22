import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common.Authorization = localStorage.getItem('token');

const userDateFormat = 'DD MMMM YYYY';

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

export async function getExpenditures(category, date) {
  const userId = await getUserId();

  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment().daysInMonth();

  const url = `/expenditure/${userId}?date=${formattedDate}&category=${category}`;

  const { data: { expenditures } } = await axios.get(url);

  return expenditures;
}

export async function deleteExpenditure(id) {
  const { data: { expenditure } } = await axios.delete(`/expenditure/${id}`);

  return expenditure;
}

export async function getSalary(date) {
  try {
    const userId = await getUserId();

    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment().daysInMonth();

    const url = `/salary/${userId}?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getLastMonthSalary(date) {
  try {
    const userId = await getUserId();

    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().daysInMonth();

    const url = `/salary/${userId}?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createSalary(value) {
  const date = moment().format('YYYY-MM-') + moment().daysInMonth();

  const { data: { salary } } = await axios.post('/salary', { value, date });

  return salary.value;
}

export async function getLastMonthExpenditures(date) {
  try {
    const userId = await getUserId();

    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().daysInMonth();

    const url = `/expenditure/month/${userId}?date=${formattedDate}`;

    const { data: { monthExpense: { value } } } = await axios.get(url);

    return value;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditures(date) {
  try {
    const userId = await getUserId();

    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment().daysInMonth();

    const url = `/expenditure/month/${userId}?date=${formattedDate}`;

    const { data: { monthExpense: { value } } } = await axios.get(url);

    return value;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditureByCategory(category, date) {
  const userId = await getUserId();

  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment().daysInMonth();

  const url = `/expenditure/month/${userId}?date=${formattedDate}&category=${category}`;

  const { data: { monthExpense: { value } } } = await axios.get(url);

  return value;
}
