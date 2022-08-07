import React, { useState, useContext } from 'react';
import { Expenditures, ExpenditureForm, Header, SalaryForm, ShowDate, BarChart, DoughnutChartSalary, DoughnutChartExpenses, ShowBalance, NotSignedModal } from '../../components';
import BlizterContext from '../../context/BlizterContext';
import './Dashboard.scss';

function Dashboard() {
  const [isSalaryFormVisible, setIsSalaryFormVisible] = useState(false);
  const { setIsExpenditureFormVisible, isExpenditureFormVisible, isSignedModalVisible } = useContext(BlizterContext);

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
