import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup } from '@material-ui/core';
import IncomeService from '../../services/income.service';
import { useIncomeContext } from '../../contexts/income.context';
import { useIncomeData } from '../../hooks/useIncomeData';

const Income = () => {
    const { incomeData, setIncomeData } = useIncomeContext();
    const [rerender, setRerender] = useState(false);
    useIncomeData();
    const navigate = useNavigate();
    const calculateIncomeDetails = (income) => {
        const totalAmount = income.transactions?.reduce((total, transaction) => total + parseFloat(transaction.amount), 0.0) ?? 0.0;

        const description = income.transactions?.length > 0 ? income.transactions[0].note : '';

        const date = income.transactions?.length > 0 ? income.transactions[income.transactions.length - 1].date : '';

        return { totalAmount, description, date };
    };

    useEffect(() => {
    }, []);

    const handleEdit = (incomeId) => {
        navigate(`/editIncome/${incomeId}`);
        console.log(`Editing income with ID: ${incomeId}`);
    };
    const handleAddIncome = () => {
        navigate(`/addIncome`);
    };

    const handleDelete = async (incomeId) => {
      try {
        const response = await IncomeService.deleteIncome(incomeId);
        console.log('Response:', response); // Log response to check its content

        if (response && response.status === 200) {
            console.log(`Income with ID ${incomeId} has been deleted.`);
            setIncomeData((prevIncomeData) =>
                prevIncomeData.filter((income) => income.id !== incomeId)
            );
        }
    } catch (error) {
        console.error('Error deleting income data:', error);
    }
    };

  if (!incomeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Grid container justify="center">
        <Button component={Link} to="/addIncome" color="secondary" onClick={() => handleAddIncome()}>
          Add Income
        </Button>
      </Grid>
      <Grid container justify="center">
      <h2>Income List</h2>
      </Grid>
      <List>
        {incomeData.map((income) => {
          const { totalAmount, description, date } = calculateIncomeDetails(income);

          return (
            
            <ListItem key={income.id}>
              <Grid container justify="center" direction="column" alignItems="center">
              <ListItemText
                primary={`Title: ${income.title}`}
                secondary={
                  <>
                    <strong>Category:</strong> {income.category} <br />
                    <strong>Total Amount:</strong> {totalAmount} <br />
                    <strong>Description:</strong> {description} <br />
                    <strong>Date:</strong> {date} <br />
                    {income.category === 'Periodic' ? (
                    <>
                    <strong>Period:</strong> {income.period} <br />
                    <strong>Start:</strong> {income.start} <br />
                    <strong>End:</strong> {income.end} <br />
                    </>
                    ) : null}
                    <strong>Institution:</strong> {income.institution} <br />
                  </>
                }
              />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => handleEdit(income.id)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(income.id)}>
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

export default Income;
