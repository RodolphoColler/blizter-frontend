import moment from 'moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSalary } from '../services/request';
import BlizterContext from './BlizterContext';

function BlizterProvider({ children }) {
  const [date, setDate] = useState(moment().format('DD MMMM YYYY'));
  const [dateCount, setDateCount] = useState(0);
  const [salary, setSalary] = useState(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isExpenditureFormVisible, setIsExpenditureFormVisible] = useState(false);

  useEffect(() => {
    setDate(moment().subtract(dateCount, 'month').format('DD MMMM YYYY'));
  }, [dateCount]);

  useEffect(() => {
    if (!isUserLoggedIn) return;
    if (isExpenditureFormVisible) return;

    getSalary(date)
      .then((data) => setSalary(data.value))
      .catch(() => setSalary(0));
  }, [date, isUserLoggedIn, isExpenditureFormVisible]);

  return (
    <BlizterContext.Provider
      value={ {
        date,
        setDate,
        setDateCount,
        salary,
        setSalary,
        setIsUserLoggedIn,
        isExpenditureFormVisible,
        setIsExpenditureFormVisible,
      } }
    >
      {children}
    </BlizterContext.Provider>
  );
}

BlizterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BlizterProvider;
