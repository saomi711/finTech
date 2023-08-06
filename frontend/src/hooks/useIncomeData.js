// useIncomeData.js
import { useEffect } from 'react';
import IncomeService from '../services/income.service';
import { useIncomeContext } from '../contexts/income.context';

export function useIncomeData() {
  const { setIncomeData } = useIncomeContext();

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await IncomeService.getIncome();
        const fetchedIncomeList = response.data;

        const updatedIncomeList = await Promise.all(
          fetchedIncomeList.map(async (income) => {
            const incomeId = income.id;
            const transactionResponse = await IncomeService.getIncomeTransactions(incomeId);
            const transactions = transactionResponse.data;
            return { ...income, transactions };
          })
        );

        setIncomeData(updatedIncomeList);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchIncomeData();
  }, [setIncomeData]);
}
