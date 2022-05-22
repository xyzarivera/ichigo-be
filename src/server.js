const express = require("express");

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
    // set input in Date object
    const inputDate = new Date(req.query.at);

    // invalid date input
    if (!(inputDate instanceof Date && !isNaN(inputDate))) {
      res.status(400);
      res.json({ message: "Invalid date query" });
    }

    const inputDay = inputDate.getUTCDay();

    // get sunday
    const newDay = new Date(req.query.at);
    newDay.setDate(newDay.getUTCDate() - inputDay);
    newDay.setUTCHours(0);

    // complete week
    const week = [new Date(newDay)];
    while (
      newDay.setUTCDate(newDay.getUTCDate() + 1) &&
      newDay.getUTCDay() !== 0
    ) {
      week.push(new Date(newDay));
    }
    // push next sunday
    week.push(new Date(newDay));

    // construct return object
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        availableAt: week[i],
        redeemedAt: null,
        expiresAt: week[i + 1],
      });
    }

    // create entry to user object
    user[id] = data;

    // Status 200 = entry is created
    const response = user[id];
    res.status(201);
    res.json(response);
  });

  return app;
};

module.exports = { setupServer };
