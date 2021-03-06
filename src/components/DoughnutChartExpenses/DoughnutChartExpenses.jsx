// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChartExpenses.css';
import BlizterContext from '../../context/BlizterContext';
import { getLastMonthExpenditures, getMonthExpenditures } from '../../services/request';

const options = {
  rotation: -90,
  circumference: 180,
  cutout: 80,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

function getMonthComparison(lastMonthExpenses, expenses) {
  if ((lastMonthExpenses - expenses) === 0) return 0;

  if ((lastMonthExpenses - expenses) < 0) {
    return Math.abs(((lastMonthExpenses * 100) / expenses).toFixed(0) - 100);
  }

  return (Math.abs(((expenses * 100) / lastMonthExpenses) - 100)).toFixed(0);
}

function sum(numbers) {
  return numbers.reduce((acc, cur) => acc + cur.sum, 0);
}

function DoughnutChartExpenses() {
  const [expenses, setExpenses] = useState(0);
  const [lastMonthExpenses, setLastMonthExpenses] = useState(0);
  const { date, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (!isExpenditureFormVisible) getMonthExpenditures(date).then((data) => setExpenses(sum(data)));
    getLastMonthExpenditures(date).then((data) => setLastMonthExpenses(sum(data)));
  }, [date, isExpenditureFormVisible]);

  const doughnutData = {
    datasets: [
      {
        data: [getMonthComparison(lastMonthExpenses, expenses), 100 - getMonthComparison(lastMonthExpenses, expenses)],
        backgroundColor: ['#336699', '#99CCFF00'],
      },
    ],
  };

  return (
    <div className="doughnut-expenses-container">
      <p>YOU WASTED</p>
      <div style={ { width: '200px' } }>
        <Doughnut data={ doughnutData } options={ { ...options } } />
      </div>
      <p>{ `${getMonthComparison(lastMonthExpenses, expenses)}%`}</p>
      <p>
        {`${(lastMonthExpenses - expenses) <= 0 ? 'MORE' : 'LESS'} THAN LAST MONTH`}
      </p>
    </div>
  );
}

export default DoughnutChartExpenses;
