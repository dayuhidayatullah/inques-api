module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      msg: "the email entered is already registered",
    });
  } else if (err.name === "SequelizeValidationError") {
    res.status(400).json({
      msg: err.errors[0].message,
    });
  } else if (err.name === "fieldEmailEmpty") {
    res.status(err.status).json({
      msg: "Please Enter Your Email / password",
    });
  } else if (err.name === "UserNotFound") {
    res.status(400).json({
      msg: "Invalid email/password",
    });
  } else if (err.name === "idNotFound") {
    res.status(err.status).json({
      msg: "Id Not Found",
    });
  } else if (err.name === "InvalidLogin") {
    res.status(400).json({
      msg: "Invalid email / password",
    });
  } else if (err.name === "InvalidLoginAdmin") {
    res.status(401).json({
      msg: "Sorry you no Authorized",
    });
  } else if (err.name === "noAuthentication") {
    res.status(401).json({
      msg: "Please login first",
    });
  } else if (err.name === "productNotFound") {
    res.status(err.status).json({
      msg: "id not found",
    });
  } else {
    console.log(err, "ini error boss");
    res.status(500).json(err);
  }
};
