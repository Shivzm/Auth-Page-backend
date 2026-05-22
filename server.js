const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

const corsOptions = {
  origin: 'https://auth-page-frontend.web.app', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});