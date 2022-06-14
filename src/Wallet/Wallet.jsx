import { useState } from 'react';
import ExpenditureForm from '../ExpenditureForm/ExpenditureForm';
import './Wallet.css';

function Wallet() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  return (
    <main className="wallet-page">
      <aside>
        { isFormVisible && <ExpenditureForm setIsFormVisible={ setIsFormVisible } />}
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
