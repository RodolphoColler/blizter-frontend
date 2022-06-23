// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChartExpenses.css';
import BlizterContext from '../context/BlizterContext';
import { getLastMonthExpenditures, getMonthExpenditures } from '../services/request';

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

function DoughnutChartExpenses() {
  const [expenses, setExpenses] = useState(0);
  const [lastMonthExpenses, setLastMonthExpenses] = useState(0);
  const { date, isExpenditureFormVisible } = useContext(BlizterContext);

  const monthComparisonPercentage = (lastMonthExpenses - expenses) < 0
    ? Math.abs(((lastMonthExpenses * 100) / expenses).toFixed(0) - 100)
    : (Math.abs(((expenses * 100) / lastMonthExpenses) - 100)).toFixed(0);

  useEffect(() => {
    if (!isExpenditureFormVisible) getMonthExpenditures(date).then((value) => setExpenses(value));
    getLastMonthExpenditures(date).then((value) => setLastMonthExpenses(value));
  }, [date, isExpenditureFormVisible]);

  const doughnutData = {
    datasets: [
      {
        data: [monthComparisonPercentage, 100 - monthComparisonPercentage],
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
      <p>{ `${monthComparisonPercentage}%`}</p>
      <p>
        {`${(lastMonthExpenses - expenses) < 0 ? 'MORE' : 'LESS'} THAN LAST MONTH`}
      </p>
    </div>
  );
}

export default DoughnutChartExpenses;
