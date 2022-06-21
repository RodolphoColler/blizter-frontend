/* eslint-disable no-magic-numbers */
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getSalary, getUserId } from '../services/request';
import './DoughnutChart.css';

const options = {
  rotation: -90,
  circumference: 180,
  cutout: 80,
  responsive: true,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

export async function getLastMonthSalary() {
  try {
    const userId = await getUserId();

    const date = moment().subtract(1, 'month').format('YYYY-MM-') + moment().daysInMonth();

    const url = `/salary/${userId}?date=${date}`;

    const { data: { salary } } = await axios.get(url);

    return salary;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

function DoughnutChart() {
  const [salary, setSalary] = useState(0);
  const [lastMonthSalary, setLastMonthSalary] = useState(0);
  const monthComparisonPercentage = (lastMonthSalary - salary) < 0
    ? Math.abs(((lastMonthSalary * 100) / salary).toFixed(0) - 100)
    : (Math.abs(((salary * 100) / lastMonthSalary) - 100)).toFixed(0);

  useEffect(() => {
    getSalary().then(({ value }) => setSalary(value));
    getLastMonthSalary().then(({ value = 0 }) => setLastMonthSalary(value));
  }, []);

  const doughnutData = {
    datasets: [
      {
        data: [monthComparisonPercentage, 100 - monthComparisonPercentage],
        backgroundColor: ['#336699', '#99CCFF00'],
      },
    ],
  };

  return (
    <div className="doughnut-container">
      <p>YOU EARNED</p>
      <div style={ { width: '200px' } }>
        <Doughnut data={ doughnutData } options={ { ...options } } />
      </div>
      <p>{ `${monthComparisonPercentage}%`}</p>
      <p>
        {`${(lastMonthSalary - salary) < 0 ? 'MORE' : 'LESS'} THAN LAST MONTH`}
      </p>
    </div>
  );
}

export default DoughnutChart;
