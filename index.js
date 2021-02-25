const express = require("express");
const app = express();
var cors = require("cors");

const mongoose = require("mongoose");
require("dotenv/config");
app.use(cors());
//Importing routes
const authRoute = require("./routes/auth");
const hospiRoute = require("./routes/hospAuth");
const nearestRoute = require("./routes/nearest");
const requestRoute = require("./routes/requests");

//connect to DB
// mongoose.connect(
//   process.env.DB_CONNECT,

//   () => console.log("connected to db")
// );

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Medichain Database connected")
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Main Server for asap" });
});

//middleware
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/hospital", hospiRoute);
app.use("/api/nearest", nearestRoute);
app.use("/api/request", requestRoute);

app.listen(4000, () => console.log("Server up and running"));
