const express = require('express');
const create = require('../controller/userController');
const route = express.Router();

route.post("/user", create);

module.exports = route;