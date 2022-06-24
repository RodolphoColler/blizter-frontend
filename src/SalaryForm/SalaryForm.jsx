import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import BlizterContext from '../context/BlizterContext';
import { createSalary } from '../services/request';
import './SalaryForm.css';

function SalaryForm({ setIsSalaryFormVisible }) {
  const [value, setValue] = useState('');
  const [formError, setFormError] = useState('');
  const { setSalary, date } = useContext(BlizterContext);

  function validateForm() {
    if (!value) throw new Error('Value cannot be empty.');
    if (value === '0') throw new Error('Value cannot be zero.');
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      validateForm();

      const salary = await createSalary(Number(value), date);

      setSalary(salary);

      setIsSalaryFormVisible(false);
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <div className="darker-background">
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
