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
          <li>
            <Link to="/about" className={ `nav-link${pathname === '/about' ? '-selected' : ''}` }>About</Link>
          </li>
          <li>
            <Link to="/home" className={ `nav-link${pathname === '/home' ? '-selected' : ''}` }>Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className={ `nav-link${pathname === '/dashboard' ? '-selected' : ''}` }>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
