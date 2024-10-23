const User = require('../model/userModel');

const createUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newUser = new User({
            name,
            email,
            address
        })
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const savedData = await newUser.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

const displayUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:"No users exist"})
    }
}
module.exports = {
    createUser,
    displayUsers
};