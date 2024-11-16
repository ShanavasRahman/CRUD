const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password Mismatching" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const savedData = await newUser.save();
    return res.status(200).json({savedData,message:"User logged in successfully"});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


const generateAccessToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.ACCESSTOKEN_SECRET_KEY, { expiresIn: "2m" });
}

const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.REFRESHTOKEN_SECRET_KEY, { expiresIn: "7d" });
}


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({email:email});
    if (userExist && bcrypt.compare(password, userExist.password)) {
      const refreshToken=generateRefreshToken(userExist._id);
      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 360000,
      })
    }
    res.status(200).json({message:"Login successful"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Internal server error" });
  }
}


const userLogout = async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: false });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({message:"internal server error"})
  }
}

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
    const userExist = await User.findById(req.params.id);
    if (userExist) {
      const deletedUser = await User.findByIdAndDelete( req.params.id );
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
  userLogin,
  userLogout
};
