const express = require("express");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/test", (req, res) => {
      res.send('hello');
  });

  return app;
};

module.exports = { setupServer };
