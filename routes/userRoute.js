const express = require('express');
const {createUser,displayUsers} = require('../controller/userController');
const route = express.Router();

route.get("/users",displayUsers)


route.post("/signup", createUser);


module.exports = route;