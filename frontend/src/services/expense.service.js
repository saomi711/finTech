import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:6600';

const ExpenseService = {
  getExpense: async () => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/expense`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  getExpenseById: async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/expense/${expenseId}`);
  
      return response; // Return the specific income data
    } catch (error) {
      throw error;
    }
  },
  addExpense: async (expenseData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const expenseResponse = await axios.post(`${API_URL}/expense`, expenseData);

      const { id: expenseId } = expenseResponse.data;

      return expenseId; 
    } catch (error) {
      throw error;
    }
  },
  editExpense: async (expenseId, updatedExpenseData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const expenseResponse = await axios.put(`${API_URL}/expense/${expenseId}`, updatedExpenseData);
  
      return expenseResponse;
    } catch (error) {
      throw error;
    }
  },
  addExpenseTransaction: async (expenseId, transactionData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const transactionResponse = await axios.post(`${API_URL}/expense/${expenseId}/transaction`,transactionData);

      return transactionResponse;
    } catch (error) {
      throw error;
    }
  },
  editExpenseTransaction: async (expenseId, transactionId, updatedTransactionData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const transactionResponse = await axios.put(
        `${API_URL}/expense/${expenseId}/transaction/${transactionId}`,
        updatedTransactionData
      );
  
      return transactionResponse;
    } catch (error) {
      throw error;
    }
  },
  getExpenseTransactions: async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/expense/${expenseId}/transaction`);
  
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  deleteExpense:  async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/expense/${expenseId}`);
      if (response.status === 200) {
        console.log(`Expense with ID ${expenseId} has been deleted.`);
      } else {
        throw new Error(`Failed to delete Expense with ID ${expenseId}.`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteExpenseTransaction: async (expenseId, transactionId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/expense/${expenseId}/transaction/${transactionId}`);
      if (response.status === 200) {
        console.log(`Income transaction with ID ${transactionId} has been deleted.`);
      } else {
        throw new Error(`Failed to delete income transaction with ID ${transactionId}.`);
      }
    } catch (error) {
      throw error;
    }
  },
  


};

export default ExpenseService;
