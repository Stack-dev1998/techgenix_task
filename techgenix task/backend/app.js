const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const commonRoute = require("./routes/common.route");
const HRRoute = require('./routes/HR.route')
const employeeRoute = require("./routes/employee.route");



//Mongodb connection
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("=> Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error :" + err);
  });

//midlewares
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization "
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/common", commonRoute);
app.use('/HR',HRRoute);
app.use("/employee", employeeRoute);



app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
