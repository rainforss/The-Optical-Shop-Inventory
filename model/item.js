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
      default: "test",
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
