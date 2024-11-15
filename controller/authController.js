const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const auth = async (req, res, next) => {
  try {
      console.log("Executing authentication middleware");
      console.log(req.cookies.token);
      const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied. No token provided." });
    }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token expired, please log in again" });
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
};

module.exports = auth;
