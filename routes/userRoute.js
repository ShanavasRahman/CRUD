const express = require('express');
const {createUser,displayUsers,updateUser,deleteUser, findUserById} = require('../controller/userController');
const route = express.Router();

route.post("/signup", createUser);

route.get("/users",displayUsers)

route.put("/updateUser", updateUser);

route.delete("/deleteUser/:id", deleteUser);

route.get("/userId/:id", findUserById);


module.exports = route;