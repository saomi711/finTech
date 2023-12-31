import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:6600';

const IncomeService = {
  getIncome: async () => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/income`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  getIncomeById: async (incomeId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/income/${incomeId}`);
  
      return response; // Return the specific income data
    } catch (error) {
      throw error;
    }
  },
  addIncome: async (incomeData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const incomeResponse = await axios.post(`${API_URL}/income`, incomeData);

      const { id: incomeId } = incomeResponse.data;

      return incomeId; 
    } catch (error) {
      throw error;
    }
  },
  editIncome: async (incomeId, updatedIncomeData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const incomeResponse = await axios.put(`${API_URL}/income/${incomeId}`, updatedIncomeData);
  
      return incomeResponse;
    } catch (error) {
      throw error;
    }
  },
  addIncomeTransaction: async (incomeId, transactionData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const transactionResponse = await axios.post(`${API_URL}/income/${incomeId}/transaction`,transactionData);

      return transactionResponse;
    } catch (error) {
      throw error;
    }
  },
  editIncomeTransaction: async (incomeId, transactionId, updatedTransactionData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const transactionResponse = await axios.put(
        `${API_URL}/income/${incomeId}/transaction/${transactionId}`,
        updatedTransactionData
      );
  
      return transactionResponse;
    } catch (error) {
      throw error;
    }
  },
  getIncomeTransactions: async (incomeId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/income/${incomeId}/transaction`);
  
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  deleteIncome:  async (incomeId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/income/${incomeId}`);
      if (response.status === 200) {
        console.log(`Income with ID ${incomeId} has been deleted.`);
      } else {
        throw new Error(`Failed to delete income with ID ${incomeId}.`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteIncomeTransaction: async (incomeId, transactionId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/income/${incomeId}/transaction/${transactionId}`);
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

export default IncomeService;
