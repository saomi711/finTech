import { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

export function useExpenseContext() {
  return useContext(ExpenseContext);
}

export function ExpenseProvider({ children }) {
  const [expenseData, setExpenseData] = useState(null);

  return (
    <ExpenseContext.Provider value={{ expenseData, setExpenseData }}>
      {children}
    </ExpenseContext.Provider>
  );
}
