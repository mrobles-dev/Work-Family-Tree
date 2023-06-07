const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection({
        host: 'localhost',
        database: 'work_db',
        user: 'root',
        password: 'PrimeSQL23!'});

function userPrompt(){
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to view/do?",
        name: "choices",
        choices: [
          "View all depts",
          "add dept",
          "View all employees",
          "add employee",
          "View all roles",
          "add roll",
          "Esc",
        ],
      },
    ])
    // .then((res) => {
    //   console.log(res);
    //   //create switch case for choices above to be shown/added/updated
    // })
    .then((res) => {
      switch (res.choices) {
        case "View all depts":
          viewDepts();
          break;
        case "add dept":
          addDept();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "add employee":
          addEmployee();
          break;
        case "View all roles":
          viewRolls();
          break;
        case "add role":
          addRole();
          break;
        case "Esc":
          console.log("CTRL+C to exit ( goodbye )");
          return;
      }
    });

  async function viewDepts() {
    const results = await db.promise().query("SELECT * FROM department");
    console.table(results[0]);
    userPrompt();
  }

  function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name of new dept?",
          name: "department",
        },
      ])
      .then((res) => {
        console.log(res);
        db.query(
          `INSERT INTO department SET department_name = ?`,
          [res.department],
          function (err) {
            if (err) {
              throw err;
            }
            userPrompt();
          }
        );
      });
  }

  async function viewEmployees() {
    const results = await db.promise().query("SELECT * FROM employees");
    console.table(results[0]);
    userPrompt();
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "First Name of new worker?",
          name: "firstName",
        },
        {
          type: "input",
          message: "Last Name of new worker?",
          name: "lastName",
        },


      ])
      .then((res) => {
        console.log(res);
        db.query(
          `INSERT INTO employees (first_name, last_name) VALUES (?, ?)`,
          [res.firstName, res.lastName],
          function (err) {
            if (err) {
              throw err;
            }
            userPrompt();
          }
        );
      });
  }
}

 async function viewRolls() {
   const results = await db.promise().query("SELECT * FROM roles");
   console.table(results[0]);
   userPrompt();
 }


  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name of new role?",
          name: "title",
        },
        {
          type: "input",
          message: "Salary of new role?",
          name: "salary",
        },

      ])
      .then((res) => {
        console.log(res);
        db.query(
          `INSERT INTO roles (title, salary) VALUES (?, ?)`,
          [res.title, res.salary],
          function (err) {
            if (err) {
              throw err;
            }
            userPrompt();
          }
        );
      });
  }




db.connect(err=>{
    if (err) throw err
    userPrompt();
}
    
);