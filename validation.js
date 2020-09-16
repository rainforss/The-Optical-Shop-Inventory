const joi = require("joi");

module.exports = {
  registerValidation: (data) => {
    const schema = joi.object({
      name: joi.string().min(6).required(),
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  loginValidation: (data) => {
    const schema = joi.object({
      name: joi.string().min(6).required(),
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
};
