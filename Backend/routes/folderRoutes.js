const express = require("express");
const { signup, login } = require("../controller/authController");
const { createFolder } = require("../controller/folderController");

const folderRouter = express.Router();

folderRouter.post("/create", createFolder);



module.exports = folderRouter;