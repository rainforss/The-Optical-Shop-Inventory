const joi = require("joi");
const { min } = require("lodash");

module.exports = {
  registerValidation: (data) => {
    const schema = joi.object({
      name: joi.string().min(6).required(),
      email: joi.string().email().min(6).required(),
      password: joi.string().alphanum().min(6).required(),
    });
    return schema.validate(data);
  },
  loginValidation: (data) => {
    const schema = joi.object({
      email: joi.string().min(6).required().email(),
      password: joi.string().alphanum().min(6).required(),
    });
    return schema.validate(data);
  },
  itemValidation: (data) => {
    const schema = joi.object({
      name: joi.string().min(6).required(),
      eyeSize: joi.string().alphanum().length(2).required().messages({
        "string.empty": `Eye size cannot be an empty field`,
        "string.length": `Eye size should be 2 digits`,
      }),
      bridgeWidth: joi.string().alphanum().min(1).max(2).required().messages({
        "string.min": `Bridge width must be one or two digits`,
        "string.max": `Bridge width must be one or two digits`,
      }),
      templeLength: joi.string().alphanum().length(3).required().messages({
        "string.length": `Temple length must be three digits`,
      }),
      material: joi.string().alphanum().required(),
      frameShape: joi.string().alphanum().required(),
      frameType: joi.string().alphanum().required(),
      frameColor: joi.string().min(7).required(),
      colorGroup: joi.string().alphanum().required(),
      hingeType: joi.string().alphanum().required(),
      hasNosePads: joi.string().alphanum().required(),
      barcode: joi.string().required().min(6),
      row: joi.number().integer().positive().max(100).required().messages({
        "string.positive": `Row number must be 1 - 100`,
        "string.max": `Row number must be 1 - 100`,
      }),
      column: joi.number().integer().positive().max(100).required().messages({
        "string.positive": `Column number must be 1 - 100`,
        "string.max": `Column number must be 1 - 100`,
      }),
      price: joi.number().positive().max(2000).required(),
      itemType: joi.string().alphanum().required(),
      inStock: joi.string().alphanum().required(),
      imageURL: joi.string(),
      imageID: joi.string().allow(""),
    });
    return schema.validate(data);
  },
};
