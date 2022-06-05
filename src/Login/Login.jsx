import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../services/axiosPost';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  function validateForm() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minPasswordLength = 7;

    if (!emailRegex.test(email)) throw new Error('Email is not valid.');
    if (!password) throw new Error('Password is required');
    if (password.length < minPasswordLength) throw new Error('Password need to have at least 7 characters.');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateForm();
      const endpoint = '/login';
      const { token } = await login(endpoint, { email, password });
      localStorage.setItem('token', token);
      navigate('/wallet');
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <main className="login-page">
      <h1>Welcome Back :)</h1>
      <div>
        <form className="login-form" onSubmit={ handleSubmit }>
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
          { formError && <p className="form-error">{ formError }</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
