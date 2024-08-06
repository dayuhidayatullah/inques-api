var createError = require("http-errors");
var express = require("express");
var path = require("path");
const multer = require('multer')
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
var logger = require("morgan");
const { Sequelize, Transaction } = require("sequelize");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const fs = require('fs')
require("dotenv").config();
// const { sc_ms_user, sz_qs_option, sz_qs_optionitems, sz_qs_optionitemimage, sz_qs_optionitemlgs } = require('./models');
// const sz_ms_users = require("./models/sc_ms_users");
const { verifyToken } = require("./helpers/jwt");
const { saveOption } = require("./controllers/option");

// const storage = multer.memoryStorage({
//   destination: function (req, file, cb) {
//     console.info(req.body, file, '<<< dah')
//     cb(null, path.join('__dirname', '../uploads/'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
//  const upload = multer({ storage: storage });
// const uploadDir = 'uploads/answerImage';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }
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
    // host: 3306,
    dialect: "mysql",
    port: 3306,
    username:'heylutco_root', 
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
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(errorHandler);
const fixTextVal = (val) => val.trim();
const fixNumVal = (val) => parseInt(val, 10);
const authMiddleware = (req, res, next) => {
  // Replace this with real authentication logic
  if (!req.user) {
    return res.redirect('/admin');
  }
  next();
};
// app.post('/save-option', upload.array('imgFile[]'), saveOption);
// app.post('/upload', upload.single('files'))
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
