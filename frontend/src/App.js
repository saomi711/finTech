import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './services/auth.service';
import Login from './components/login/login.component';
import Register from './components/register/register.component';
import NavBar from './components/navbar/navbar.component';
import Income from './components/income/income.component';
import Logout from './components/logout/logout.component';
import AddIncome from './components/income/add_income.component';
import EditIncome from './components/income/edit_income.component';

const App = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if token is not present
    return <Login />;
  }
  AuthService.setAuthToken(token);
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/income" element={<Income />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addIncome" element={<AddIncome />} />
          <Route path="/editIncome/:incomeId" element={<EditIncome />} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;
