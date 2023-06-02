const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        database: 'work_db',
        user: 'root',
        password: 'PrimeSQL23!',

    },
    console.log('congrats connected!')
);

function userPrompt(){
inquirer 
.prompt([
  {
    type: "list",
    message: "What would you like to view/do?",
    name: "choices",
    choices: [
    'View all depts',
    "add dept",
    "View all employees", 
    "add employee",
    'View all roles',
    "update roll",
    "Esc"
  ]
  },
])
// .then((res) => {
//   console.log(res);
//   //create switch case for choices above to be shown/added/updated
// })
.then((res) => {
  
  switch(res.choices){
    case 'View all depts':
      viewDepts();
      break;
    case 'add dept':
      addDept();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'add employee':
      addEmployee();
      break;
    case 'View all roles':
      viewRolls();
      break;
    case 'update role':
      updateRole();
      break;
    case 'update role':
      console.log('esc selected');
      return;
     
  }
});

function viewDepts(){
  db.query('SELECT * FROM department', function(results){
    console.table(results);
    userPrompt();
  });
}


function addDept(){
  inquirer.prompt([
    {
      type:'input',
      message: "Name of new dept?",
      name:'department'

    }
  ]).then ((res)=>
  {
    console.log(res);
    db.query(`INSET INTO department SET name = ?`,[res.department], function (err){
      if (err){
        throw err;
      }
    })
  })
};



}






db.connect(err=>{
    if (err) throw err
    userPrompt();
}
    
);