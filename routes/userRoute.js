const express = require('express');
const {createUser,displayUsers,updateUser,deleteUser} = require('../controller/userController');
const route = express.Router();

route.post("/signup", createUser);

route.get("/users",displayUsers)

route.post("/updateUser", updateUser);

route.post("/deleteUser", deleteUser);


module.exports = route;