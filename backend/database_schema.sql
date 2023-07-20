DROP TABLE users;
DROP TABLE income;
DROP TABLE income_transaction;
DROP TABLE expense;
DROP TABLE expense_transaction;
DROP TABLE goal;
DROP TABLE bank_account;




CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE income (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  period VARCHAR(50),
  start DATE,
  "end" DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255)
);

CREATE TABLE income_transaction (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  note TEXT,
  income_id INTEGER REFERENCES income(id) ON DELETE CASCADE
);

CREATE TABLE expense (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  period VARCHAR(50),
  start DATE,
  "end" DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255)
);

CREATE TABLE expense_transaction (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  note TEXT,
  expense_id INTEGER REFERENCES expense(id) ON DELETE CASCADE
);

CREATE TABLE goal (
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

CREATE TABLE bank_account (
  id SERIAL PRIMARY KEY,
  bank_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
