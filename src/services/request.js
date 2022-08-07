import axios from 'axios';
import moment from 'moment';
import { lastMonthDate, currentMonthDate } from './dateFormatter';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Authorization = localStorage.getItem('token');

export async function getUserId() {
  try {
    const { data: { id } } = await axios.get('/token');

    return id;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function SignIn(body) {
  try {
    const { data: { token } } = await axios.post('/login', body);

    axios.defaults.headers.common.Authorization = token;

    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createUser(body) {
  try {
    const { data: { token } } = await axios.post('/user', body);

    axios.defaults.headers.common.Authorization = token;

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
  try {
    const { data: { categories } } = await axios.get('/category');

    return categories;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getExpenditures(date) {
  try {
    const formattedDate = currentMonthDate(date);

    const url = `/expenditure/?date=${formattedDate}`;

    const { data: { expenditures } } = await axios.get(url);

    return expenditures;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteExpenditure(id) {
  try {
    const { data: { expenditure } } = await axios.delete(`/expenditure/${id}`);

    return expenditure;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getSalary(date) {
  try {
    const formattedDate = currentMonthDate(date);

    const url = `/salary?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getLastMonthSalary(date) {
  try {
    const formattedDate = lastMonthDate(date);

    const url = `/salary?date=${formattedDate}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createSalary(value, date) {
  try {
    const formattedDate = currentMonthDate(date);

    const { data: { salary } } = await axios.post('/salary', { value, date: formattedDate });

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getLastMonthExpenditures(date) {
  try {
    const formattedDate = lastMonthDate(date);

    const url = `/expenditure/month?date=${formattedDate}`;

    const { data: { monthExpense } } = await axios.get(url);

    return monthExpense;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthExpenditures(date) {
  try {
    const formattedDate = currentMonthDate(date);

    const url = `/expenditure/month?date=${formattedDate}`;

    const { data: { monthExpense } } = await axios.get(url);

    return monthExpense;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
