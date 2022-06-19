import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { deleteExpend, getExpenditure } from '../services/request';
import './ExpenditureDropDown.css';

function ExpenditureDropDown({ name, isFormVisible }) {
  const [open, setOpen] = useState(false);
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    if (!isFormVisible) getExpenditure(name).then((data) => { setExpenditures(data); });
  }, [name, isFormVisible]);

  async function removeExpend({ currentTarget }) {
    const deletedExpend = await deleteExpend(currentTarget.id);

    const newExpenditures = expenditures.filter(({ id }) => id !== deletedExpend.id);

    setExpenditures(newExpenditures);
  }

  return (
    <>
      <button type="button" className="expend-categories" onClick={ () => { setOpen(!open); } }>
        { name }
      </button>
      {
        open
        && (
          <ul>
            {
              expenditures.map(({ description, value, id }) => (
                <li className="expend-item" key={ id }>
                  { description }
                  <span>
                    <p>{`$${value}`}</p>
                    <button type="button" onClick={ removeExpend } id={ id }>
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
  name: PropTypes.string.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
};

export default ExpenditureDropDown;
