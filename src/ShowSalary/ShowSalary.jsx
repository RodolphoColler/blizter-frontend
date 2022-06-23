import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import BlizterContext from '../context/BlizterContext';
import { getMonthExpenditures } from '../services/request';
import './ShowSalary.css';

function ShowSalary({ setIsSalaryFormVisible }) {
  const [monthExpenditures, setMonthExpenditures] = useState(0);
  const { salary, date, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (!isExpenditureFormVisible) getMonthExpenditures(date).then((value) => setMonthExpenditures(value));
  }, [date, isExpenditureFormVisible]);

  useEffect(() => { if (!salary) setIsSalaryFormVisible(true); }, [salary]);

  return (
    <h2 className="salary">{`Balance $${salary - monthExpenditures}`}</h2>
  );
}

ShowSalary.propTypes = {
  setIsSalaryFormVisible: PropTypes.func.isRequired,
};

export default ShowSalary;
