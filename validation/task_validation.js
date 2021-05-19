const Validator = require('validator');
const TextValidator = require('./text_validation');
module.exports = function validateTask(data) {
  let errors = {};
  console.log("data", data.name)
  if (Validator.isEmpty(data.name) || !TextValidator(data.name)) {
    errors.name = "Task name cannot be empty."
  }
  if (data.color < 0 || data.color > 4) {
    errors.color = "invalid color."
  }
  return ({
    errors,
    isValid: Object.keys(errors).length === 0
  })
}