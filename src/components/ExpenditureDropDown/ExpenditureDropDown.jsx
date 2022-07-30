import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useContext, useEffect } from 'react';
import { deleteExpenditure } from '../../services/request';
import BlizterContext from '../../context/BlizterContext';
import './ExpenditureDropDown.scss';

function ExpenditureDropDown({ category, expenditures }) {
  const [open, setOpen] = useState(false);
  const [expendituresByCategory, setExpendituresByCategory] = useState([]);
  const { setIsExpenditureFormVisible } = useContext(BlizterContext);

  function updateState(state) {
    if (state === null) return false;

    return null;
  }

  useEffect(() => setExpendituresByCategory(expenditures), [expenditures]);

  async function removeExpenditure({ currentTarget }) {
    const deletedExpenditure = await deleteExpenditure(currentTarget.id);

    const newExpenditures = expendituresByCategory.filter(({ id }) => id !== deletedExpenditure.id);

    setExpendituresByCategory(newExpenditures);
    setIsExpenditureFormVisible((prev) => updateState(prev));
  }

  return (
    <>
      <button type="button" className="expend-categories" onClick={ () => { setOpen(!open); } }>
        { category }
      </button>
      {
        open
        && (
          <ul>
            {
              expendituresByCategory.map(({ description, value, id }) => (
                <li className="expend-item" key={ id }>
                  { description }
                  <span>
                    <p>{`$${value}`}</p>
                    <button type="button" onClick={ removeExpenditure } id={ id }>
                      <FiTrash2 width="15px" />
                    </button>
                  </span>
                </li>
              ))
            }
          </ul>
        )
      }
    </>
  );
}

ExpenditureDropDown.propTypes = {
  category: PropTypes.string.isRequired,
  expenditures: PropTypes.arrayOf(Object).isRequired,
};

export default ExpenditureDropDown;
