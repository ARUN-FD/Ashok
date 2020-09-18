// User Contollers
const User = require("../models/User.Model");
const Organisation = require("../models/Organisation.Modal");
const Branch = require("../models/Branch.Modal");
const Role = require("../models/Role.Modal");

const authService = require("../services/auth.service");
const { to, ReE, ReS } = require("../services/util.service");
const CONFIG = require("../config/config");
const { isNull } = require("../services/util.service");
const HttpStatus = require("http-status");
const validator = require("validator");
const { isEmail } = validator;

exports.create = async (req, res) => {
  let err, user, organistion, role, branch;

  [err, role] = await to(
    Role.create({
      name: "Manager",
      active: true,
    })
  );
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!role) {
    return ReE(
      res,
      { message: "role creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  [err, branch] = await to(
    Branch.create({
      name: "Tirupur",
      location: "Tup",
      role: [role._id],
    })
  );
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!branch) {
    return ReE(
      res,
      { message: "branch creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  [err, organistion] = await to(
    Organisation.create({
      name: "RVS CAS",
      branch: [branch._id],
    })
  );
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!organistion) {
    return ReE(
      res,
      { message: "organistion creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  [err, user] = await to(
    User.create({
      name: "Ashok",
      organisation: [organistion._id],
    })
  );
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!user) {
    return ReE(
      res,
      { message: "user creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return ReS(res, { message: "user creation success", user }, HttpStatus.OK);
};

exports.get = async (req, res) => {
  let err, user;
  let page = 1;
  let limit = 10;
  const options = {
    page: page,
    limit: limit,
    populate: {
      path: "organisation",
      select: ["name", "_id", "branch"],
      model: "Organistaion",
      populate: {
        path: "branch",
        select: ["name", "_id", "location", "role"],
        model: "Branch",
        populate: {
          path: "role",
          select: ["name", "_id", "active"],
          model: "Role",
        },
      },
    },
  };

  [err, user] = await to(User.paginate({}, options));
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!user) {
    return ReE(
      res,
      { message: "user creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return ReS(res, { message: "user fetched success", user }, HttpStatus.OK);
};

exports.gets = async (req, res) => {
  let err, user;
  let populates = {
    path: "organisation",
    select: ["name", "_id", "branch"],
    model: "Organistaion",
    populate: {
      path: "branch",
      select: ["name", "_id", "location", "role"],
      model: "Branch",
      populate: {
        path: "role",
        select: ["name", "_id", "active"],
        model: "Role",
      },
    },
  };
  [err, user] = await to(User.find({}).populate(populates));
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!user) {
    return ReE(
      res,
      { message: "user creation failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return ReS(res, { message: "user fetched success", user }, HttpStatus.OK);
};
