import React, { useState, useEffect } from 'react';
import ExpenditureForm from '../ExpenditureForm/ExpenditureForm';
import { getUserCategories } from '../services/request';
import Expenditures from '../Expenditures';
import './Wallet.css';

function Wallet() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    getUserCategories().then((data) => setUserCategories(data));
  }, []);

  return (
    <>
      {
        isFormVisible && (
          <ExpenditureForm
            setIsFormVisible={ setIsFormVisible }
            userCategories={ userCategories }
            setUserCategories={ setUserCategories }
          />
        )
      }
      <main className="wallet-page">
        <aside>
          <button
            type="button"
            className="create-expend-button"
            onClick={ () => { setIsFormVisible(!isFormVisible); } }
          >
            Create Expend
          </button>
          <Expenditures userCategories={ userCategories } isFormVisible={ isFormVisible } />
        </aside>
        <div>
          <h1>In building</h1>
        </div>
      </main>
    </>
  );
}

export default Wallet;
