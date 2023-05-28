/* eslint-disable no-use-before-define */
import chalk from 'chalk';
import inquirer from 'inquirer';

function initialOperation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'actions',
      message: 'Acess your account.',
      choices: [

        'Login',
        'Register',
        'Exit',
      ],
    },
  ]).then((response) => {
    console.log('Everything ok until now..');

    createAccount();
  }).catch((error) => {
    console.error(error);
  });
}
initialOperation();

// create account

function createAccount() {
  console.log(chalk.bgGreen.black('Hi, thanks for creating your account here! We were waiting for you.'));
  console.log(chalk.bgGreen.black('Follow the instructions down below: '));

  registerAccount();
}
// registerAccount

function registerAccount() {
  inquirer.prompt([
    {
      name: 'name',
      message: 'Type your full name.',

    },
    {
      name: 'login',
      message: 'Type your login.',
    },

    {

      name: 'email',
      message: 'Type your email address.',
    },
    {

      type: 'password',
      mask: true,
      name: 'password',
      description: 'Type your password.',

    },
  ]).then((response) => {
    console.log(response.name, response.login, response.email, response.password);
  }).catch((error) => {
    console.error(error);
    process.exit();
  });
}

// login
