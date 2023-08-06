import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeService from '../../services/income.service';
import { useIncomeContext } from '../../contexts/income.context';
import { useIncomeData } from '../../hooks/useIncomeData';

const Income = () => {
    const { incomeData, setIncomeData } = useIncomeContext();
    useIncomeData();
    const navigate = useNavigate();
    const calculateIncomeDetails = (income) => {
        const totalAmount = income.transactions?.reduce((total, transaction) => total + parseFloat(transaction.amount), 0.0) ?? 0.0;

        const description = income.transactions?.length > 0 ? income.transactions[0].note : '';

        const date = income.transactions?.length > 0 ? income.transactions[income.transactions.length - 1].date : '';

        return { totalAmount, description, date };
    };

    useEffect(() => {
    }, []);

    const handleEdit = (incomeId) => {
        navigate(`/editIncome/${incomeId}`);
        console.log(`Editing income with ID: ${incomeId}`);
    };

    const handleDelete = async (incomeId) => {
        try {
            const response = await IncomeService.deleteIncome(incomeId);
            if (response.status === 200) {
                console.log(`Income with ID ${incomeId} has been deleted.`);
                setIncomeData((prevIncomeData) => prevIncomeData.filter((income) => income.id !== incomeId));
            }
        } catch (error) {
        console.error('Error deleting income data:', error);
        }
    };

  if (!incomeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Income List</h2>
      <ul>
        {incomeData.map((income) => {
            const { totalAmount, description, date } = calculateIncomeDetails(income);
 
            return (
                <li key={income.id}>
                    <strong>Title:</strong> {income.title} <br />
                    <strong>Category:</strong> {income.category} <br />
                    <strong>Total Amount:</strong> {totalAmount} <br />
                    <strong>Description:</strong> {description} <br />
                    <strong>Date:</strong> {date} <br />
                    <strong>Period:</strong> {income.period} <br />
                    <strong>Start:</strong> {income.start} <br />
                    <strong>End:</strong> {income.end} <br />
                    <strong>Institution:</strong> {income.institution} <br />
                        {/* Edit button */}
                    <button onClick={() => handleEdit(income.id)}>Edit</button>
                    {/* Delete button */}
                    <button onClick={() => handleDelete(income.id)}>Delete</button>
                </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Income;
