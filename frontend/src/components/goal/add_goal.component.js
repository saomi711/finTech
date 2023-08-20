import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import GoalService from '../../services/goal.service';
import { useNavigate } from 'react-router-dom';

const AddGoal = () => {
  const navigate = useNavigate();
  const [goalData, setGoalData] = useState({
    title: '',
    is_achived: false,
    description: '',
    monetary_value: '',
    date: '',
    priority: 'medium',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      
      const goalResponse = await GoalService.addGoal({
        title: goalData.title,
        is_achived: goalData.is_achived,
        description: goalData.description,
        monetary_value: goalData.monetary_value,
        date: goalData.date,
        priority: goalData.priority,
        deadline: goalData.deadline,
      });
      const goalId = goalResponse;
      
      setGoalData({
        title: '',
        is_achived: false,
        description: '',
        monetary_value: '',
        date: '',
        priority: 'medium',
      });

    } catch (error) {
      console.error('Error adding goal:', error);
    }
    navigate("/goal");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleAddGoal} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Add Goal</h2>
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
            <Button type="submit" variant="contained" color="primary" onClick={handleAddGoal}>
              Add Goal
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddGoal;
