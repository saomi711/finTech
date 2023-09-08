import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import ExpenseService from '../../services/expense.service';
import { useExpenseContext } from '../../contexts/expense.context';
import { useExpenseData } from '../../hooks/useExpenseData';
import ExpenseDashboard from './expense_dashboard.component';

const Expense = () => {
  const { expenseData, setExpenseData } = useExpenseContext();
  const [rerender, setRerender] = useState(false);
  const [openExpense, setOpenExpense] = useState(null);
  useExpenseData();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleEdit = (expenseId) => {
    navigate(`/editExpense/${expenseId}`);
    console.log(`Editing expense with ID: ${expenseId}`);
  };

  const handleAddExpense = () => {
    navigate(`/addExpense`);
  };

  const handleToggleCollapse = (expenseId) => {
    setOpenExpense(openExpense === expenseId ? null : expenseId);
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await ExpenseService.deleteExpense(expenseId);
      console.log('Response:', response); // Log response to check its content

      if (response && response.status === 200) {
        console.log(`Expense with ID ${expenseId} has been deleted.`);
        setExpenseData((prevExpenseData) =>
          prevExpenseData.filter((expense) => expense.id !== expenseId)
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
        <ExpenseDashboard/>
      </Grid>
      
      <Grid container justify="center">
        <Button component={Link} to="/addExpense" color="secondary" onClick={() => handleAddExpense()}>
          Add Expense
        </Button>
      </Grid>
      <Grid container justify="center">
        <h2>Expense List</h2>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Periodic Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseData.map((expense) => {
              const { totalAmount, description, date } = calculateExpenseDetails(expense);
              const isPeriodic = expense.category === 'Periodic';

              return (
                <React.Fragment key={expense.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleCollapse(expense.id)}
                      >
                        {openExpense === expense.id ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {expense.title}
                    </TableCell>
                    <TableCell align="center">{expense.category}</TableCell>
                    <TableCell align="center">{totalAmount}</TableCell>
                    <TableCell align="center">{description}</TableCell>
                    <TableCell align="center">{date}</TableCell>
                    <TableCell align="center">
                      {isPeriodic ? (
                        <>
                          <strong>Period:</strong> {expense.period} <br />
                          <strong>Start:</strong> {expense.start} <br />
                          <strong>End:</strong> {expense.end} <br />
                        </>
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      {expense.institution}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => handleEdit(expense.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(expense.id)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={openExpense === expense.id} timeout="auto" unmountOnExit>
                        <TableContainer component={Paper}>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Transaction Date</TableCell>
                                <TableCell>Transaction Amount</TableCell>
                                <TableCell>Transaction Note</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {expense.transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell>{transaction.date}</TableCell>
                                  <TableCell>{transaction.amount}</TableCell>
                                  <TableCell>{transaction.note}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Expense;

function calculateExpenseDetails(expense) {
  const totalAmount = expense.transactions?.reduce((total, transaction) => total + parseFloat(transaction.amount), 0.0) ?? 0.0;

  const description = expense.transactions?.length > 0 ? expense.transactions[0].note : '';

  const date = expense.transactions?.length > 0 ? expense.transactions[expense.transactions.length - 1].date : '';

  return { totalAmount, description, date };
}
