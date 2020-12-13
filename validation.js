const joi = require("joi");

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
    const pattern = /^[a-zA-Z\s]*$/;
    const schema = joi.object({
      name: joi.string().min(6).required(),
      eyeSize: joi.number().integer().max(99).min(30).required().messages({
        "number.empty": `Eye size cannot be an empty field`,
        "number.max": "Eye size cannot be greater than 99",
        "number.min": `Eye size cannot be smaller than 30`,
      }),
      bridgeWidth: joi.number().integer().max(50).min(5).required().messages({
        "number.min": `Bridge width cannot be smaller than 5`,
        "number.max": `Bridge width cannot be greater than 50`,
      }),
      templeLength: joi
        .number()
        .integer()
        .max(199)
        .min(99)
        .required()
        .required()
        .messages({
          "number.min": `Temple length cannot be smaller than 99`,
          "number.max": "Temple length cannot be greater than 199",
        }),
      material: joi.string().alphanum().required(),
      frameShape: joi
        .string()
        .pattern(pattern, "shape")
        .min(6)
        .required()
        .messages({
          "string.pattern.name": `Frameshape can only contain letters or spaces`,
        }),
      frameType: joi.string().alphanum().required(),
      frameColor: joi.string().min(7).required(),
      colorGroup: joi.string().alphanum().required(),
      hingeType: joi.string().alphanum().required(),
      hasNosePads: joi.string().alphanum().required(),
      barcode: joi.string().required().min(6),
      row: joi.number().integer().positive().max(100).required().messages({
        "number.positive": `Row number must be 1 - 100`,
        "number.max": `Row number must be 1 - 100`,
      }),
      column: joi.number().integer().positive().max(100).required().messages({
        "number.positive": `Column number must be 1 - 100`,
        "number.max": `Column number must be 1 - 100`,
      }),
      price: joi.number().positive().max(2000).required(),
      itemType: joi.string().alphanum().required(),
      inStock: joi.string().alphanum().required(),
      hasFront: joi.bool(),
      hasSide: joi.bool(),
      frontImageVersion: joi.number(),
      sideImageVersion: joi.number(),
      frontImageURL: joi.string(),
      sideImageURL: joi.string(),
    });
    return schema.validate(data);
  },
  frameShapeValidation: (data) => {
    const pattern = /^[a-zA-Z\s]*$/;
    const schema = joi.object({
      text: joi.string().pattern(pattern, "text").min(6).required().messages({
        "string.pattern.name": `Name can only contain letters or spaces`,
      }),
      value: joi.string().pattern(pattern, "value").min(6).required().messages({
        "string.pattern.name": `Value can only contain letters or spaces`,
      }),
    });
    return schema.validate(data);
  },
};
