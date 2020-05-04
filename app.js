const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Routes
const memberRoute = require("./routes/member");
//mongodb://localhost:27017/Store
//"mongodb+srv://Helsinki:Helsinki123@cluster0-lr7du.mongodb.net/test?retryWrites=true&w=majority"
//Connecting MongoDb
mongoose
  .connect(
    "mongodb+srv://Helsinki:Helsinki123@cluster0-lr7du.mongodb.net/test?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Mongo Db Connected");
  })
  .catch(() => {
    console.log("Error Connecting Database");
    throw err;
  });

//connecting the middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//My Routes
app.use("/api", memberRoute);

//Connecting the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
