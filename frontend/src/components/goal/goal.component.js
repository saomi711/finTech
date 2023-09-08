import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, CircularProgress } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { CheckCircleOutline, Cached } from '@material-ui/icons'; 
import GoalService from '../../services/goal.service';
import { useGoalContext } from '../../contexts/goal.context';
import { useGoalData } from '../../hooks/useGoalData';
import { useIncomeContext } from '../../contexts/income.context';
import { useExpenseContext } from '../../contexts/expense.context';
import { useIncomeData } from '../../hooks/useIncomeData';
import { useExpenseData } from '../../hooks/useExpenseData';

const Goal = () => {
    const { goalData, setGoalData } = useGoalContext();
    const [openGoal, setOpenGoal] = useState(null);
    useGoalData();
    const navigate = useNavigate();
    const { incomeData } = useIncomeContext();
    const { expenseData } = useExpenseContext();
    useIncomeData();
    useExpenseData();

    useEffect(() => {
    }, []);

    const handleEdit = (goalId) => {
        navigate(`/editGoal/${goalId}`);
        console.log(`Editing goal with ID: ${goalId}`);
    };

    const handleAddGoal = () => {
        navigate(`/addGoal`);
    };

    const handleToggleCollapse = (goalId) => {
        setOpenGoal(openGoal === goalId ? null : goalId);
    };

    const handleDelete = async (goalId) => {
        try {
            const response = await GoalService.deleteGoal(goalId);
            console.log('Response:', response);

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

    const calculateGoalResidue = () => {
      const totalExpenses = expenseData.reduce((total, expense) => {
        const expenseTransactionTotal = expense.transactions.reduce(
          (transactionTotal, transaction) =>
            transactionTotal + parseFloat(transaction.amount),
          0
        );
        return total + expenseTransactionTotal;
      }, 0);
    
      const totalIncomes = incomeData.reduce((total, income) => {
        const incomeTransactionTotal = income.transactions.reduce(
          (transactionTotal, transaction) =>
            transactionTotal + parseFloat(transaction.amount),
          0
        );
        return total + incomeTransactionTotal;
      }, 0);
    
      return -(totalExpenses - totalIncomes);
    };
    
    
    if (!goalData || !incomeData || !expenseData) {
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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Title</TableCell>
                            <TableCell align="center">Priority</TableCell>
                            <TableCell align="center">Deadline</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goalData.map((goal) => {
                          const residue = calculateGoalResidue();
                          const isGoalAchievable = residue >= goal.monetary_value;
                          return(
                            <React.Fragment key={goal.id}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleToggleCollapse(goal.id)}
                                        >
                                            {openGoal === goal.id ? (
                                                <KeyboardArrowUp />
                                            ) : (
                                                <KeyboardArrowDown />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {goal.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {goal.priority}
                                    </TableCell>
                                    <TableCell align="center">
                                        {goal.deadline}
                                    </TableCell>
                                    <TableCell align="center">
                                        {goal.monetary_value}
                                    </TableCell>
                                    <TableCell align="center">
                                    {goal.isAchieved && <CheckCircleOutline color="success" fontSize="large" />}
                                    {!goal.isAchieved && <Cached color="success" fontSize="large" />}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button onClick={() => handleEdit(goal.id)}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(goal.id)}>
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                        <Collapse in={openGoal === goal.id} timeout="auto" unmountOnExit>
                                            <TableContainer component={Paper}>
                                                <Table size="small" aria-label="details">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Description</TableCell>
                                                            <TableCell>Start Date</TableCell>
                                                            <TableCell>Deadline</TableCell>
                                                            <TableCell>Achievability</TableCell>
                                                            <TableCell>Progress</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>{goal.description}</TableCell>
                                                            <TableCell>{goal.date}</TableCell>
                                                            <TableCell>{goal.deadline}</TableCell>
                                                            <TableCell>
                                                              {isGoalAchievable ? 100 : (residue / goal.monetary_value * 100).toFixed(2)}
                                                            </TableCell>
                                                            <TableCell>
                                                            <CircularProgress variant="determinate" value={isGoalAchievable ? 100 : ((residue / goal.monetary_value) * 100)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Goal;
