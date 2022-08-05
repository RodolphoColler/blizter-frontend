import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import BlizterContext from '../../context/BlizterContext';
import { getMonthExpenditures } from '../../services/request';
import './ShowBalance.css';

function ShowBalance({ setIsSalaryFormVisible }) {
  const [monthExpenditures, setMonthExpenditures] = useState(0);
  const { salary, date, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (!isExpenditureFormVisible) {
      getMonthExpenditures(date)
        .then((data) => {
          const result = data.reduce((acc, cur) => acc + cur.sum, 0);
          setMonthExpenditures(result);
        });
    }
  }, [date, isExpenditureFormVisible]);

  useEffect(() => { if (!salary) setIsSalaryFormVisible(true); }, [salary]);

  return (
    <h2 className="salary">{`Balance $${salary.value - monthExpenditures}`}</h2>
  );
}

ShowBalance.propTypes = {
  setIsSalaryFormVisible: PropTypes.func.isRequired,
};

export default ShowBalance;
