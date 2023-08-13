import { createContext, useContext, useState } from 'react';

const GoalContext = createContext();

export function useGoalContext() {
  return useContext(GoalContext);
}

export function GoalProvider({ children }) {
  const [goalData, setGoalData] = useState(null);

  return (
    <GoalContext.Provider value={{ goalData, setGoalData }}>
      {children}
    </GoalContext.Provider>
  );
}
