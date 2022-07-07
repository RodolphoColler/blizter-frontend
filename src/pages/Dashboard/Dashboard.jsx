import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCategories } from '../../services/request';
import { Expenditures, ExpenditureForm, Header, SalaryForm, ShowDate, BarChart, DoughnutChartSalary, DoughnutChartExpenses, ShowBalance } from '../../components';
import BlizterContext from '../../context/BlizterContext';
import './Dashboard.scss';

function Dashboard() {
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const navigate = useNavigate();
  const { setIsUserLoggedIn, setIsExpenditureFormVisible, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (localStorage.getItem('token')) return;

    navigate('/signin');
  }, []);

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
      <main className="dashboard-page">
        <Header />
        <div className="dashboard-page-content">
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
          <section className="charts-container">
            <div className="chart-header">
              <ShowBalance setIsSalaryFormVisible={ setIsSalaryFormVisible } />
              <ShowDate />
            </div>
            <div className="doughnuts-container">
              <DoughnutChartSalary />
              <DoughnutChartExpenses />
            </div>
            <BarChart />
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
