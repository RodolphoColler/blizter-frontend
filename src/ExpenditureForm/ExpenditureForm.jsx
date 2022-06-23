import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { validateExpenditure } from '../services/formValidations';
import { createExpenditure, getCategories, updateUserCategories } from '../services/request';
import './ExpenditureForm.css';

function ExpenditureForm({ setIsFormVisible, userCategories, setUserCategories }) {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Education');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  async function updateUser() {
    const isUserCategoryExistent = userCategories.find(({ name }) => name === category);

    if (!isUserCategoryExistent) {
      const newCategoryId = categories[categories.findIndex(({ name }) => name === category)].id;
      const newCategories = await updateUserCategories({ categoryId: newCategoryId });
      setUserCategories(newCategories);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateExpenditure(description, value, date);

      await updateUser();

      await createExpenditure({ description, value: Number(value), date, category });

      setIsFormVisible(false);
    } catch (error) {
      setFormError(error.message);
    }
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
            type="number"
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
        { formError && <p className="form-error">{ formError }</p>}
        <button
          type="submit"
        >
          Create Expense
        </button>
      </form>
    </div>
  );
}

ExpenditureForm.propTypes = {
  setIsFormVisible: PropTypes.func.isRequired,
  setUserCategories: PropTypes.func.isRequired,
  userCategories: PropTypes.arrayOf(Object).isRequired,
};

export default ExpenditureForm;
