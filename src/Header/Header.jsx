import { ReactComponent as Logo } from '../Icons/lotus.svg';
import './Header.css';

function Header() {
  return (
    <header className="wallet-header">
      <a href="http:" target="_blank" rel="noreferrer" className="blizter-logo">
        <Logo fill="#337bbe" width="35px" />
        <p>Blizter</p>
      </a>
      <ul>
        <a href="/About"><li>About</li></a>
        <a href="/Home"><li>Home</li></a>
      </ul>
    </header>
  );
}

export default Header;
