const express = require("express");
const _ = require("lodash");
const utils = require("./utils/utils");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  /* In-memory Data */
  const user = {};

  app.get("/users/:id/rewards", (req, res) => {
    const { id } = req.params;
    let input = req.query.at;
    let status;
    let response;

    /**
     * *secret* behavior: if no date parameter is passed,
     * it will automatically generate rewards data of the current week
     *
     * 1. set inputDate into Date object and identify inputDay
     * 2. complete weekArray starting Sunday and ending Saturday given input day
     *     a. if inputDay is not 0 (Sunday), get Sunday
     *     b. complete week given known Sunday
     * 3. create rewards data based on given scenarios:
     *     a. if user does not exist, create user and rewards data
     *     b. if user exists and query data exists, get old data only
     *     c. if user exists and query data does not exists, append query data
     *
     * checking of existing data vs new data:
     * - comparing if sunday of the queried week exists in the current data
     */

    if (input === undefined) {
      input = new Date();
    }

    // set input in Date object
    const inputDate = new Date(input);

    // invalid date input
    if (!(inputDate instanceof Date && !isNaN(inputDate))) {
      res.status(400);
      res.json({ error: { message: "Invalid date query" } });
    }

    const week = utils.createWeek(inputDate);

    // construct new rewards of the week
    const newData = [];
    for (let i = 0; i < 7; i++) {
      newData.push({
        availableAt: week[i],
        redeemedAt: null,
        expiresAt: week[i + 1],
      });
    }

    const existingData = user[id];

    if (_.isEmpty(existingData)) {
      // scenario a
      user[id] = { data: newData };

      status = 201;
      response = user[id];
    } else {
      const sundayIndex = _.findIndex(existingData.data, {
        availableAt: newData[0].availableAt,
      });

      if (sundayIndex === -1) {
        // scenario c
        user[id].data.push(...newData);

        status = 200;
        response = user[id];
      } else {
        // scenario b
        status = 200;
        response = user[id];
      }
    }

    res.status(status);
    res.json(response);
  });

  app.patch("/users/:id/rewards/:rewardId/redeem", (req, res) => {
    const { id, rewardId } = req.params;
    const currentDate = new Date();
    let status;
    let response;

    /**
     * Redeem scenarios
     * 1. If user does not exists, return error
     * 2. if reward id does not exists, return error
     * 3. if reward id is expired, return error
     * 4. if reward id is valid and redeemedAt is null, update redeemedAt with current Time
     * 5. if reward id is valied and redeemedAt value is not null, return error
     */

    // check if user exists
    if (user[id] === undefined) {
      // scenario 1
      status = 404;
      response = { error: { message: "User does not exist" } };
    } else {
      // retrieve reward data
      const { data } = user[id];

      // check if reward ID exists
      const rewardIdIndex = data.findIndex(
        (obj) => obj.availableAt === rewardId
      );

      if (rewardIdIndex === -1) {
        // scenario 2
        status = 404;
        response = { error: { message: "Reward ID does not exist" } };
      } else {
        const isRewardExpired =
          currentDate > new Date(data[rewardIdIndex].expiresAt);

        if (isRewardExpired) {
          // scenario 3
          status = 400;
          response = { error: { message: "This reward is already expired" } };
        } else if (
          // scenario 4
          !isRewardExpired &&
          data[rewardIdIndex].redeemedAt === null
        ) {
          data[rewardIdIndex].redeemedAt = new Date();
          status = 200;
          response = { data: data[rewardIdIndex] };
        } else if (
          // scenario 5
          !isRewardExpired &&
          data[rewardIdIndex].redeemedAt !== null
        ) {
          status = 400;
          response = { error: { message: "This reward is redeemed" } };
        }
      }
    }

    res.status(status);
    res.json(response);
  });

  return app;
};

module.exports = { setupServer };
