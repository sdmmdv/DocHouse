const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignup = (data) => {
  const errors = {};
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm  : '';

  if (!(data.first_name).match(/^[A-Z][A-Za-z,.']+$/)) {
    errors.first_name = '⚠ Invalid Name format!';
  }

  if (!validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = '⚠ Name must be between 2 and 30 chars!';
  }

  if (validator.isEmpty(data.first_name)) {
    errors.first_name = '⚠ First Name is required!';
  }

  if (!(data.last_name).match(/^[A-Z][A-Za-z ,.']+$/)) {
    errors.last_name = '⚠ Invalid Name format!';
  }

  if (!validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = '⚠ Name must be between 2 and 30 chars!';
  }

  if (validator.isEmpty(data.last_name)) {
    errors.last_name = '⚠ Last Name is required!';
  }

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

  if (!validator.isLength(data.passwordConfirm, { min: 6, max: 30 })) {
    errors.passwordConfirm = '⚠ Password must be between 6 and 30 chars!';
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = '⚠ Password and Confirm Password must be same!';
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = '⚠ Password Confirm is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignup;
