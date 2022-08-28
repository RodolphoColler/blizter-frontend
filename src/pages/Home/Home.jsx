import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { Header } from '../../components';
import './Home.scss';

function Home() {
  return (
    <main className="home-page">
      <Header />
      <section className="home-content">
        <img src="https://i.imgur.com/xHWmG2H.png" alt="" fetchpriority="high" />
        <div className="text-container">
          <p>Easy and better way to get in day with your financial life</p>
          <p>Blizter is your everyday life wallet made to be minimalist and simple to use</p>
          <Link to="/signin">
            Let&apos;s get started
            <BsArrowRightShort fontSize="23px" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
