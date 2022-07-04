import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Icons/lotus.svg';
import './Header.css';

function Header() {
  return (
    <header className="wallet-header">
      <Link to="/home" className="blizter-logo">
        <Logo fill="#337bbe" width="35px" />
        <p>Blizter</p>
      </Link>
      <ul>
        <Link to="/About"><li>About</li></Link>
        <Link to="/Home"><li>Home</li></Link>
      </ul>
    </header>
  );
}

export default Header;
