const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect(
    "mongodb+srv://max:" + process.env.MONGO_ATLAS_PW + "@cluster0.osga8.mongodb.net/gifs-db",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// define headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// define routes
app.use("/api/user", userRoutes);

module.exports = app;
