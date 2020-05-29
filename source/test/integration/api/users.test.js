const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../server.js");
chai.use(chaiHttp);

const request = chai.request;
const assert = chai.assert;
const agent = request.agent(app);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

describe("api/users", () => {
  before((done) => {
    done();
  });

  it("GET /api/users/:id", async () => {});
  xit("GET /api/users/:id", async () => {});

  after(() => {});
});
