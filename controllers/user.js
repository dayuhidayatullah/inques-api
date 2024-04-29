const { user } = require("../models");
const { generateToken } = require("../helpers/jwt.js");
const { comparePassword, hashPassword } = require("../helpers/bcrpt.js");
const { Users } = require("../models");
const { Op } = require("sequelize");
// const users = require("../models/users.js");

class UserController {
  // static register(req, res, next) {
  //   const { email, password } = req.body;
  //   User.create(
  //     {
  //       email,
  //       password,
  //     },
  //     { returning: true }
  //   )
  //     .then((user) => {
  //       res.status(201).json({
  //         id: user.id,
  //         email: user.email,
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }
  static async loginAdmin(req, res, next) {
    const email = req.body.email;
    try {
      if (email) {
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) {
          throw {
            name: "InvalidLogin",
            status: 400,
          };
        } else if (
          comparePassword(req.body.password, user.password) &&
          user.role === "admin"
        ) {
          console.log("masuk-controller-else-if", "<<<<<<<<<<<<<<<<<<<<<<<<<");
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ access_token, email });
        } else {
          throw {
            name: "InvalidLogin",
            status: 400,
          };
        }
      } else {
        console.log("<<<<<<<<<MASUK>>>>>>>>>>>>>");
        throw {
          name: "InvalidLogin",
          status: 400,
        };
      }
    } catch (err) {
      next(err);
    }
  }
  static async loginCustomer(req, res, next) {
    const email = req.body.email;
    try {
      if (email) {
        const validateEmail = (email) => {
          return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
        };
        const query = validateEmail(email)
          ? { where: { email } }
          : { where: { name: email } };
        const user = await Users.findOne(query);
        const hash = await hashPassword(req.body.password);
        hashPassword(req.body.password).then((data) => {
          console.info(data, "<<< data");
        });
        const comparePass = await comparePassword(
          req.body.password,
          user.password
        );
        if (!user) {
          throw {
            name: "InvalidLogin",
            status: 400,
          };
        } else if (comparePass) {
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ access_token });
        } else {
          throw {
            name: "InvalidLogin",
            status: 400,
          };
        }
      } else {
        throw {
          name: "InvalidLogin",
          status: 400,
        };
      }
    } catch (err) {
      console.info(err, "<<< apa errornya");
      next(err);
    }
  }
}

module.exports = UserController;
