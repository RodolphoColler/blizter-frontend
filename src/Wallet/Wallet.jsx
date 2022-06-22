import React, { useState, useEffect } from 'react';
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

function Wallet() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
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
              className="create-expend-button"
              onClick={ () => { setIsFormVisible(!isFormVisible); } }
            >
              Create Expend
            </button>
            <Expenditures userCategories={ userCategories } isFormVisible={ isFormVisible } />
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
