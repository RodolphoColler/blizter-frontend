import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { deleteExpend, getExpenditures } from '../services/request';
import './ExpenditureDropDown.css';
import BlizterContext from '../context/BlizterContext';

function ExpenditureDropDown({ name, isFormVisible }) {
  const [open, setOpen] = useState(false);
  const [expenditures, setExpenditures] = useState([]);
  const { date } = useContext(BlizterContext);

  useEffect(() => {
    if (!isFormVisible) getExpenditures(name, date).then((data) => { setExpenditures(data); });
  }, [name, isFormVisible, date]);

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
