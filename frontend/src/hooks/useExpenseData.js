// useIncomeData.js
import { useEffect } from 'react';
import ExpenseService from '../services/expense.service';
import { useExpenseContext } from '../contexts/expense.context';

export function useExpenseData() {
  const { setExpenseData } = useExpenseContext();

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await ExpenseService.getExpense();
        const fetchedExpenseList = response.data;

        const updatedExpenseList = await Promise.all(
          fetchedExpenseList.map(async (expense) => {
            const expenseId = expense.id;
            const transactionResponse = await ExpenseService.getExpenseTransactions(expenseId);
            const transactions = transactionResponse.data;
            return { ...expense, transactions };
          })
        );

        setExpenseData(updatedExpenseList);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchExpenseData();
  }, [setExpenseData]);
}
