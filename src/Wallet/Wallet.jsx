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
      {
        isFormVisible && (
          <ExpenditureForm
            setIsFormVisible={ setIsFormVisible }
            userCategories={ userCategories }
            setUserCategories={ setUserCategories }
          />
        )
      }
      <aside>
        <button
          type="button"
          className="create-expend-button"
          onClick={ () => { setIsFormVisible(!isFormVisible); } }
        >
          Create Expend
        </button>
      </aside>
      <div>
        <h1>In building</h1>
      </div>
    </main>
  );
}

export default Wallet;
