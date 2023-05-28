/* eslint-disable no-use-before-define */

/*

!TODO:
? procurar formas de fazer validação dos dados antes de criar a arquitetura dos arquivos
? estudar a melhor forma de leitura e autenticação simples do usuario
? começar a trabalhar a navegação de cada parte
?(*seria melhor trabalhar com módulos? criava meio que componentes do codigo em pastas acho que ficaria melhor (estudar isso)*)
! OBS:
* Até então só o básico, quando for continuar, se atentar a TODO, mas os inputs basicos estão todos funcionando
*/

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
      message: 'Type your full name.\n →',
      validate: (input) => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

        if (!nameRegex.test(input)) {
          console.log(chalk.redBright('\n\nPlease insert the data correctly.'));
          console.log(chalk.redBright('There was an error, exiting...'));
          process.exit();

          return;
        }
        return true;
      },

    },
    {
      name: 'login',
      message: 'Type your login.\n→',
      validate: (input) => {
        const usernameRegex = /^[^\d\s][\w\s]+$/;

        if (!usernameRegex.test(input)) {
          console.log(chalk.redBright('\n\nPlease insert the data correctly.'));
          console.log(chalk.redBright('There was an error, exiting...'));
          process.exit();
        }

        return true;
      },
    },

    {

      name: 'email',
      message: 'Type your email address.\n→',
      validate: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(input)) {
          console.log(chalk.redBright('\n\nPlease insert the data correctly.'));
          console.log(chalk.redBright('There was an error, exiting...'));
          process.exit();
        }
        return true;
      },
    },
    {

      type: 'password',
      mask: true,
      name: 'password',
      message: 'Type your password. \nIt must have at least four characters and maximum eight characters.\n→',
      validate: (input) => {
        const passwordRegex = /^.{4,8}$/;

        if (!passwordRegex.test(input)) {
          console.log(chalk.redBright('\n\nPlease insert the data correctly.'));
          console.log(chalk.redBright('There was an error, exiting...'));
          process.exit();
        }

        return true;
      },

    },
  ]).then((response) => {
    console.log(response.name, response.login, response.email, response.password);
  }).catch((error) => {
    console.error(error);
    process.exit();
  });
}

// login
