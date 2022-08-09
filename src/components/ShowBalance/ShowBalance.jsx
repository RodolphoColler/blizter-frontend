import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import BlizterContext from '../../context/BlizterContext';
import { getMonthExpenditures } from '../../services/request';
import './ShowBalance.scss';

function ShowBalance({ setIsSalaryFormVisible }) {
  const [monthExpenditures, setMonthExpenditures] = useState(0);
  const { salary, date, isExpenditureFormVisible, setIsSignedModalVisible } = useContext(BlizterContext);

  async function fetchMonthExpenditures() {
    try {
      const expenditures = await getMonthExpenditures(date);
      const expendituresSum = expenditures.reduce((acc, cur) => acc + cur.sum, 0);
      setMonthExpenditures(expendituresSum);
    } catch ({ message }) {
      if (message.includes('token')) setIsSignedModalVisible(true);
    }
  }

  useEffect(() => {
    if (!isExpenditureFormVisible) fetchMonthExpenditures();
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
