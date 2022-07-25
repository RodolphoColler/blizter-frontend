import { Header } from '../../components';
import './About.scss';

function About() {
  return (
    <main className="about-page">
      <Header />
      <section className="about-content">
        <p>
          This project born when I made a simple full-stack todo list, I really enjoy the first experience
          integrating the front and the back-end but I wanted to do something more ambitious. I started to
          think but nothing came out, until I found a image of an dashboard, at this point the ideas
          started to ge a shape.
        </p>
      </section>
    </main>
  );
}

export default About;
