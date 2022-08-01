import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormError from '../../components/FormError/FormError';
import { validateSignUp } from '../../services/formValidations';
import { createUser } from '../../services/request';
import './SignUp.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateSignUp(email, name, password, confirmPassword);

      const token = await createUser({ email, name, password });

      localStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (error) {
      setFormError(error.message);
    }
  }

  useEffect(() => { setFormError(''); }, [email, name, password, confirmPassword]);

  return (
    <main className="signup-page">
      <div className="signup-welcome">
        <h1>Welcome to blizter</h1>
        <p>easy way to get in day with your financial life</p>
      </div>
      <aside className="signup-form-side">
        <div>
          <form className="signup-form" onSubmit={ handleSubmit }>
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
            <FormError error={ formError } />
            <button type="submit">Sign up</button>
          </form>
          <p>or</p>
          <button type="button" className="signin-button" onClick={ () => navigate('/signin') }>Sign in</button>
        </div>
      </aside>
    </main>
  );
}

export default SignUp;
