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
  addIncomeTransaction: async (incomeId, transactionData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const transactionResponse = await axios.post(`${API_URL}/income/${incomeId}/transaction`,transactionData);

      return transactionResponse.data;
    } catch (error) {
      throw error;
    }
  },
  getAllIncomeTransactions: async (incomeId) => {
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
    } catch (error) {
      throw error;
    }
  },


};

export default IncomeService;
