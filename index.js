require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
