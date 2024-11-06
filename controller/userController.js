const User = require("../model/userModel");

const createUser = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const newUser = new User({
      name,
      email,
      address,
    });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const savedData = await newUser.save();
    return res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ message: "Id not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const displayUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "No users exist" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const userExist = await User.find({ email });
    if (userExist) {
      const updatedUser = await User.updateOne(
        { email },
        { $set: { name, address } }
      );
      return res.status(200).json({ updatedUser });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.find({ email });
    if (userExist) {
      const deletedUser = await User.deleteOne({ email });
      return res.status(200).json({ deletedUser });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports = {
  createUser,
  displayUsers,
  updateUser,
  deleteUser,
  findUserById,
};
