import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Authorization = localStorage.getItem('token');

const userDateFormat = 'DD MMMM YYYY';

export async function getUserId() {
  try {
    const { data: { id } } = await axios.get('/token');

    localStorage.setItem('userId', id);

    return id;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function SignIn(body) {
  try {
    const { data: { token } } = await axios.post('/login', body);

    axios.defaults.headers.common.Authorization = token;

    await getUserId();

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createUser(body) {
  try {
    const { data: { token } } = await axios.post('/user', body);

    axios.defaults.headers.common.Authorization = token;

    await getUserId();

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createExpenditure(body) {
  try {
    const formattedDate = moment(body.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const { data } = await axios.post('/expenditure', { ...body, date: formattedDate });

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getCategories() {
  const { data: { categories } } = await axios.get('/category');

  return categories;
}

export async function getExpenditures(date) {
  const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

  const url = `/expenditure/?date=${formattedDate}`;

  const { data: { expenditures } } = await axios.get(url);

  return expenditures;
}

export async function deleteExpenditure(id) {
  const { data: { expenditure } } = await axios.delete(`/expenditure/${id}`);

  return expenditure;
}

export async function getSalary(date) {
  try {
    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

    const url = `/salary?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getLastMonthSalary(date) {
  try {
    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().subtract(1, 'month').daysInMonth();

    const url = `/salary?date=${formattedDate}`;

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
    const formattedDate = moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().subtract(1, 'month').daysInMonth();

    const url = `/expenditure/month?date=${formattedDate}`;

    const { data: { monthExpense } } = await axios.get(url);

    return monthExpense;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditures(date) {
  try {
    const formattedDate = moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();

    const url = `/expenditure/month?date=${formattedDate}`;

    const { data: { monthExpense } } = await axios.get(url);

    return monthExpense;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
