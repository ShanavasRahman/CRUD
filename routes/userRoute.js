const express = require("express");
const {
  createUser,
  displayUsers,
  updateUser,
  deleteUser,
  findUserById,
  userLogin,
  userLogout,
} = require("../controller/userController");

const auth = require("../controller/authController");

const route = express.Router();

route.post("/signup", createUser);

route.get("/users", displayUsers);

route.put("/updateuser", updateUser);

route.delete("/deleteuser/:id", deleteUser);

route.get("/userid/:id", findUserById);

route.post("/login", userLogin);

route.post("/logout", userLogout);

module.exports = route;
