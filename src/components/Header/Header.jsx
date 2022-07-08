import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/lotus.svg';
import './Header.scss';

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="wallet-header">
      <Link to="/home" className="blizter-logo">
        <Logo fill="#2d7dc8" width="33px" />
        <p>Blizter</p>
      </Link>
      <nav>
        <ul>
          <li className={ `nav-link${pathname === '/about' ? '-selected' : ''}` }>
            <Link to="/about">About</Link>
          </li>
          <li className={ `nav-link${pathname === '/home' ? '-selected' : ''}` }>
            <Link to="/home">Home</Link>
          </li>
          <li className={ `nav-link${pathname === '/dashboard' ? '-selected' : ''}` }>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
