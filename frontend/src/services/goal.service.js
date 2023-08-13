import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:6600';

const GoalService = {
  getGoal: async () => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/goal`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  getGoalById: async (goalId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.get(`${API_URL}/goal/${goalId}`);
  
      return response; // Return the specific income data
    } catch (error) {
      throw error;
    }
  },
  addGoal: async (goalData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const goalResponse = await axios.post(`${API_URL}/goal`, goalData);

      const { id: goalId } = goalResponse.data;

      return goalId; 
    } catch (error) {
      throw error;
    }
  },
  editGoal: async (goalId, updatedGoalData) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const goalResponse = await axios.put(`${API_URL}/goal/${goalId}`, updatedGoalData);
  
      return goalResponse;
    } catch (error) {
      throw error;
    }
  },
  
  deleteGoal:  async (goalId) => {
    try {
      const token = localStorage.getItem('token');
      AuthService.setAuthToken(token);
      const response = await axios.delete(`${API_URL}/goal/${goalId}`);
      if (response.status === 200) {
        console.log(`Goal with ID ${goalId} has been deleted.`);
      } else {
        throw new Error(`Failed to delete Goal with ID ${goalId}.`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  


};

export default GoalService;
