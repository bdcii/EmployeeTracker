//setting variables for access to npm modules/dependencies I will need later on
const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    
});
