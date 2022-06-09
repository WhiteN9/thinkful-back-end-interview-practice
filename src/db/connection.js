require("dotenv").config();
const { DB_URL } = require("../config");
const knex = require("knex")({
  client: "pg",
  connection: DB_URL
});

module.exports = knex;
