import React, { useEffect, useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {  Grid } from '@material-ui/core';
import ExpenseService from '../../services/expense.service';
import { useExpenseContext } from '../../contexts/expense.context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseDashboard = () => {
    const { expenseData } = useExpenseContext();
    const currentYear = new Date().getFullYear();
  
    const monthlyExpense = useMemo(() => {
      if (!expenseData || !expenseData.length) return [];
  
      const groupedMonthlyExpense = [];
  
      const expenseByMonth = new Map();
  
      expenseData.forEach((expense) => {
        if (expense.transactions && expense.transactions.length) {
            expense.transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getFullYear() === currentYear) {
              const month = transactionDate.getMonth();
              const expenseAmount = parseFloat(transaction.amount);
  
              if (!expenseByMonth.has(month)) {
                expenseByMonth.set(month, expenseAmount);
              } else {
                expenseByMonth.set(month, expenseByMonth.get(month) + expenseAmount);
              }
            }
          });
        }
      });
 
      for (let i = 0; i < 12; i++) {
        const monthExpense = expenseByMonth.get(i) || 0;
        groupedMonthlyExpense.push(monthExpense);
      }
  
      return groupedMonthlyExpense;
    }, [expenseData, currentYear]);
  
    useEffect(() => {
      async function fetchMonthlyExpense() {
        try {
          console.log('Monthly Expense:', monthlyExpense);
        } catch (error) {
          console.error('Error fetching monthly expense data:', error);
        }
      }
  
      fetchMonthlyExpense();
    }, [monthlyExpense]);

  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: `Monthly Expense (${currentYear})`,
        data: monthlyExpense,
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expense Chart',
      },
    },
  };
  return (
    <div>
      <Grid container justify="center">
      <h2>Expense Dashboard</h2>
      </Grid>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseDashboard;
