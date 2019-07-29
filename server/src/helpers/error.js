const errorType = {
  NOT_FOUND: {
    message: "Data not found.",
    statusCode: 404
  },
  EMAIL_REGISTERED: {
    message: "Email already registered",
    statusCode: 400
  },
  REGISTER_FAIL: {
    message: "Registration Fail.",
    statusCode: 400
  },
  LOGIN_FAILED: {
    message: "Wrong email or password.",
    statusCode: 401
  },
  PASSWORD_NOT_MATCH: {
    message: "Password not match.",
    statusCode: 400
  },
  ILLEGAL_ARGUMENT: {
    message: "Illegal argument.",
    statusCode: 422
  },
  UNAUTHORIZED: {
    message: "Unauthorized access.",
    statusCode: 401
  },
  SERVER_ERROR: {
    message: "Internal server error.",
    statusCode: 500
  }
}

module.exports = {errorType};
