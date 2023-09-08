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
import IncomeService from '../../services/income.service';
import { useIncomeContext } from '../../contexts/income.context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeDashboard = () => {
    const { incomeData } = useIncomeContext();
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
  
    useEffect(() => {
      async function fetchMonthlyIncome() {
        try {
          console.log('Monthly Income:', monthlyIncome);
        } catch (error) {
          console.error('Error fetching monthly income data:', error);
        }
      }
  
      fetchMonthlyIncome();
    }, [monthlyIncome]);

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
        text: 'Monthly Income Chart',
      },
    },
  };
  return (
    <div>
      <Grid container justify="center">
      <h2>Income Dashboard</h2>
      </Grid>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default IncomeDashboard;
