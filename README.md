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

_secret_ behavior: if no date parameter is passed,
it will automatically generate rewards data of the current week

1. set inputDate into Date object and identify inputDay
2. complete weekArray starting Sunday and ending Saturday given input day
   a. if inputDay is not 0 (Sunday), get Sunday
   b. complete week given known Sunday
3. create rewards data based on given scenarios:
   a. if user does not exist, create user and rewards data
   b. if user exists and query data exists, get old data only
   c. if user exists and query data does not exists, append query data

checking of existing data vs new data:

- comparing if sunday of the queried week exists in the current data

## Week Generator

- For simplictity, I used `.getUTC*` methods to visually make sure the available and expriry dates are at midnight of the day.

## Redeem Endpoint

- Also direct to the point, but I raised questions to validate my assumptions.
- I chose error `400: Bad Request` as the most suitable HTTP status code since the error is based on the parameters given by the user.

### Redeem scenarios

1. If user does not exists, return error
2. if reward id does not exists, return error
3. if reward id is expired, return error
4. if reward id is valid and redeemedAt is null, update redeemedAt with current Time
5. if reward id is valied and redeemedAt value is not null, return error

## Demo
