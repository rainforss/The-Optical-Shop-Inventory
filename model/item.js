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
      type: Boolean,
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
      type: Boolean,
      required: true,
      default: true,
    },
    imageURL: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/rainforss/image/upload/v1600671896/sample.jpg",
    },
    imageID: {
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
