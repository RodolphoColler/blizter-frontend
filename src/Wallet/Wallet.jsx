import { useState, useEffect } from 'react';
import ExpenditureForm from '../ExpenditureForm/ExpenditureForm';
import { getUserCategories } from '../services/request';
import './Wallet.css';

function Wallet() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    getUserCategories().then((data) => setUserCategories(data));
  }, []);

  return (
    <main className="wallet-page">
      <aside>
        {
          isFormVisible && (
            <ExpenditureForm
              setIsFormVisible={ setIsFormVisible }
              userCategories={ userCategories }
              setUserCategories={ setUserCategories }
            />
          )
        }
        <button
          type="button"
          onClick={ () => { setIsFormVisible(!isFormVisible); } }
        >
          create expend
        </button>
      </aside>
      <div>
        <h1>In building</h1>
      </div>
    </main>
  );
}

export default Wallet;
