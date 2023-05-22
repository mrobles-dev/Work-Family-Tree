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
    message: "Would you like to add a dept?",
    name: "text",
    choices: ['water',
    "earth",
    " fire", 
    "air"]
  },
]).then((res) => {
  console.log(res);
});
}


db.connect(err=>{
    if (err) throw err
    userPrompt();
}
    
) 