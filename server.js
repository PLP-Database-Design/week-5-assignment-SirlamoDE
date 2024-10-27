
// Import necessary dependencies
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// creating an instance of our app
const app = express();

// Create a database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const query = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(query, (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const query = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(query, (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

// 3. Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
    const { first_name } = req.params;
    const query = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
    db.query(query, [first_name], (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/:provider_specialty', (req, res) => {
    const { provider_specialty } = req.params;
    const query = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
    db.query(query, [provider_specialty], (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


