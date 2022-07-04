// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { getMonthExpenditureByCategory, getUserCategories } from '../../services/request';
import BlizterContext from '../../context/BlizterContext';
import './BarChart.css';

function BarChart() {
  const [categories, setCategories] = useState([]);
  const [categoriesExpense, setCategoriesExpense] = useState([]);
  const { salary, date, isExpenditureFormVisible } = useContext(BlizterContext);

  async function getCategoriesExpenses() {
    const categoriesExpenditurePromises = categories.map(async ({ name }) => getMonthExpenditureByCategory(name, date));

    const categoriesExpenditure = await Promise.all(categoriesExpenditurePromises);

    return categoriesExpenditure;
  }

  useEffect(() => {
    if (!isExpenditureFormVisible) getUserCategories().then((data) => setCategories(data));
  }, [isExpenditureFormVisible]);

  useEffect(() => {
    if (categories.length) getCategoriesExpenses().then((data) => setCategoriesExpense(data));
  }, [categories, date]);

  const data = {
    labels: [...categories.map(({ name }) => name), 'salary'],
    datasets: [{
      label: 'Month expenses',
      backgroundColor: 'rgb(51, 123, 190)',
      data: [...categoriesExpense, salary].map((number) => (number * 100) / salary),
    }],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="bar-chart-container">
      <Bar data={ data } options={ options } />
    </div>
  );
}

export default BarChart;
