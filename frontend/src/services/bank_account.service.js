import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:6600';

const BankAccountService = {
  getBankAccount: async () => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/bank-account`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  getBankAccountById: async (bankAccountId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/bank-account/${bankAccountId}`);
  
      return response; // Return the specific income data
    } catch (error) {
      throw error;
    }
  },
  addBankAccount: async (bankAccountData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const bankAccountResponse = await axios.post(`${API_URL}/bank-account`, bankAccountData);

      const { id: bankAccountId } = bankAccountResponse.data;

      return bankAccountId; 
    } catch (error) {
      throw error;
    }
  },
  editBankAccount: async (bankAccountId, updatedbankAccountData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const bankAccountResponse = await axios.put(`${API_URL}/bank-account/${bankAccountId}`, updatedbankAccountData);
  
      return bankAccountResponse;
    } catch (error) {
      throw error;
    }
  },
  
  deleteBankAccount:  async (bankAccountId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/bank-account/${bankAccountId}`);
      if (response.status === 200) {
        console.log(`BankAccount with ID ${bankAccountId} has been deleted.`);
      } else {
        throw new Error(`Failed to delete BankAccount with ID ${bankAccountId}.`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  


};

export default BankAccountService;
