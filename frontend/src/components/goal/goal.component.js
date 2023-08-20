import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup } from '@material-ui/core';
import GoalService from '../../services/goal.service';
import { useGoalContext } from '../../contexts/goal.context';
import { useGoalData } from '../../hooks/useGoalData';

const Goal = () => {
    const { goalData, setGoalData } = useGoalContext();
    const [rerender, setRerender] = useState(false);
    useGoalData();
    const navigate = useNavigate();
    
    useEffect(() => {
    }, []);

    const handleEdit = (goalId) => {
        navigate(`/editGoal/${goalId}`);
        console.log(`Editing goal with ID: ${goalId}`);
    };
    const handleAddGoal = () => {
        navigate(`/addGoal`);
    };

    const handleDelete = async (goalId) => {
      try {
        const response = await GoalService.deleteGoal(goalId);
        console.log('Response:', response); // Log response to check its content

        if (response && response.status === 200) {
            console.log(`Goal with ID ${goalId} has been deleted.`);
            setGoalData((prevGoalData) =>
                prevGoalData.filter((goal) => goal.id !== goalId)
            );
        }
    } catch (error) {
        console.error('Error deleting goal data:', error);
    }
    };

  if (!goalData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Grid container justify="center">
        <Button component={Link} to="/addGoal" color="secondary" onClick={() => handleAddGoal()}>
          Add Goal
        </Button>
      </Grid>
      <Grid container justify="center">
      <h2>Goal List</h2>
      </Grid>
      <List>
        {goalData.map((goal) => {

          return (
            
            <ListItem key={goal.id}>
              <Grid container justify="center" direction="column" alignItems="center">
              <ListItemText
                primary={`Title: ${goal.title}`}
                secondary={
                  <>
                    <strong>Description:</strong> {goal.description} <br />
                    <strong>Moneratry Value:</strong> {goal.monetary_value} <br />
                    <strong>Start Date:</strong> {goal.date} <br />
                    <strong>Priority:</strong> {goal.priority} <br />
                    <strong>Deadline:</strong> {goal.deadline} <br />
                    <strong>Status:</strong> {goal.is_achived} <br />
                  </>
                }
              />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => handleEdit(goal.id)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(goal.id)}>
                Delete
              </Button>
              </ButtonGroup>
              </Grid>
            </ListItem>
            
          );
        })}
      </List>

    </div>
  );
};

export default Goal;
