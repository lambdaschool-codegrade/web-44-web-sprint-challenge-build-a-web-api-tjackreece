require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require("helmet")
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

server.use(express.json())
server.use(helmet())
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);




server.get("*", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
