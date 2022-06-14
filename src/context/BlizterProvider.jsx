import PropTypes from 'prop-types';
import BlizterContext from './BlizterContext';

function BlizterProvider({ children }) {
  return (
    <BlizterContext.Provider value={ { } }>
      {children}
    </BlizterContext.Provider>
  );
}

BlizterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BlizterProvider;
