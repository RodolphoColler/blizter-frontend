import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { Header } from '../../components';
import './Home.scss';

async function callApi() {
  const baseApiUrl = process.env.REACT_APP_API_URL;

  const response = await axios.get(baseApiUrl);

  return response.data.message;
}

function Home() {
  const [message, setMessage] = useState('f');

  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi();
      setMessage(result);
    };

    fetchData();
  }, []);

  return (
    <main className="home-page">
      <Header />
      <section className="home-content">
        <img src="https://i.imgur.com/xHWmG2H.png" alt="" fetchpriority="high" />
        <div className="text-container">
          <p>Easy and better way to get in day with your financial life</p>
          <p>Blizter is your everyday life wallet made to be minimalist and simple to use</p>
          <p>{message}</p>
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
