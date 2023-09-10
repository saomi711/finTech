import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service'; // Adjust the path to match your file structure

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const userResponse = await AuthService.user(token);
            if (userResponse.data) {
                setLoggedIn(true);
                setUser(userResponse.data);
            }
            console.log(userResponse.data);
            
          }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
  
      checkLoggedIn();
  }, []);


  

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
