import { createContext, useContext, useState } from 'react';

const BankAccountContext = createContext();

export function useBankAccountContext() {
  return useContext(BankAccountContext);
}

export function BankAccountProvider({ children }) {
  const [bankAccountData, setBankAccountData] = useState(null);

  return (
    <BankAccountContext.Provider value={{ bankAccountData, setBankAccountData }}>
      {children}
    </BankAccountContext.Provider>
  );
}
