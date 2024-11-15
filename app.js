const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("DB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("DB connection failed:", error);
    });

app.use('/api', userRoute);
