/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState, useContext } from 'react';
import { validateExpenditure } from '../../services/formValidations';
import { createExpenditure, getCategories } from '../../services/request';
import BlizterContext from '../../context/BlizterContext';
import './ExpenditureForm.scss';

function ExpenditureForm() {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(1);
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');
  const { setIsExpenditureFormVisible, setIsSignedModalVisible } = useContext(BlizterContext);

  async function fetchCategories() {
    try {
      setCategories(await getCategories());
    } catch ({ message }) {
      if (message.includes('token')) setIsSignedModalVisible(true);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateExpenditure(description, value, date);

      await createExpenditure({ description, value: Number(value), date, categoryId: Number(category) });

      setIsExpenditureFormVisible(false);
    } catch ({ message }) {
      setFormError(message);
      if (message.includes('token')) setIsSignedModalVisible(true);
    }
  }

  function handleClickOutside({ target }) {
    if (target.classList.contains('darker-background')) {
      setIsExpenditureFormVisible(false);
    }
  }

  return (
    <div className="darker-background" onClick={ (event) => handleClickOutside(event) }>
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
            { categories.map(({ name, id }) => (
              <option value={ id } key={ id }>{name}</option>
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

export default ExpenditureForm;
