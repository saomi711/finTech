import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup } from '@material-ui/core';
import ExpenseService from '../../services/expense.service';
import { useExpenseContext } from '../../contexts/expense.context';
import { useExpenseData } from '../../hooks/useExpenseData';

const Expense = () => {
    const { expenseData, setExpenseData } = useExpenseContext();
    const [rerender, setRerender] = useState(false);
    useExpenseData();
    const navigate = useNavigate();
    const calculateExpenseDetails = (expense) => {
        const totalAmount = expense.transactions?.reduce((total, transaction) => total + parseFloat(transaction.amount), 0.0) ?? 0.0;

        const description = expense.transactions?.length > 0 ? expense.transactions[0].note : '';

        const date = expense.transactions?.length > 0 ? expense.transactions[expense.transactions.length - 1].date : '';

        return { totalAmount, description, date };
    };

    useEffect(() => {
    }, []);

    const handleEdit = (expenseId) => {
        navigate(`/editExpense/${expenseId}`);
        console.log(`Editing expense with ID: ${expenseId}`);
    };
    const handleAddExpense = () => {
        navigate(`/addExpense`);
    };

    const handleDelete = async (expenseId) => {
      try {
        const response = await ExpenseService.deleteExpense(expenseId);
        console.log('Response:', response); // Log response to check its content

        if (response && response.status === 200) {
            console.log(`Expense with ID ${expenseId} has been deleted.`);
            setExpenseData((prevexpenseData) =>
                prevexpenseData.filter((expense) => expense.id !== expenseId)
            );
        }
    } catch (error) {
        console.error('Error deleting expense data:', error);
    }
    };

  if (!expenseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Grid container justify="center">
        <Button component={Link} to="/addExpense" color="secondary" onClick={() => handleAddExpense()}>
          Add Expense
        </Button>
      </Grid>
      <Grid container justify="center">
      <h2>Expense List</h2>
      </Grid>
      <List>
        {expenseData.map((expense) => {
          const { totalAmount, description, date } = calculateExpenseDetails(expense);

          return (
            
            <ListItem key={expense.id}>
              <Grid container justify="center" direction="column" alignItems="center">
              <ListItemText
                primary={`Title: ${expense.title}`}
                secondary={
                  <>
                    <strong>Category:</strong> {expense.category} <br />
                    <strong>Total Amount:</strong> {totalAmount} <br />
                    <strong>Description:</strong> {description} <br />
                    <strong>Date:</strong> {date} <br />
                    {expense.category === 'Periodic' ? (
                    <>
                    <strong>Period:</strong> {expense.period} <br />
                    <strong>Start:</strong> {expense.start} <br />
                    <strong>End:</strong> {expense.end} <br />
                    </>
                    ) : null}
                    <strong>Institution:</strong> {expense.institution} <br />
                  </>
                }
              />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => handleEdit(expense.id)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(expense.id)}>
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

export default Expense;
