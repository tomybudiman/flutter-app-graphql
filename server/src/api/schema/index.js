const UserType = require("./user");
const AuthType = require("./auth");
const PaginationType = require("./pagination");

module.exports = {
  ...UserType,
  ...AuthType,
  ...PaginationType
};
