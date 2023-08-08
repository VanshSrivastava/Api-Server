const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./db_connection/connection");
const courseroute = require("./routes/courseRoutes");
const teacherroute = require("./routes/teacherRoutes");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});
//default route
app.get("/", (req, res, next) => {
  res.send("Hello Maverick!");
});

//routes
app.use("/course", courseroute); //course route
app.use("/teacher", teacherroute); //teacher route

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//syncing sequelize
sequelize
  .sync()
  .then((result) => {
    app.listen(8080, () => {
      console.log("server is running on port 8080");
    });
  })
  .catch((err) => console.log(err));
