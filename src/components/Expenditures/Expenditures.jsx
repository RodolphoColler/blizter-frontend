import { useEffect, useContext, useState } from 'react';
import { ExpenditureDropDown } from '..';
import { getExpenditures } from '../../services/request';
import BlizterContext from '../../context/BlizterContext';
import './Expenditures.css';

function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const { date, isExpenditureFormVisible } = useContext(BlizterContext);

  function arrayToObject(expends) {
    const expenditureObject = {};

    expends.forEach((expend) => {
      const { category: { name } } = expend;

      if (!expenditureObject[name]) expenditureObject[name] = [expend];

      else expenditureObject[name] = [...expenditureObject[name], expend];
    });

    return expenditureObject;
  }

  async function formattedExpenditures() {
    const expends = await getExpenditures(date);

    const formattedObject = arrayToObject(expends);

    setExpenditures(formattedObject);
  }

  useEffect(() => { formattedExpenditures(); }, [date, isExpenditureFormVisible]);

  return (
    <div className="expend-categories-container">
      {
        Object.keys(expenditures)
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <ExpenditureDropDown category={ category } expenditures={ expenditures[category] } key={ category } />
          ))
      }
    </div>
  );
}

export default Expenditures;
