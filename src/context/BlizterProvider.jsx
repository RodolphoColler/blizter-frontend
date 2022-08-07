import moment from 'moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getSalary } from '../services/request';
import BlizterContext from './BlizterContext';

function BlizterProvider({ children }) {
  const [date, setDate] = useState(moment().format('DD MMMM YYYY'));
  const [dateCount, setDateCount] = useState(0);
  const [salary, setSalary] = useState(1);
  const [isSignedModalVisible, setIsSignedModalVisible] = useState(false);
  const [isExpenditureFormVisible, setIsExpenditureFormVisible] = useState(false);

  useEffect(() => {
    setDate(moment().subtract(dateCount, 'month').format('DD MMMM YYYY'));
  }, [dateCount]);

  async function fetchSalary() {
    try {
      setSalary(await getSalary(date));
    } catch ({ message }) {
      setSalary(0);

      if (message.includes('token')) setIsSignedModalVisible(true);
    }
  }

  useEffect(() => {
    fetchSalary();
  }, [date, isExpenditureFormVisible]);

  return (
    <BlizterContext.Provider
      value={ {
        date,
        setDate,
        setDateCount,
        salary,
        setSalary,
        isExpenditureFormVisible,
        setIsExpenditureFormVisible,
        setIsSignedModalVisible,
        isSignedModalVisible,
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
