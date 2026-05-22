const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

//Ensuring the cors() middleware runs before any other logic and explicitly handling the OPTIONS method.
const corsOptions = {
  origin: 'https://auth-page-frontend.web.app', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('/{*path}', cors(corsOptions)); //changed from '*' to '/{*path}' as Express 5 doesn't use * as wildcard
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ status: "Server is running" });
});

app.use("/api", authRoutes);

module.exports = app; //changed from app.listen(5000, () => { console.log("Server Running on Port 5000");}); to the module method as Vercel is serverless and it doesnt work on the vercel platform.