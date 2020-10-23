const router = require("express").Router();
const verify = require("../../utilities/verifyToken");
const FrameShape = require("../../model/frameShape");
const validate = require("../../validation");
const format = require("../../utilities/formatter");

router.get("/frameshapes", async (req, res) => {
  try {
    const frameShapes = await FrameShape.find({}).sort({ name: "asc" });
    res.status(200).json(frameShapes);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}. Server internal error. Cannot handle request at the moment`,
    });
  }
});

router.post("/frameshapes", verify, format, async (req, res) => {
  const { error } = validate.frameShapeValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const typeWithSameName = await FrameShape.findOne({
      name: req.body.name,
    });
    if (typeWithSameName) {
      return res.status(400).json({
        success: false,
        msg: "Frame type with same name already exists in the system",
      });
    }
    const newType = new FrameShape({
      name: req.body.name,
    });
    const savedFrameShape = await newType.save();
    res.json(savedFrameShape);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}, frame type was not added successfully.`,
    });
  }
});

router.put("/frameshapes/:id", verify, format, async (req, res) => {
  const { error } = validate.frameShapeValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const typeWithSameName = await FrameShape.findOne({
      _id: { $ne: req.params.id },
      name: req.body.name,
    });
    if (typeWithSameName) {
      return res.status(400).json({
        success: false,
        msg: "Frame type with same name already exists in the system",
      });
    }
    const modifiedType = await FrameShape.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    res.json(modifiedType);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}, frame type was not modified successfully.`,
    });
  }
});

router.delete("/frameshapes/:id", verify, async (req, res) => {
  try {
    const deleteResult = await FrameShape.findByIdAndRemove(req.params.id);
    res.json(deleteResult);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}, frame type was not deleted successfully.`,
    });
  }
});

module.exports = router;
