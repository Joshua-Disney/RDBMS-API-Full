const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const cohortsRouter = require("./routers/cohortsRouter.js");
const studentsRouter = require("./routers/studentsRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/cohorts", cohortsRouter);
server.use("/api/students", studentsRouter);

module.exports = server;
