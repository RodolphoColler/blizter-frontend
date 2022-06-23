import React, { useState, useEffect, useContext } from 'react';
import ExpenditureForm from '../ExpenditureForm/ExpenditureForm';
import { getUserCategories } from '../services/request';
import Expenditures from '../Expenditures';
import './Wallet.css';
import Header from '../Header';
import SalaryForm from '../SalaryForm';
import ShowDate from '../ShowDate';
import BarChart from '../BarChart';
import DoughnutChartSalary from '../DoughnutChartSalary';
import DoughnutChartExpenses from '../DoughnutChartExpenses';
import ShowSalary from '../ShowSalary/ShowSalary';
import BlizterContext from '../context/BlizterContext';

function Wallet() {
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const { setIsUserLoggedIn, setIsExpenditureFormVisible, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    setIsUserLoggedIn(true);
    getUserCategories().then((data) => setUserCategories(data));
  }, []);

  return (
    <>
      {
        isSalaryFormVisible && (
          <SalaryForm setIsSalaryFormVisible={ setIsSalaryFormVisible } />
        )
      }
      <main className="wallet-page">
        <Header />
        <div className="wallet-page-content">
          <aside>
            {
              isExpenditureFormVisible && (
                <ExpenditureForm
                  setIsExpenditureFormVisible={ setIsExpenditureFormVisible }
                  userCategories={ userCategories }
                  setUserCategories={ setUserCategories }
                />
              )
            }
            <button
              type="button"
              className="create-expend-button"
              onClick={ () => { setIsExpenditureFormVisible(true); } }
            >
              Create Expend
            </button>
            <Expenditures userCategories={ userCategories } />
          </aside>
          <div className="charts-container">
            <div className="chart-header">
              <ShowSalary setIsSalaryFormVisible={ setIsSalaryFormVisible } />
              <ShowDate />
            </div>
            <div className="doughnuts-container">
              <DoughnutChartSalary />
              <DoughnutChartExpenses />
            </div>
            <BarChart />
          </div>
        </div>
      </main>
    </>
  );
}

export default Wallet;
