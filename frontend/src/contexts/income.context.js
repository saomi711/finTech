// IncomeContext.js
import { createContext, useContext, useState } from 'react';

const IncomeContext = createContext();

export function useIncomeContext() {
  return useContext(IncomeContext);
}

export function IncomeProvider({ children }) {
  const [incomeData, setIncomeData] = useState(null);

  return (
    <IncomeContext.Provider value={{ incomeData, setIncomeData }}>
      {children}
    </IncomeContext.Provider>
  );
}
