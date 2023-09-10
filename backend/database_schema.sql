DROP TABLE users;
DROP TABLE income;
DROP TABLE income_transaction;
DROP TABLE expense;
DROP TABLE expense_transaction;
DROP TABLE goal;
DROP TABLE bank_account;


psql -h -p -U -w -W
psql postgres
\conninfo
\q
\c
\dt
\du
\list
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
psql -d postgres -U me -h 6000
CREATE DATABASE fintech;
\c fintech


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE incomes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  period VARCHAR(50),
  start DATE,
  "end" DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255)
);

CREATE TABLE income_transactions (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  note TEXT,
  income_id INTEGER REFERENCES incomes(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  period VARCHAR(50),
  start DATE,
  "end" DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255)
);

CREATE TABLE expense_transactions (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  note TEXT,
  expense_id INTEGER REFERENCES expenses(id) ON DELETE CASCADE
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  is_achieved BOOLEAN DEFAULT FALSE,
  description TEXT,
  monetary_value DECIMAL(10, 2) NOT NULL,
  date DATE,
  priority VARCHAR(50) NOT NULL,
  deadline DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bank_accounts (
  id SERIAL PRIMARY KEY,
  bank_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
