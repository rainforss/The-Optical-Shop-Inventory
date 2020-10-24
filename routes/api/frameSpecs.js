const router = require("express").Router();
const verify = require("../../utilities/verifyToken");
const FrameShape = require("../../model/frameShape");
const validate = require("../../validation");
const format = require("../../utilities/formatter");
const Item = require("../../model/item");

router.get("/frameshapes", async (req, res) => {
  try {
    const frameShapes = await FrameShape.find({}).sort({ text: "asc" });
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
      value: req.body.value,
    });
    if (typeWithSameName) {
      return res.status(400).json({
        success: false,
        msg: "Frame type with same name already exists in the system",
      });
    }
    const newType = new FrameShape({
      text: req.body.text,
      value: req.body.value,
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
      value: req.body.value,
    });
    if (typeWithSameName) {
      return res.status(400).json({
        success: false,
        msg: "Frame type with same name already exists in the system",
      });
    }

    const toBeModified = await FrameShape.findById(req.params.id);
    const updateResult = await Item.updateMany(
      { frameShape: toBeModified.value },
      { frameShape: req.body.value }
    );
    const modifiedType = await FrameShape.findByIdAndUpdate(
      req.params.id,
      { value: req.body.value, text: req.body.text },
      { new: true }
    );
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
    const toBeDeleted = await FrameShape.findById(req.params.id);
    const itemWithThisShape = await Item.findOne({
      frameShape: toBeDeleted.value,
    });
    if (itemWithThisShape) {
      return res.status(400).json({
        success: false,
        msg: `Cannot delete ${toBeDeleted.text} since there are inventory items with this shape`,
      });
    } else {
      const deleteResult = await toBeDeleted.remove();
      res.json(deleteResult);
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}, frame type was not deleted successfully.`,
    });
  }
});

module.exports = router;
