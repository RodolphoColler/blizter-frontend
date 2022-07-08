import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/lotus.svg';
import './Header.scss';

function Header() {
  return (
    <header className="wallet-header">
      <Link to="/home" className="blizter-logo">
        <Logo fill="#2d7dc8" width="33px" />
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
