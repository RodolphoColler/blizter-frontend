import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Expenditures, ExpenditureForm, Header, SalaryForm, ShowDate, BarChart, DoughnutChartSalary, DoughnutChartExpenses, ShowBalance } from '../../components';
import BlizterContext from '../../context/BlizterContext';
import './Dashboard.scss';

function Dashboard() {
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsExpenditureFormVisible, isExpenditureFormVisible } = useContext(BlizterContext);

  useEffect(() => {
    if (localStorage.getItem('token')) return;

    navigate('/signin');
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
            { isExpenditureFormVisible && <ExpenditureForm /> }
            <button
              type="button"
              className="create-expend-button"
              onClick={ () => { setIsExpenditureFormVisible(true); } }
            >
              Create Expend
            </button>
            <Expenditures />
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
            <div className="bar-chart-container">
              <BarChart />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
