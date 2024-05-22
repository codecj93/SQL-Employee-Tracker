const inquirer = require('inquirer');

const { Pool } = require('pg');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
// const pool = new Pool(
//   {
//     user: 'postgres',
//     // TODO: Enter PostgreSQL password
//     password: 'rununstopable',
//     host: 'localhost',
//     database: 'employee_db'
//   },
//   console.log(`Connected to the employee_db database.`)
// )

pool.connect();


const firstPrompt = [
    {
        type: 'list',
        message: 'Choose one',
        name: 'contact',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
    }
];

const pool = new Pool(
    {
        user: 'postgres',
        password: 'rununstopable',
        host: 'localhost',
        database: 'employee_db'
    }

inquirer
        .prompt(firstPrompt)
        .then(answers => {
            if (answers.choices === 'View All Departments') {
                return 'SELECT * FROM department'
            } else if (answers.choices === 'View All Roles') {
                return 'SELECT * FROM role'
            } else if (answers.choices === 'View All Employees') {
                return 'SELECT * FROM employee'
            } else if (answers.choices === 'Add a Department') {
                return inquirer.prompt([
                    type: 'input',
                    name: 'addDepartment',
                    message: 'What is the name of the department?',
                ])
                    .then(answers)
                return 'INSERT INTO department VALUES (answers)'
            } else if (answers.choices === 'Add a Role') {
                return inquirer.prompt([
                    {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the name of the role?',
                    },
               {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
               }
                    .then(answers)
            } else if (answers.choices === 'Add a Department') {
                return inquirer.prompt([
                    type: 'input',
                    name: 'addDepartment',
                    message: 'What is the name of the department?',
                ])
                    .then(answers)
            } else if (answers.choices === 'Add a Department') {
                return inquirer.prompt([
                    type: 'input',
                    name: 'addDepartment',
                    message: 'What is the name of the department?',
                ])
                    .then(answers)
    )
