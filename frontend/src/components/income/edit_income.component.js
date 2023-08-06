import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIncomeContext } from '../../contexts/income.context';
import IncomeService from '../../services/income.service';
import { useIncomeData } from '../../hooks/useIncomeData';

const EditIncome = () => {
  const { incomeId } = useParams();
  const navigate = useNavigate();
  const [ incomeData, setIncomeData ] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [transactionData, setTransactionData] = useState({
    date: '',
    amount: '',
    note: '',
  });

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await IncomeService.getIncomeById(incomeId);
        console.log(response.data);
        const income = response.data;
        const transactionResponse = await IncomeService.getIncomeTransactions(incomeId);
        const transactions = transactionResponse.data;
        const updatedResponse =  { ...income, transactions };
        setIncomeData(updatedResponse);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };
    fetchIncomeData();
  }, [incomeId, rerender]);

  const handleChangeIncome = async (e) => {
    const { name, value } = e.target;
    try {
      await IncomeService.editIncome(incomeId, { [name]: value });
      //const response = await IncomeService.getIncomeById(incomeId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error saving income data:', error);
    }
  };

  const handleChangeTransaction = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTransaction = async () => {
    try {
      await IncomeService.addIncomeTransaction(incomeId, transactionData);
      //setIncomeData(response.data);
      setTransactionData({
        date: '',
        amount: '',
        note: '',
      });
      setRerender(!rerender);
    } catch (error) {
      console.error('Error adding income transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await IncomeService.deleteIncomeTransaction(incomeId, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting income transaction:', error);
    }
  };

  const handleSaveIncome = async () => {
    try {
      //await IncomeService.deleteIncomeTransaction(incomeData.id, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting income transaction:', error);
    }
  };

  if (!incomeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Income</h2>
      <label>
        Title:
        <input type="text" name="title" value={incomeData.title} onChange={handleChangeIncome} />
      </label>
      {/* Other income fields (category, period, start, end, institution) */}
      <label>
  Category:
  <input
    type="text"
    name="category"
    value={incomeData?.category || ''}
    onChange={handleChangeIncome}
  />
</label>
<label>
  Period:
  <input
    type="text"
    name="period"
    value={incomeData?.period || ''}
    onChange={handleChangeIncome}
  />
</label>
<label>
  Start Date:
  <input
    type="date"
    name="start"
    value={incomeData?.start || ''}
    onChange={handleChangeIncome}
  />
</label>
<label>
  End Date:
  <input
    type="date"
    name="end"
    value={incomeData?.end || ''}
    onChange={handleChangeIncome}
  />
</label>
<label>
  Institution:
  <input
    type="text"
    name="institution"
    value={incomeData?.institution || ''}
    onChange={handleChangeIncome}
  />
</label>
      <button onClick={handleSaveIncome}>Save Income</button>
      <hr />
      <h3>Add Transaction</h3>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={transactionData.date}
          onChange={handleChangeTransaction}
        />
      </label>
      {/* Other transaction fields (amount, note) */}
      <label>
  Amount:
  <input
    type="number"
    name="amount"
    value={transactionData?.amount || ''}
    onChange={handleChangeTransaction}
  />
</label>
<label>
  Note:
  <input
    type="text"
    name="note"
    value={transactionData?.note || ''}
    onChange={handleChangeTransaction}
  />
</label>
      <button onClick={handleAddTransaction}>Add Transaction</button>
      <hr />
      <h3>Income Transactions</h3>
      <ul>
        {incomeData?.transactions?.map((transaction) => (
          <li key={transaction.id}>
            Date: {transaction.date} | Amount: {transaction.amount} | Note: {transaction.note}
            <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditIncome;
