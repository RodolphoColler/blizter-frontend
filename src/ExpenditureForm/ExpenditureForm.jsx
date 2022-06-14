import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './ExpenditureForm.css';

async function getCategories() {
  const { data: { categories } } = await axios.get('/category');

  console.log(categories);

  return categories;
}

function ExpenditureForm({ setIsFormVisible }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="darker-background">
      <form className="expenditure-form" onSubmit={ handleSubmit }>
        <label htmlFor="value">
          Description
          <input
            type="text"
            id="value"
            placeholder="Insert a short description"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
          />
        </label>
        <label htmlFor="value">
          Value
          <input
            type="text"
            id="value"
            placeholder="Insert the value"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>
        <label htmlFor="category">
          Select the category
          <select
            id="category"
            value={ category }
            onChange={ (e) => setCategory(e.target.value) }
          >
            { categories.map(({ name }) => (
              <option value={ name } key={ name }>{name}</option>
            )) }
          </select>
        </label>
        <label htmlFor="date">
          Date
          <input
            type="text"
            id="date"
            placeholder="DD/MM/YYYY"
            value={ date }
            onChange={ (e) => setDate(e.target.value) }
          />
        </label>
        <button
          type="submit"
          onClick={ () => { setIsFormVisible((prev) => !prev); } }
        >
          Create Expense
        </button>
      </form>
    </div>
  );
}

ExpenditureForm.propTypes = {
  setIsFormVisible: PropTypes.func.isRequired,
};

export default ExpenditureForm;
