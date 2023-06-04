/* eslint-disable no-use-before-define */
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

async function initialOperation() {
  try {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'actions',
        message: 'Access your account.',
        choices: ['Login', 'Register', 'Exit'],
      },
    ]);

    console.log('Everything is okay until now..');

    if (response.actions === 'Register') {
      createAccount();
    } else if (response.actions === 'Exit') {
      console.log(chalk.yellow('Goodbye!'));
    } else {
      console.log(chalk.yellow('Login functionality is not implemented yet.'));
    }
  } catch (error) {
    console.error(error);
  }
}

initialOperation();

async function createAccount() {
  console.log(chalk.bgGreen.black('Hi, thanks for creating your account here! We were waiting for you.'));
  console.log(chalk.bgGreen.black('Follow the instructions down below: '));

  await registerAccount();
}

async function registerAccount() {
  try {
    const response = await inquirer.prompt([
      {
        name: 'name',
        message: 'Type your full name.\n →',
        validate: (input) => {
          const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

          if (!nameRegex.test(input)) {
            console.log(chalk.redBright('\n\nPlease insert the data correctly.'));
            console.log(chalk.redBright('There was an error, exiting...'));
            process.exit();
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
    ]);

    if (await checkEmail(response.email) === false) {
      const emailData = fs.readFileSync('admin/emails.json', 'utf-8');
      const emails = JSON.parse(emailData);

      const emailExists = Object.values(emails).includes(response.email);

      if (emailExists) {
        console.log(chalk.red('The email is already registered. Please, try another.'));
        process.exit();
      }

      emails[response.login] = response.email;

      fs.writeFileSync('admin/emails.json', JSON.stringify(emails, null, 2));
    } else {
      console.log(chalk.red('The email is already registered. Please, try another.'));
      process.exit();
    }

    if (fs.existsSync(`accounts/${response.login}.json`)) {
      console.log(chalk.redBright('This login is already registered, try another.'));
      process.exit();
    }

    createArchive(response.login, response.name, response.email, response.password);
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

function createArchive(login, username, email, password) {
  const userLogin = login;
  const userName = username;
  const userEmail = email;
  const userPassword = password;

  if (!fs.existsSync('accounts')) {
    fs.mkdirSync('accounts');
  }

  fs.writeFileSync(
    `accounts/${userLogin}.json`,
    `{
  "name": "${userName}",
  "login": "${userLogin}",
  "email": "${userEmail}",
  "password": "${userPassword}"
}`,
  );

  console.log(chalk.greenBright('Account created. Welcome!'));
}

async function checkEmail(email) {
  try {
    const emailData = fs.readFileSync('admin/emails.json', 'utf-8');
    const emails = JSON.parse(emailData);
    const exists = Object.keys(emails).includes(email);

    return exists;
  } catch (error) {
    console.error(error);
    return false;
  }
}
