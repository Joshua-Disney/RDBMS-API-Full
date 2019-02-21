const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// const projectsRouter = require("./projects/projectsRouter.js");
// const actionsRouter = require("./actions/actionsRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

// server.use("/api/projects", projectsRouter);
// server.use("/api/actions", actionsRouter);

module.exports = server;
