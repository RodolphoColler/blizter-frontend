/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import BlizterContext from '../../context/BlizterContext';
import { createSalary } from '../../services/request';
import './SalaryForm.scss';

function SalaryForm({ setIsSalaryFormVisible }) {
  const [value, setValue] = useState('');
  const [formError, setFormError] = useState('');
  const { setSalary, date, salary } = useContext(BlizterContext);

  function validateForm() {
    if (!value) throw new Error('Value cannot be empty.');
    if (value === '0') throw new Error('Value cannot be zero.');
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      validateForm();

      const newSalary = await createSalary(Number(value), date);

      setSalary(newSalary);

      setIsSalaryFormVisible(false);
    } catch (error) {
      setFormError(error.message);
    }
  }

  function handleClickOutside({ target }) {
    if (target.classList.contains('darker-background') && salary) {
      setIsExpenditureFormVisible(false);
    }
  }

  return (
    <div className="darker-background" onClick={ (event) => handleClickOutside(event) }>
      <form className="salary-form" onSubmit={ handleSubmit }>
        <h3>Insert here your salary</h3>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>
        { formError && <p className="form-error">{ formError }</p>}
        <button type="submit">Save salary</button>
      </form>
    </div>

  );
}

SalaryForm.propTypes = {
  setIsSalaryFormVisible: PropTypes.func.isRequired,
};

export default SalaryForm;
