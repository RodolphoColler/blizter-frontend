// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChartExpenses.scss';
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
  const [monthExpenditures, setMonthExpenditures] = useState(0);
  const [lastMonthExpenditures, setLastMonthExpenditures] = useState(0);
  const { date, isExpenditureFormVisible, setIsSignedModalVisible } = useContext(BlizterContext);

  async function fetchExpenses() {
    try {
      setMonthExpenditures(sum(await getMonthExpenditures(date)));

      setLastMonthExpenditures(sum(await getLastMonthExpenditures(date)));
    } catch ({ message }) {
      if (message.includes('token')) setIsSignedModalVisible(true);
    }
  }

  useEffect(() => {
    if (!isExpenditureFormVisible) fetchExpenses();
  }, [date, isExpenditureFormVisible]);

  const doughnutData = {
    datasets: [
      {
        data: [getMonthComparison(lastMonthExpenditures, monthExpenditures), 100 - getMonthComparison(lastMonthExpenditures, monthExpenditures)],
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
      <p>{ `${getMonthComparison(lastMonthExpenditures, monthExpenditures)}%`}</p>
      <p>
        {`${(lastMonthExpenditures - monthExpenditures) <= 0 ? 'MORE' : 'LESS'} THAN LAST MONTH`}
      </p>
    </div>
  );
}

export default DoughnutChartExpenses;
