import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import BlizterContext from '../context/BlizterContext';
import { getMonthExpenditures } from '../services/request';
import './ShowSalary.css';

function ShowSalary({ setIsSalaryFormVisible }) {
  const [monthExpense, setMonthExpense] = useState(0);
  const { salary, date } = useContext(BlizterContext);

  useEffect(() => { getMonthExpenditures(date).then((value) => setMonthExpense(value)); }, [date]);

  useEffect(() => { if (!salary) setIsSalaryFormVisible(true); }, [salary]);

  return (
    <h2 className="salary">{`Balance $${salary - monthExpense}`}</h2>
  );
}

ShowSalary.propTypes = {
  setIsSalaryFormVisible: PropTypes.func.isRequired,
};

export default ShowSalary;
