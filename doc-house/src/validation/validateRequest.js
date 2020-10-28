const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRequest = (data) => {
  const errors = {};
  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.explanation = !isEmpty(data.explanation) ? data.explanation : '';
  data.time = !isEmpty(data.time) ? data.time : '';

  if (validator.isEmpty(data.subject)) {
    errors.subject = '⚠ Subject is required!';
  }

  if (validator.isEmpty(data.explanation)) {
    errors.explanation = '⚠ Explanation is required!';
  }

  if (validator.isEmpty(data.time)) {
    errors.time = '⚠ Time is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRequest;