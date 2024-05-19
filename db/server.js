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



// pool.connect();

inquirer
  .prompt([
    {
        type: 'list',
        message: 'Choose one',
        name: 'contact',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
      },
    ])

