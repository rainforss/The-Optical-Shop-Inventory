const mongoose = require("mongoose");

const frameShapeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FrameShape = mongoose.model("frameShape", frameShapeSchema);
