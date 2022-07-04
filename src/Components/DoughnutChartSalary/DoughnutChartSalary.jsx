// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getLastMonthSalary } from '../../services/request';
import './DoughnutChartSalary.css';
import BlizterContext from '../../context/BlizterContext';

const options = {
  rotation: -90,
  circumference: 180,
  cutout: 80,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  maintainAspectRatio: false,
};

function DoughnutChartSalary() {
  const [lastMonthSalary, setLastMonthSalary] = useState(0);
  const { salary, date } = useContext(BlizterContext);

  const monthComparisonPercentage = (lastMonthSalary - salary) < 0
    ? Math.abs(((lastMonthSalary * 100) / salary).toFixed(0) - 100)
    : (Math.abs(((salary * 100) / lastMonthSalary) - 100)).toFixed(0);

  useEffect(() => {
    getLastMonthSalary(date)
      .then(({ value }) => setLastMonthSalary(value))
      .catch(() => setLastMonthSalary(0));
  }, [date]);

  const doughnutData = {
    datasets: [
      {
        data: [monthComparisonPercentage, 100 - monthComparisonPercentage],
        backgroundColor: ['#336699', '#FFFFFF00'],
      },
    ],
  };

  return (
    <div className="doughnut-salary-container">
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

export default DoughnutChartSalary;
