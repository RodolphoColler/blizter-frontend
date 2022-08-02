import React, { useState, useEffect, useContext } from 'react';
import { Expenditures, ExpenditureForm, Header, SalaryForm, ShowDate, BarChart, DoughnutChartSalary, DoughnutChartExpenses, ShowBalance, NotSignedModal } from '../../components';
import BlizterContext from '../../context/BlizterContext';
import { getUserId } from '../../services/request';
import './Dashboard.scss';

function Dashboard() {
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const [isSignedModalVisible, setIsSignedModalVisible] = useState(false);
  const { setIsExpenditureFormVisible, isExpenditureFormVisible } = useContext(BlizterContext);

  async function validateSign() {
    try {
      await getUserId();
    } catch (error) {
      setIsSignedModalVisible(true);
    }
  }

  useEffect(() => { validateSign(); }, []);

  return (
    <>
      { isSignedModalVisible && <NotSignedModal /> }
      { isSalaryFormVisible && <SalaryForm setIsSalaryFormVisible={ setIsSalaryFormVisible } /> }
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
