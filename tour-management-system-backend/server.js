// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Use the routes
app.use("/api/users", require("./routes/userRoutes")); 
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/tour-guides", require("./routes/tourGuideRoutes"));
app.use("/api/tour-requests", require("./routes/tourRequestRoutes")); // Add this line for tour requests

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
