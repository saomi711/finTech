// useIncomeData.js
import { useEffect } from 'react';
import GoalService from '../services/goal.service';
import { useGoalContext } from '../contexts/goal.context';

export function useGoalData() {
  const { setGoalData } = useGoalContext();

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await GoalService.getGoal();
        const fetchedGoalList = response.data;

        setGoalData(fetchedGoalList);
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    fetchGoalData();
  }, [setGoalData]);
}
