const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const manager = require("./manager");
const engineer = require("./engineer");
const intern = require("./intern");
const employee = require("./employee");


const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `What's your managers name?`
        },
        {
            type: "input",
            name: "id",
            message: `What's your managers ID?`
        },
        {
            type: "input",
            name: "email",
            message: `What's your managers email?`
        },
        {
            type: "input",
            name: "office",
            message: `What's your managers office number?`
        }
    ])
}
function buildTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which team member do you want to add?",
            choices: ["Intern", "Engineer", "no more members"]
        }
    ]).then((answer) => {
        if (answer.role === "Engineer") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `What is your engineers name?`
                },
                {
                    type: "input",
                    name: "id",
                    message: `What is your engineers ID?`
                },
                {
                    type: "input",
                    name: "email",
                    message: `What is your engineers email?`
                },
                {
                    type: "input",
                    name: "github",
                    message: `What is your engineers GitHub??`
                }
            ]).then((answers) => {
                let newEngineer = new engineer(answers.name, answers.id, answers.email, answers.github);
              
                buildTeam();
            })
        }
        if (answer.role === "Intern") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `What is your interns name?`
                },
                {
                    type: "input",
                    name: "id",
                    message: `What is your interns ID?`
                },
                {
                    type: "input",
                    name: "email",
                    message: `What is your interns email?`
                },
                {
                    type: "input",
                    name: "school",
                    message: `What is your interns school?`
                }
            ]).then((answers) => {
                let newIntern = new intern(answers.name, answers.id, answers.email, answers.school);
                
                buildTeam();
            });
        }
    });
}
        


const generateHTML = (answers) => {
   return  `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
       <title>Document</title>
   </head>
   <body>
   
   <div class="jumbotron jumbotron-fluid">
       <div class="container">
         <h1 class="display-4">Team</h1>
         <p class="lead"></p>
       </div>
     </div>
   
     <div class="container">
         <div class="row">
             <div class="col">
               <div class="card" style="width: 18rem;">
                   <div class="card-body">
                     <h5 class="card-title">Card title</h5>
                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                   </div>
                   <ul class="list-group list-group-flush">
                     <li class="list-group-item"> hi my name is ${answers.name}</li>
                     <li class="list-group-item">A second item</li>
                     <li class="list-group-item">A third item</li>
                   </ul>
             </div>
             <div class="col">
               <div class="card" style="width: 18rem;">
                   <div class="card-body">
                     <h5 class="card-title">Card title</h5>
                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                   </div>
                   <ul class="list-group list-group-flush">
                     <li class="list-group-item">An item</li>
                     <li class="list-group-item">A second item</li>
                     <li class="list-group-item">A third item</li>
                   </ul>
             </div>
             <div class="col">
               <div class="card" style="width: 18rem;">
                   <div class="card-body">
                     <h5 class="card-title">Card title</h5>
                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                   </div>
                   <ul class="list-group list-group-flush">
                     <li class="list-group-item">An item</li>
                     <li class="list-group-item">A second item</li>
                     <li class="list-group-item">A third item</li>
                   </ul>
             </div>
         </div>
     </div>
   
     
                               
   
   
       
   </body>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
   </html>`};


const init = () => {
    promptUser()
        .then((answers) => {
            writeFileAsync('index.html', generateHTML(answers))
            console.log(answers)
            buildTeam(); 
        })
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));
};

init();
