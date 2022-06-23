import PropTypes from 'prop-types';
import ExpenditureDropDown from '../ExpenditureDropDown';
import './Expenditures.css';

function Expenditures({ userCategories }) {
  return (
    <div className="expend-categories-container">
      {
        userCategories.map(({ name, id }) => (
          <ExpenditureDropDown name={ name } key={ id } />
        ))
      }
    </div>
  );
}

Expenditures.propTypes = {
  userCategories: PropTypes.arrayOf(Object).isRequired,
};

export default Expenditures;
