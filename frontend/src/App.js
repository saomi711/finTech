import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './services/auth.service';
import Login from './components/login/login.component';
import Logout from './components/logout/logout.component';
import Register from './components/register/register.component';
import NavBar from './components/navbar/navbar.component';
import Dashboard from './components/dashboard/dashboard.component';
import Income from './components/income/income.component';
import AddIncome from './components/income/add_income.component';
import EditIncome from './components/income/edit_income.component';
import Expense from './components/expense/expense.component';
import AddExpense from './components/expense/add_expense.component';
import EditExpense from './components/expense/edit_expense.component';

const App = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if token is not present
    return <Login />;
  }
  AuthService.setAuthToken(token);
  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/income" element={<Income />} />
          <Route path="/addIncome" element={<AddIncome />} />
          <Route path="/editIncome/:incomeId" element={<EditIncome />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/editExpense/:expenseId" element={<EditExpense />} />
        </Routes>
      </div>

  );
};

export default App;
