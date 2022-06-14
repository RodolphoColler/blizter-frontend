import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/request';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  function validateForm() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minPasswordLength = 7;

    if (!emailRegex.test(email)) throw new Error('Email is not valid.');
    if (!name) throw new Error('Name is required.');
    if (!password) throw new Error('Password is required');
    if (password.length < minPasswordLength) throw new Error('Password need to have at least 7 characters.');
    if (password !== confirmPassword) throw new Error('Passwords does not match.');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateForm();
      const { token } = await register({ email, name, password });
      localStorage.setItem('token', token);
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
