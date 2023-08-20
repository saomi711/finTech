// useIncomeData.js
import { useEffect } from 'react';
import BankAccountService from '../services/bank_account.service';
import { useBankAccountContext } from '../contexts/bank_account.context';

export function useBankAccountData() {
  const { setBankAccountData } = useBankAccountContext();

  useEffect(() => {
    const fetchBankAccountData = async () => {
      try {
        const response = await BankAccountService.getBankAccount();
        const fetchedBankAccountList = response.data;

        setBankAccountData(fetchedBankAccountList);
      } catch (error) {
        console.error('Error fetching bank-account data:', error);
      }
    };

    fetchBankAccountData();
  }, [setBankAccountData]);
}
