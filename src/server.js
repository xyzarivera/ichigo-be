const express = require("express");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  // endpoint 1: generate and fetch rewards
  app.get("/users/:id/rewards", (req, res) => {
    const currentDate = req.query.at;
    const { id } = req.params;

    const message = `currentDate: ${currentDate}, userID: ${id}`;
    res.send(message);
  });

  return app;
};

module.exports = { setupServer };
