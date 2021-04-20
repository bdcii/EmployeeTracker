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


connection.connect((err) => {
    if (err) throw err;
    appMenu();
})


function appMenu() {
    inquirer
        .prompt({
            name: 'options',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add a new department',
                'Add a new role',
                'Add a new employee',
                'View all departments',
                'View all roles',
                'View all employees',
                'Update an employee role',
                'Exit',
            ],
        }).then((answer) => {
            switch (answer.options) {
                case 'Add a new department':
                    addDept();
                    break;

                case 'Add a new role':
                    addRole();
                    break;

                case 'Add a new employee':
                    addEmployee();
                    break;

                case 'View all departments':
                    viewDept();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Update an employee role':
                    updateRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;

            };
        });
};



const addDept = () => {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Enter the name of the new department',
    })
        .then((answer) => {
            const sql = "INSERT INTO department (name) VALUES (?)";
            

            connection.query(sql, answer.department, (err, res) => {

                //Upon entering department name, this callback generates error that states "Please enter a valid index"
                // if (err) throw err;
                // console.log("Number of records inserted: " + res.affectedRows);

                //When using this callback, no error is generated AND no changes are actually made to the table
                console.error(err);
                if (err) throw err;
            });
            appMenu();
        }); 
   

}

const addRole = () => {

}

const addEmployee = () => {

}

const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        console.table(res);
        appMenu();

    });
}
    

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        console.table(res);
        appMenu();
    });
    
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        console.table(res);
        appMenu();
    });
    
}

const updateRole = () => {

}


