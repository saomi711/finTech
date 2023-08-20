import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FormControl,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import { useGoalContext } from '../../contexts/goal.context';
import GoalService from '../../services/goal.service';
import { useGoalData } from '../../hooks/useGoalData';

const EditGoal = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [ goalData, setGoalData ] = useState(null);
  const [rerender, setRerender] = useState(false);
  
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await GoalService.getGoalById(goalId);
        console.log(response.data);
        const goal = response.data;
        setGoalData(goal);
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };
    fetchGoalData();
  }, [goalId, rerender]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    try {
      await GoalService.editGoal(goalId, { [name]: value });
      //const response = await IncomeService.getIncomeById(incomeId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error saving goal data:', error);
    }
  };

  
  const handleSaveGoal = async () => {
    try {
      //await IncomeService.deleteIncomeTransaction(incomeData.id, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
    navigate("/goal");
  };

  if (!goalData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSaveGoal} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Edit Goal</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                name="title"
                value={goalData.title}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="isAchived"
                name="is_achived"
                value={goalData.is_achived}
                onChange={handleChange}
                select
              >
                <MenuItem value="false">Not Achived</MenuItem>
                <MenuItem value="true">Achived</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                value={goalData.description}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Monetary Value"
                name="monetary_value"
                type="number"
                value={goalData.monetary_value}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={goalData.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Priority"
                name="priority"
                value={goalData.priority}
                onChange={handleChange}
                select
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                {/* Add other period options here if needed */}
              </TextField>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Deadline"
                name="deadline"
                type="date"
                value={goalData.deadline}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleChange}>
              Edit Goal
            </Button>
          </Grid>
        </Grid>
          
      </form>
    </div>

    </>
  );
};

export default EditGoal;
