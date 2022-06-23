import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegister } from '../services/formValidations';
import { createUser } from '../services/request';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateRegister(email, name, password, confirmPassword);

      const { token } = await createUser({ email, name, password });

      localStorage.setItem('token', token);

      axios.defaults.headers.common.Authorization = localStorage.getItem('token');

      setIsUserLoggedIn(true);

      navigate('/wallet');
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <main className="register-page">
      <div className="register-welcome">
        <h1>Welcome to blizter</h1>
        <p>easy way to get in day with your financial life</p>
      </div>
      <aside className="register-form-side">
        <div>
          <form className="register-form" onSubmit={ handleSubmit }>
            <label htmlFor="email">
              Email
              <input
                type="text"
                id="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
              <hr />
            </label>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
              <hr />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
              <hr />
            </label>
            <label htmlFor="confirm-password">
              Confirm your password
              <input
                type="password"
                id="confirm-password"
                value={ confirmPassword }
                onChange={ (e) => setConfirmPassword(e.target.value) }
              />
              <hr />
            </label>
            { formError && <p className="form-error">{ formError }</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </aside>
    </main>
  );
}

export default Register;
