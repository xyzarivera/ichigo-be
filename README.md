# Full-stack Engineer: Backend Challenge

- my step by step solution on this challenge can be seen as git commits in the `develop` branch in this project

## Set up

1. Created an empty repository and cloned to my local machine. Create also an empty `.gitignore` file

   ```
   git clone git@github.com:xyzarivera/ichigo-be.git
   ```

2. Create a Node project using `npm` and followed through the wizard to create the `package.json` file

   ```
   npm init
   ```

3. Installed `Express` as framework for REST API

   ```
   npm install express
   ```

## Thought Process

# Reward Endpoint

- It was straight forward so far. I need to create an object base on the user ID. I extracted to a utils function my week generator to reduce complexity in the server code.

## Week Generator

- For simplictity, I used `.getUTC*` methods to visually make sure the available and expriry dates are at midnight of the day.

# Redeem Endpoint

- Also direct to the point, but I raised questions to validate my assumptions.
- I chose error `400: Bad Request` as the most suitable HTTP status code since the error is based on the parameters given by the user.

## Demo
