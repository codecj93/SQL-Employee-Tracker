const inquirer = require('inquirer');

const { Pool } = require('pg');


let db;

async function connectdb(){
    const pool = new Pool(
        {
            user: 'postgres',
            // TODO: Enter PostgreSQL password
            password: 'rununstopable',
            host: 'localhost',
            database: 'employee_db'
        },
        console.log(`Connected to the employee_db database.`)
    )
    
    
    db = await pool.connect();
}
connectdb()


const firstPrompt = [
    {
        type: 'list',
        message: 'Choose one',
        name: 'contact',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
    }
];

const rolePrompts = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'input',
        message: 'What is the id of the department does the role belong to?',
        name: 'roleDepartment',
        // choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    },
];

const departmentPrompts = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department?',
    },
];

const employeePrompts = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is employee first name?'
    },
    {

        type: 'input',
        name: 'lastName',
        message: 'What is employee last name?'

    },
    {
        type: 'input',
        message: 'What is the id of the role?',
        name: 'employeeRole',
        // choices: ['Sales Lead', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service', 'Sales Lead', 'Salesperson', 'Lead Engineer']
    },
    {
        type: 'input',
        message: 'What is the id of the manager?',
        name: 'employeeManager',
        // choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
    }
];

const updatePrompts = [
    {
        type: 'input',
        message: 'What is the id of the employee that you want to update?',
        name: 'employeeUpdate',
        // choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
    },
    {
        type: 'input',
        message: 'What is the new id of the role you want to update?',
        name: 'roleUpdate',
        // choices: ['Sales Lead', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service', 'Sales Lead', 'Salesperson', 'Lead Engineer']
    }
];

function init(){
    inquirer
    .prompt(firstPrompt)
    .then(answers => {
        if (answers.contact === 'View All Departments') {
            db.query('SELECT * FROM department', function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.table(result.rows)
                    init()
                }
            })

        } else if (answers.contact === 'View All Roles') {
            db.query('SELECT * FROM role', function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.table(result.rows)
                    init()
                }
            })
        } else if (answers.contact === 'View All Employees') {
            db.query('SELECT * FROM employee', function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.table(result.rows)
                    init()
                }
            })

        } else if (answers.contact === 'Add a Department') {
             inquirer.prompt(departmentPrompts)
             .then(answers => {
                db.query('INSERT INTO department (name) VALUES ($1)',[answers.addDepartment], function(err,result){
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Department has been added')
                        init()
                    }
                })
             })
        


    } else if (answers.contact === 'Add a Role') {
        inquirer.prompt(rolePrompts)
        .then(answers => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES ($1,$2,$3)',[answers.roleName, answers.roleSalary, answers.roleDepartment], function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.log('Role has been added')
                    init()
                }
            })
         })


    } else if (answers.contact === 'Add an Employee') {
        inquirer.prompt(employeePrompts)
        .then(answers => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)',[answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager], function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.log('Employee has been added')
                    init()
                }
            })
         })

    } else if (answers.contact === 'Update an Employee Role') {
        inquirer.prompt(updatePrompts)
        .then(answers => {
            db.query('UPDATE employee SET role_id=$1 WHERE id=$2',[answers.roleUpdate, answers.employeeUpdate],function(err,result){
                if (err) {
                    console.log(err)
                } else {
                    console.log('Employee has been updated')
                    init()
                }
            })
         })
    }
})
}
init()
    

// pool.connect();