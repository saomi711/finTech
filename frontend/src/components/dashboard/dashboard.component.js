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
import { Grid } from '@material-ui/core';
import IncomeService from '../../services/income.service';
import ExpenseService from '../../services/expense.service'; 
import { useIncomeContext } from '../../contexts/income.context';
import { useExpenseContext } from '../../contexts/expense.context'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { incomeData } = useIncomeContext();
  const { expenseData } = useExpenseContext(); // Get expense data
  const currentYear = new Date().getFullYear();

  const monthlyIncome = useMemo(() => {
    if (!incomeData || !incomeData.length) return [];

    const groupedMonthlyIncome = [];

    const incomeByMonth = new Map();

    incomeData.forEach((income) => {
      if (income.transactions && income.transactions.length) {
        income.transactions.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (transactionDate.getFullYear() === currentYear) {
            const month = transactionDate.getMonth();
            const incomeAmount = parseFloat(transaction.amount);

            if (!incomeByMonth.has(month)) {
              incomeByMonth.set(month, incomeAmount);
            } else {
              incomeByMonth.set(month, incomeByMonth.get(month) + incomeAmount);
            }
          }
        });
      }
    });

    for (let i = 0; i < 12; i++) {
      const monthIncome = incomeByMonth.get(i) || 0;
      groupedMonthlyIncome.push(monthIncome);
    }

    return groupedMonthlyIncome;
  }, [incomeData, currentYear]);

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

  const monthlySavings = useMemo(() => {
    const savings = [];
    for (let i = 0; i < 12; i++) {
      const savingsAmount = (monthlyIncome[i] || 0) - (monthlyExpense[i] || 0);
      savings.push(savingsAmount);
    }
    return savings;
  }, [monthlyIncome, monthlyExpense]);

  useEffect(() => {
    async function fetchMonthlyData() {
      try {
        console.log('Monthly Income:', monthlyIncome);
        console.log('Monthly Expense:', monthlyExpense);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    }

    fetchMonthlyData();
  }, [monthlyIncome, monthlyExpense, monthlySavings]);

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
        label: `Monthly Income (${currentYear})`,
        data: monthlyIncome,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderWidth: 1,
      },
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
        text: 'Monthly Income and Expense Chart',
      },
    },
  };

  const savingsChartData = {
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
        label: `Monthly Savings (${currentYear})`,
        data: monthlySavings,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const savingsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Savings Chart',
      },
    },
  };


  return (
    <div>
      <Grid container justify="center">
        <h2>Dashboard</h2>
      </Grid>
      <Grid container justify="center">
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      </Grid>
      <Grid container justify="center">
        <div style={{ height: '400px', width: '600px' }}>
          <Bar data={savingsChartData} options={savingsChartOptions} />
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
