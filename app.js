var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { Sequelize } = require("sequelize");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
require("dotenv").config();

// const sequelize = require("./config/db");
var app = express();
// sequelize.sync({ force: true }).then(() => {
//   console.info("masuk <<<<<");
// });
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mysql",
    password: process.env.DB_PASSWORD,
  },
  {
    define: {
      hooks: {
        beforeFind: (model) => {
          model.attributes = {};
          model.attributes.exclude = ["createdAt", "updatedAt"];
        },
      },
    },
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(errorHandler);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
