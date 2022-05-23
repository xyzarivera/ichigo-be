const express = require("express");
const _ = require("lodash");
const utils = require("./utils/utils");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  /* In-memory Data */
  const user = {};

  /* Application Logic */

  /* endpoint 1: generate and fetch rewards
  1. set inputDate into Date object and identify inputDay
  2. complete weekArray starting Sunday and ending Saturday given input day
      a. if inputDay is not 0 (Sunday), get Sunday
      b. complete week given known Sunday
   */

  app.get("/users/:id/rewards", (req, res) => {
    const { id } = req.params;
    let input = req.query.at;
    let status;
    let response;

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

    // construct return object
    const newData = [];
    for (let i = 0; i < 7; i++) {
      newData.push({
        availableAt: week[i],
        redeemedAt: null,
        expiresAt: week[i + 1],
      });
    }

    /**
     * data management
     * 1. if user does not exist, create user and rewards data
     * 2. if user exists and query data exists, get old data only
     * 3. if user exists and query data does not exists, append query data
     *
     * checking query data:
     * - comparing if sunday of the queried week exists in the current data
     */

    const existingData = user[id];

    if (_.isEmpty(existingData)) {
      // scenario 1
      user[id] = { data: newData };

      status = 201;
      response = user[id];
    } else {
      const sundayIndex = _.findIndex(existingData.data, {
        availableAt: newData[0].availableAt,
      });

      if (sundayIndex === -1) {
        // scenario 3
        user[id].data.push(...newData);

        status = 200;
        response = user[id];
      } else {
        // scenario 2
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

    // check if user exists
    if (user[id] === undefined) {
      res.status(404);
      res.json({ error: { message: "User does not exist" } });
    }

    // retrieve reward data
    const { data } = user[id];

    // check if reward ID exists
    const rewardIdIndex = data.findIndex((obj) => obj.availableAt === rewardId);

    if (rewardIdIndex === -1) {
      res.status(404);
      res.json({ error: { message: "Reward ID does not exist" } });
    }

    console.log({ rewardIdIndex });

    const isRewardExpired =
      currentDate > new Date(data[rewardIdIndex].expiresAt);
    console.log({ isRewardExpired });

    if (isRewardExpired) {
      res.status(400);
      res.json({ error: { message: "This reward is already expired" } });
    }

    data[rewardIdIndex].redeemedAt = new Date();

    res.status(200);
    res.json({ data: data[rewardIdIndex] });
  });

  return app;
};

module.exports = { setupServer };
