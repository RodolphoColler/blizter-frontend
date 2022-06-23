import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { deleteExpenditure, getExpenditures } from '../services/request';
import './ExpenditureDropDown.css';
import BlizterContext from '../context/BlizterContext';

function ExpenditureDropDown({ name }) {
  const [open, setOpen] = useState(false);
  const [expenditures, setExpenditures] = useState([]);
  const { date, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (!isExpenditureFormVisible) getExpenditures(name, date).then((data) => { setExpenditures(data); });
  }, [name, isExpenditureFormVisible, date]);

  async function removeExpenditure({ currentTarget }) {
    const deletedExpenditure = await deleteExpenditure(currentTarget.id);

    const newExpenditures = expenditures.filter(({ id }) => id !== deletedExpenditure.id);

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
  name: PropTypes.string.isRequired,
};

export default ExpenditureDropDown;
