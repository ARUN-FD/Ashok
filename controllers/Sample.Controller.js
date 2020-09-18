const User = require("../models/User.Model");
const authService = require("../services/auth.service");
const { to, ReE, ReS } = require("../services/util.service");
const CONFIG = require("../config/config");
const { isNull } = require("../services/util.service");
const HttpStatus = require("http-status");
const validator = require("validator");
const { isEmail } = validator;

exports.getData1 = (req, res) => {
  // then catch format

  let users = req.user;
  User.findOne({ _id: users })
    .then((user) => {
      if (!user) {
        return ReE(
          res,
          { message: "user was not found" },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return ReS(
        res,
        { message: "user was founded", data: user },
        HttpStatus.OK
      );
    })
    .catch((err) => {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
};

exports.getData2 = async (req, res) => {
  // try catch format

  let user;
  let users = req.user;
  try {
    user = await User.findOne({ _id: users });
    if (!user) {
        return ReE(res,{ message: "user was not found" },HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return ReS(res, { message: "user was founded", data: user }, HttpStatus.OK);
  } catch (error) {
    return ReE(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};



exports.getData3 = async (req, res) => {
  // await to js format or promise format

  let err, user;
  let users = req.user;
  [err, user] = await to(User.findOne({ _id: users }));
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!user) {
    return ReE(
      res,
      { message: "user was not found" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return ReS(res, { message: "user was founded", data: user }, HttpStatus.OK);
};
