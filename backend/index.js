const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/users.model');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/users.controller');
const incomeController = require('./controllers/income.controller');
const incomeTransactionController = require('./controllers/income_transaction.controller');
const expenseController = require('./controllers/expense.controller');
const expenseTransactionController = require('./controllers/expense_transaction.controller');
const goalController = require('./controllers/goal.controller');
const bankAccountController = require('./controllers/bank_account.controller');
const authenticateToken = require('./middleware/authenticate');
const cors = require('cors');

const app = express()
const db = require('./queries')
const port = 6600

// middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors());

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
//console.log(secretKey);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


// routes

app.post('/register', authController.register);
app.post('/login', authController.login);

app.post('/users', authenticateToken, userController.createUser);
//app.get('/users', authenticateToken, userController.getAllUsers);
app.get('/users', authenticateToken, userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// protected routes
app.use(authenticateToken);
app.get('/income', incomeController.getAllIncomes);
app.get('/income/:id', incomeController.getIncomeById);
app.post('/income', incomeController.createIncome);
app.put('/income/:id', incomeController.updateIncome);
app.delete('/income/:id', incomeController.deleteIncome);

app.post('/income/:income_id/transaction', incomeTransactionController.createIncomeTransaction);
app.get('/income/:income_id/transaction', incomeTransactionController.getAllIncomeTransactions);
app.get('/income/:income_id/transaction/:id', incomeTransactionController.getIncomeTransactionById);
app.put('/income/:income_id/transaction/:id', incomeTransactionController.updateIncomeTransaction);
app.delete('/income/:income_id/transaction/:id', incomeTransactionController.deleteIncomeTransaction);

app.post('/expense', expenseController.createExpense);
app.get('/expense', expenseController.getAllExpenses);
app.get('/expense/:id', expenseController.getExpenseById);
app.put('/expense/:id', expenseController.updateExpense);
app.delete('/expense/:id', expenseController.deleteExpense);

app.post('/expense-transaction', expenseTransactionController.createExpenseTransaction);
app.get('/expense-transaction', expenseTransactionController.getAllExpenseTransactions);
app.get('/expense-transaction/:id', expenseTransactionController.getExpenseTransactionById);
app.put('/expense-transaction/:id', expenseTransactionController.updateExpenseTransaction);
app.delete('/expense-transaction/:id', expenseTransactionController.deleteExpenseTransaction);

app.post('/goal', goalController.createGoal);
app.get('/goal', goalController.getAllGoals);
app.get('/goal/:id', goalController.getGoalById);
app.put('/goal/:id', goalController.updateGoal);
app.delete('/goal/:id', goalController.deleteGoal);

app.post('/bank-account', bankAccountController.createBankAccount);
app.get('/bank-account', bankAccountController.getAllBankAccounts);
app.get('/bank-account/:id', bankAccountController.getBankAccountById);
app.put('/bank-account/:id', bankAccountController.updateBankAccount);
app.delete('/bank-account/:id', bankAccountController.deleteBankAccount);


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})