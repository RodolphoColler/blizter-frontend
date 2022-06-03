/* eslint-disable max-len */
import './Register.css';

function Register() {
  return (
    <main className="register-page">
      <div className="register-welcome">
        <h1>Welcome to blizter</h1>
        <p>easy way to get in day with your financial</p>
      </div>
      <aside className="register-form-side">
        <div>
          <form className="register-form">
            <label htmlFor="email">
              Email
              <input type="text" id="email" />
              <hr />
            </label>
            <label htmlFor="name">
              Name
              <input type="text" id="name" />
              <hr />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" id="password" />
              <hr />
            </label>
            <label htmlFor="confirm-password">
              Confirm your password
              <input type="confirm-password" id="password" />
              <hr />
            </label>
            <button type="submit">Register</button>
          </form>
        </div>
      </aside>
    </main>
  );
}

export default Register;
