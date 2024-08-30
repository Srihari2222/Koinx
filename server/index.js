require('dotenv').config();
const express = require('express');
const {connectMongoDB} = require("./connection");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = require("./routes/user")
const scheduledFunctions = require("./schedulers/ethercost")
const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connecting MongoDB
connectMongoDB(process.env.MONGO_URL);

const PORT = process.env.PORT;
app.use("/api/user", router);
scheduledFunctions.initScheduledJobs();

const summary = [
    "This is a web service that can fetch the crypto transactions of a user. Also It displays the ethereum cost in INR and USD currencies.",
    "The API has two endpoints.",
    "/api/user/raw/:address",
    "gives the list of all transactions of the user in the raw format.",
    "/api/user/:address", 
    "gives the total expenses of all the transactions of the user."
];
app.get("/",(req, res)=>{
    res.json({description:summary});
});
app.listen(PORT, () => console.log("Server is Running at PORT: ",PORT));


