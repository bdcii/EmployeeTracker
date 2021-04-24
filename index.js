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
                console.error(err);
                if (err) throw err;
                console.log('Department has been added!');
            });
            appMenu();
        });


}

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the new role',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of the new role',
        },
        {
            name: 'department',
            type: 'rawlist',
            message: 'Which department does this role fall under?',
            choices: [
                'Sales',
                'Marketing',
                'Engineering',
                'Finance',
                'Legal'
            ],
        }

    ]).then((answers) => {

        function getDeptID(department) {
            if (department === 'Sales') {
                return 001
            } else if (department === 'Marketing') {
                return 002
            } else if (department === 'Engineering') {
                return 003
            } else if (department === 'Finance') {
                return 004
            } else if (department === 'Legal') {
                return 005
            }
        }

        const deptID = getDeptID(answers.department);

        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";

        let values = [answers.title, answers.salary, deptID];

        connection.query(sql, values, (err, res) => {
            console.error(err);
            if (err) throw err;
            console.log('Role has been added!');
        });
        appMenu();
    })
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


