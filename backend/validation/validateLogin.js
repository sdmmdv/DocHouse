const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLogin = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = '⚠ Invalid E-mail format!';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = '⚠ E-mail is required!';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '⚠ Password must be between 6 and 30 chars!';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = '⚠ Password is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLogin;
