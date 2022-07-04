import { useContext } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import BlizterContext from '../../Context/BlizterContext';
import './ShowDate.css';

function ShowDate() {
  const { date, setDateCount } = useContext(BlizterContext);

  return (
    <div className="date-container">
      <button
        type="button"
        onClick={ () => setDateCount((prev) => prev + 1) }
      >
        <MdArrowForwardIos height="20px" />
      </button>
      <h2>{date}</h2>
      <button
        type="button"
        onClick={ () => setDateCount((prev) => prev - 1) }
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
}

export default ShowDate;
