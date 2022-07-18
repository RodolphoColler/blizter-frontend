import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Authorization = localStorage.getItem('token');

const userDateFormat = 'DD MMMM YYYY';

export async function getUserId() {
  const { data: { id } } = await axios.get('/token');

  localStorage.setItem('userId', id);

  return id;
}

export async function SignIn(body) {
  try {
    const { data: { token } } = await axios.post('/login', body);

    axios.defaults.headers.common.Authorization = token;

    getUserId();

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createUser(body) {
  try {
    const { data: { token } } = await axios.post('/user', body);

    axios.defaults.headers.common.Authorization = token;

    getUserId();

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createExpenditure(body) {
  try {
    const userId = localStorage.getItem('userId');

    const formattedDate = moment(body.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const { data } = await axios.post('/expenditure', { ...body, userId, date: formattedDate });

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateUserCategories(body) {
  const userId = localStorage.getItem('userId');

  const { data: { categories } } = await axios.patch(`user/category/${userId}`, body);

  return categories;
}

export async function getUserCategories() {
  const userId = localStorage.getItem('userId');
  const { data: { categories } } = await axios.get(`/user/category/${userId}`);

  return categories;
}

export async function getCategories() {
  const { data: { categories } } = await axios.get('/category');

  return categories;
}

export async function getExpenditures(category, date) {
  const userId = localStorage.getItem('userId');

  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

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
    const userId = localStorage.getItem('userId');

    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

    const url = `/salary/${userId}?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getLastMonthSalary(date) {
  try {
    const userId = localStorage.getItem('userId');

    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().subtract(1, 'month').daysInMonth();

    const url = `/salary/${userId}?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createSalary(value, date) {
  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

  const { data: { salary } } = await axios.post('/salary', { value, date: formattedDate });

  return salary.value;
}

export async function getLastMonthExpenditures(date) {
  try {
    const userId = localStorage.getItem('userId');

    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().subtract(1, 'month').daysInMonth();

    const url = `/expenditure/month/${userId}?date=${formattedDate}`;

    const { data: { monthExpense: { value } } } = await axios.get(url);

    return value;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditures(date) {
  try {
    const userId = localStorage.getItem('userId');

    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

    const url = `/expenditure/month/${userId}?date=${formattedDate}`;

    const { data: { monthExpense: { value } } } = await axios.get(url);

    return value;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditureByCategory(category, date) {
  const userId = localStorage.getItem('userId');

  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

  const url = `/expenditure/month/${userId}?date=${formattedDate}&category=${category}`;

  const { data: { monthExpense: { value } } } = await axios.get(url);

  return value;
}
