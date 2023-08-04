import axios from 'axios';

const API_URL = 'http://localhost:6600';

const AuthService = {
  login: async (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },
  register: async (email, password) => {
    return axios.post(`${API_URL}/register`, { email, password });
  },
  user: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  userIncome: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/income`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  setAuthToken: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
};

export default AuthService;