// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { getMonthExpenditures } from '../../services/request';
import BlizterContext from '../../context/BlizterContext';
import './BarChart.css';

function BarChart() {
  const [monthExpenditure, setMonthExpenditure] = useState([]);
  const { salary, date, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (!isExpenditureFormVisible) getMonthExpenditures(date).then((data) => setMonthExpenditure(data));
  }, [date, isExpenditureFormVisible]);

  const data = {
    labels: [...monthExpenditure.map(({ category }) => category.name), 'salary'],
    datasets: [{
      label: 'Month expenses',
      backgroundColor: 'rgb(51, 123, 190)',
      data: [...monthExpenditure.map(({ sum }) => sum), salary].map((number) => (number * 100) / salary),
    }],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="bar-chart">
      <Bar data={ data } options={ options } />
    </div>
  );
}

export default BarChart;
