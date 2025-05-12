const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123'
});

connection.query("CREATE DATABASE IF NOT EXISTS portfolio_db", (err) => {
  if (err) throw err;

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'portfolio_db'
  });

  db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
  )`);

  db.query(`CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    name VARCHAR(100),
    about TEXT,
    skills TEXT,
    contact TEXT,
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  )`);

  app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    });
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) res.sendStatus(200);
      else res.status(401).send('Invalid credentials');
    });
  });

  app.post('/api/portfolio', (req, res) => {
    const { email, name, about, skills, contact } = req.body;
    db.query('INSERT INTO portfolio (email, name, about, skills, contact) VALUES (?, ?, ?, ?, ?)',
      [email, name, about, skills, contact], (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    });
  });

  app.get('/api/portfolio/:email', (req, res) => {
    db.query('SELECT * FROM portfolio WHERE email = ?', [req.params.email], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0]);
    });
  });

  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});