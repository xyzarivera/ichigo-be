const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");

const server = setupServer();
const { expect } = chai;

describe("Rewards API", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("Fetch Rewards Information", () => {
    it("should be able to fetch rewards given a new user and date query", async () => {
      const expected = {
        data: [
          {
            availableAt: "2020-03-15T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-16T00:00:00Z",
          },
          {
            availableAt: "2020-03-16T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-17T00:00:00Z",
          },
          {
            availableAt: "2020-03-17T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-18T00:00:00Z",
          },
          {
            availableAt: "2020-03-18T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-19T00:00:00Z",
          },
          {
            availableAt: "2020-03-19T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-20T00:00:00Z",
          },
          {
            availableAt: "2020-03-20T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-21T00:00:00Z",
          },
          {
            availableAt: "2020-03-21T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-22T00:00:00Z",
          },
        ],
      };

      const output = await request.get(
        "/users/1/rewards?at=2020-03-19T12:00:00Z"
      );

      expect(output.body).to.deep.equal(expected);
      expect(output.status).to.equal(201);
    });
    it("should be able to fetch rewards given user parameter only - set current time as date query", async () => {
      const output = await request.get("/users/2/rewards");

      expect(output.status).to.equal(201);
    });
    it("should be able to fetch rewards given an existing user and date query", async () => {
      const expected = {
        data: [
          {
            availableAt: "2020-03-15T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-16T00:00:00Z",
          },
          {
            availableAt: "2020-03-16T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-17T00:00:00Z",
          },
          {
            availableAt: "2020-03-17T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-18T00:00:00Z",
          },
          {
            availableAt: "2020-03-18T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-19T00:00:00Z",
          },
          {
            availableAt: "2020-03-19T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-20T00:00:00Z",
          },
          {
            availableAt: "2020-03-20T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-21T00:00:00Z",
          },
          {
            availableAt: "2020-03-21T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-22T00:00:00Z",
          },
        ],
      };

      const output = await request.get(
        "/users/1/rewards?at=2020-03-19T12:00:00Z"
      );

      expect(output.body).to.deep.equal(expected);
      expect(output.status).to.equal(200);
    });
    it("should be able to fetch rewards given an existing user and new date query - append new query to existing", async () => {
      const expected = {
        data: [
          {
            availableAt: "2020-03-15T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-16T00:00:00Z",
          },
          {
            availableAt: "2020-03-16T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-17T00:00:00Z",
          },
          {
            availableAt: "2020-03-17T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-18T00:00:00Z",
          },
          {
            availableAt: "2020-03-18T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-19T00:00:00Z",
          },
          {
            availableAt: "2020-03-19T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-20T00:00:00Z",
          },
          {
            availableAt: "2020-03-20T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-21T00:00:00Z",
          },
          {
            availableAt: "2020-03-21T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2020-03-22T00:00:00Z",
          },
          {
            availableAt: "2022-05-22T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-23T00:00:00Z",
          },
          {
            availableAt: "2022-05-23T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-24T00:00:00Z",
          },
          {
            availableAt: "2022-05-24T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-25T00:00:00Z",
          },
          {
            availableAt: "2022-05-25T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-26T00:00:00Z",
          },
          {
            availableAt: "2022-05-26T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-27T00:00:00Z",
          },
          {
            availableAt: "2022-05-27T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-28T00:00:00Z",
          },
          {
            availableAt: "2022-05-28T00:00:00Z",
            redeemedAt: null,
            expiresAt: "2022-05-29T00:00:00Z",
          },
        ],
      };

      const output = await request.get("/users/1/rewards");

      expect(output.body).to.deep.equal(expected);
      expect(output.status).to.equal(200);
    });
    it("should throw an error if query date is invalid", async () => {
      const expected = {
        error: {
          message: "Invalid date query",
        },
      };
      const output = await request.get("/users/3/rewards?at=asdf");

      expect(output.status).to.equal(400);
      expect(output.body).to.deep.equal(expected);
    });
  });

  describe("Redeem Reward", () => {
    it("throw error if user does not exist", async () => {
      const expected = {
        error: {
          message: "User does not exist",
        },
      };
      const output = await request.patch(
        "/users/99/rewards/2020-03-18T00:00:00Z/redeem"
      );

      expect(output.status).to.equal(404);
      expect(output.body).to.deep.equal(expected);
    });
    it("throw error if reward ID does not exist", async () => {
      const expected = {
        error: {
          message: "Reward ID does not exist",
        },
      };
      const output = await request.patch(
        "/users/1/rewards/2022-05-18T00:00:00Z/redeem"
      );

      expect(output.status).to.equal(404);
      expect(output.body).to.deep.equal(expected);
    });
    it("throw error if reward is expired", async () => {
      const expected = {
        error: {
          message: "This reward is already expired",
        },
      };
      const output = await request.patch(
        "/users/1/rewards/2020-03-18T00:00:00Z/redeem"
      );

      expect(output.status).to.equal(400);
      expect(output.body).to.deep.equal(expected);
    });
    it("should redeem reward", async () => {
      const currentDate = new Date().setUTCHours(0, 0, 0, 0);
      const currentRewardID = `${
        new Date(currentDate).toISOString().split(".")[0]
      }Z`;
      const output = await request.patch(
        `/users/1/rewards/${currentRewardID}/redeem`
      );

      expect(output.status).to.equal(200);
    });
    it("should redeem reward", async () => {
      const expected = {
        error: {
          message: "This reward is redeemed",
        },
      };

      const currentDate = new Date().setUTCHours(0, 0, 0, 0);
      const currentRewardID = `${
        new Date(currentDate).toISOString().split(".")[0]
      }Z`;
      const output = await request.patch(
        `/users/1/rewards/${currentRewardID}/redeem`
      );

      expect(output.status).to.equal(400);
      expect(output.body).to.deep.equal(expected);
    });
  });
});
