import React, { useState } from 'react';
import IncomeService from '../../services/income.service';

const AddIncome = () => {
  const [incomeData, setIncomeData] = useState({
    title: '',
    category: 'One Time',
    period: '', // Default to One Time, you can add a select input for Period if needed
    start: '',
    end: '',
    institution: '',
    date: '',
    amount: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage or user context

      // First, create the income using the AuthService function
      const incomeResponse = await IncomeService.addIncome(token, {
        title: incomeData.title,
        category: incomeData.category,
        period: incomeData.period,
        start: incomeData.start,
        end: incomeData.end,
        institution: incomeData.institution,
      });
      const incomeId = incomeResponse;
      // Next, create the income transactions
      const incomeTransactionData = {
          date: incomeData.date,
          amount: incomeData.amount,
          note: incomeData.note,
      };
    await IncomeService.addIncomeTransaction(token, incomeId, incomeTransactionData);
      

      // Reset the form after successful submission
      setIncomeData({
        title: '',
        category: 'One Time',
        period: '',
        start: '',
        end: '',
        institution: '',
        date: '',
        amount: '',
        note: '',
      });

      // You can also add a success message or redirect to a success page
    } catch (error) {
      console.error('Error adding income:', error);
      // Handle errors if necessary
    }
  };

  return (
    <div>
      <h2>Add Income</h2>
      <form onSubmit={handleAddIncome}>
        {/* Income fields */}
        <label>Title:</label>
        <input type="text" name="title" value={incomeData.title} onChange={handleChange} />

        <label>Category:</label>
        <select name="category" value={incomeData.category} onChange={handleChange}>
          <option value="One Time">One Time</option>
          <option value="Periodic">Periodic</option>
        </select>

        <label>Period:</label>
        <select name="period" value={incomeData.period} onChange={handleChange}>
          <option value="Yearly">Yearly</option>
          <option value="Monthly">Monthly</option>
          {/* Add other period options here if needed */}
        </select>

        <label>Start Date:</label>
        <input type="date" name="start" value={incomeData.start} onChange={handleChange} />

        <label>End Date:</label>
        <input type="date" name="end" value={incomeData.end} onChange={handleChange} />

        <label>Institution:</label>
        <input type="text" name="institution" value={incomeData.institution} onChange={handleChange} />

        {/* Income transaction fields */}
        <label>Date:</label>
        <input type="date" name="date" value={incomeData.date} onChange={handleChange} />

        <label>Amount:</label>
        <input type="number" name="amount" value={incomeData.amount} onChange={handleChange} />

        <label>Note:</label>
        <input type="text" name="note" value={incomeData.note} onChange={handleChange} />

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default AddIncome;
