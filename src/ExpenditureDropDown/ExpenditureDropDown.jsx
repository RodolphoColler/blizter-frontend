/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getUserId } from '../services/request';
import './ExpenditureDropDown.css';

async function getExpenditure(category) {
  const userId = await getUserId();

  const date = moment().format('YYYY-MM-') + moment().daysInMonth();

  const url = `/expenditure/${userId}?date=${date}&category=${category}`;

  const { data: { expenditures } } = await axios.get(url);

  return expenditures;
}

function ExpenditureDropDown({ name, isFormVisible }) {
  const [open, setOpen] = useState(false);
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    if (!isFormVisible) getExpenditure(name).then((data) => { setExpenditures(data); });
  }, [name, isFormVisible]);

  async function deleteExpend(event) {
    console.log(event.currentTarget);
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
                  <div>
                    <p>{`$${value}`}</p>
                    <button type="button" onClick={ deleteExpend }>
                      <FiTrash2 width="15px" />
                    </button>
                  </div>
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
