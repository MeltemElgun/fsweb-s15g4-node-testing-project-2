const express = require("express");
const server = express();

const gorevRouter = require("./gorevler/gorev-router");
const taskRouter = require("./tasklar/task-router");

server.use(express.json());

server.use("/api/gorev", gorevRouter);
server.use("/api/task", taskRouter);

server.use("/", async (req, res, next) => {
  res.status(200).json({ message: "Server is working" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Server.js tatafından handle edildi bu hata",
  });
});

module.exports = server;
