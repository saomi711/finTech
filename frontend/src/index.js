import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/auth.context';
import { IncomeProvider } from './contexts/income.context';
import { ExpenseProvider } from './contexts/expense.context';
import { GoalProvider } from './contexts/goal.context';
import { BankAccountProvider } from './contexts/bank_account.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <AuthProvider>
      <IncomeProvider>
      <ExpenseProvider>
      <GoalProvider>
      <BankAccountProvider>
        <Router>
          <App />
        </Router>
      </BankAccountProvider>
      </GoalProvider>
      </ExpenseProvider>
      </IncomeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
