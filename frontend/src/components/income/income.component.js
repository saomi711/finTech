import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup, Tab } from '@material-ui/core';
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
import IncomeService from '../../services/income.service';
import { useIncomeContext } from '../../contexts/income.context';
import { useIncomeData } from '../../hooks/useIncomeData';
import IncomeDashboard from './income_dashboard.component';

const Income = () => {
    const { incomeData, setIncomeData } = useIncomeContext();
    const [rerender, setRerender] = useState(false);
    const [openIncome, setOpenIncome] = useState(null);
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
    const handleToggleCollapse = (incomeId) => {
      setOpenIncome(openIncome === incomeId ? null : incomeId);
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
        <IncomeDashboard/>
      </Grid>
      
      <Grid container justify="center">
        <Button component={Link} to="/addIncome" color="secondary" onClick={() => handleAddIncome()}>
          Add Income
        </Button>
      </Grid>
      <Grid container justify="center">
      <h2>Income List</h2>
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
              <TableCell align="center">Institution</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
      <TableBody>
        {incomeData.map((income) => {
        const { totalAmount, description, date } = calculateIncomeDetails(income);
        const isPeriodic = income.category === 'Periodic';

      return (
        <React.Fragment key={income.id}>
          <TableRow>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => handleToggleCollapse(income.id)}
                >
                  {openIncome === income.id ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {income.title}
              </TableCell>
              <TableCell align="center">
                {income.category}
              </TableCell>
              <TableCell align="center">
                {totalAmount}
              </TableCell>
              <TableCell align="center">
                {description}
              </TableCell>
              <TableCell align="center">
                {date}
              </TableCell>
              <TableCell align="center">
                {isPeriodic ? (
                <>
                  <strong>Period:</strong> {income.period} <br />
                  <strong>Start:</strong> {income.start} <br />
                  <strong>End:</strong> {income.end} <br />
                </>
                ) : null}
              </TableCell>
              <TableCell align="center">
                {income.institution}
              </TableCell>
              <TableCell align="center">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button onClick={() => handleEdit(income.id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(income.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={openIncome === income.id} timeout="auto" unmountOnExit>
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
                      {income.transactions.map((transaction) => (
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

export default Income;
