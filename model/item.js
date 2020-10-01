const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
    },
    barcode: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    frameColor: {
      type: String,
      required: true,
    },
    colorGroup: {
      type: String,
      required: true,
    },
    eyeSize: {
      type: String,
      required: true,
    },
    bridgeWidth: {
      type: String,
      default: "",
    },
    templeLength: {
      type: String,
      default: "",
    },
    material: {
      type: String,
      required: true,
    },
    frameShape: {
      type: String,
      required: true,
    },
    frameType: {
      type: String,
      required: true,
    },
    hingeType: {
      type: String,
      required: true,
    },
    hasNosePads: {
      type: String,
      required: true,
    },

    row: {
      type: String,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
      default: "Sunglasses",
    },
    inStock: {
      type: String,
      required: true,
      default: true,
    },
    hasFront: {
      type: Boolean,
      required: true,
    },
    hasSide: {
      type: Boolean,
      required: true,
    },
    frontImageVersion: {
      type: String,
      default: "",
    },
    sideImageVersion: {
      type: String,
      default: "",
    },
    lastModifiedBy: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Item = mongoose.model("item", ItemSchema);
