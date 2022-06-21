import moment from 'moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import BlizterContext from './BlizterContext';

function BlizterProvider({ children }) {
  const [date, setDate] = useState('');
  const [dateCount, setDateCount] = useState(0);

  useEffect(() => {
    setDate(moment().subtract(dateCount, 'month').format('DD MMMM YYYY'));
  }, [dateCount]);

  return (
    <BlizterContext.Provider value={ { date, setDateCount } }>
      {children}
    </BlizterContext.Provider>
  );
}

BlizterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BlizterProvider;
