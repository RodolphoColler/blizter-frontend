import PropTypes from 'prop-types';
import ExpenditureDropDown from '../ExpenditureDropDown';
import './Expenditures.css';

function Expenditures({ userCategories, isFormVisible }) {
  return (
    <div className="expend-categories-container">
      {
        userCategories.map(({ name, id }) => (
          <ExpenditureDropDown name={ name } key={ id } isFormVisible={ isFormVisible } />
        ))
      }
    </div>
  );
}

Expenditures.propTypes = {
  userCategories: PropTypes.arrayOf(Object).isRequired,
  isFormVisible: PropTypes.bool.isRequired,
};

export default Expenditures;
