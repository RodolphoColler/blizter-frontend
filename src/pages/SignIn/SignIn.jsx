import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormError from '../../components/FormError/FormError';
import { validateSignIn } from '../../services/formValidations';
import { getUserId, SignIn } from '../../services/request';
import './SignIn.scss';

function SingIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateSignIn(email, password);

      const token = await SignIn({ email, password });

      localStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (error) {
      setFormError(error.message);
    }
  }

  useEffect(() => { setFormError(''); }, [email, password]);

  useEffect(() => {
    try {
      if (localStorage.getItem('token')) {
        getUserId();
        navigate('/dashboard');
      }
    } catch (error) {
      setFormError('');
    }
  }, []);

  return (
    <main className="signin-page">
      <h1>Welcome back :)</h1>
      <div>
        <form className="signin-form" onSubmit={ handleSubmit }>
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
          <FormError error={ formError } />
          <button type="submit">Sign in</button>
        </form>
        <p>or</p>
        <button type="button" className="signup-button" onClick={ () => navigate('/signup') }>Create account</button>
      </div>
    </main>
  );
}

export default SingIn;
