import { Link } from 'react-router-dom';
import './NotSignedModal.scss';

function NotSignedModal() {
  return (
    <div className="darker-background-signed">
      <div className="signed-modal-container">
        <h1>Oh, no</h1>
        <p>
          It seems like you did not have an account yet or just not signed in
        </p>
        <div>
          <Link to="/signup">Go to sign up</Link>
          <Link to="/home">Go to home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotSignedModal;
