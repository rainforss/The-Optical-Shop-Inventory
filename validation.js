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
      eyeSize: joi.string().alphanum().min(2).required(),
      bridgeWidth: joi.string().alphanum().min(1).required(),
      templeLength: joi.string().alphanum().min(3).required(),
      material: joi.string().alphanum().required(),
      frameShape: joi.string().alphanum().required(),
      frameType: joi.string().alphanum().required(),
      frameColor: joi.string().min(7).required(),
      colorGroup: joi.string().alphanum().required(),
      hingeType: joi.string().alphanum().required(),
      hasNosePads: joi.bool().required(),
      barcode: joi.string().required().min(6),
      row: joi.number().integer().positive().max(100).required(),
      column: joi.number().integer().positive().max(100).required(),
      price: joi.number().positive().max(2000).required(),
      itemType: joi.string().alphanum().required(),
      inStock: joi.bool().required(),
      imageURL: joi.string(),
      imageID: joi.string().allow(""),
    });
    return schema.validate(data);
  },
};
