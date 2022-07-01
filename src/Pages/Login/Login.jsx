import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BlizterContext from '../../context/BlizterContext';
import { validateLogin } from '../../services/formValidations';
import { login } from '../../services/request';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { setIsUserLoggedIn } = useContext(BlizterContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateLogin(email, password);

      const { token } = await login({ email, password });

      localStorage.setItem('token', token);

      axios.defaults.headers.common.Authorization = localStorage.getItem('token');

      setIsUserLoggedIn(true);

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
