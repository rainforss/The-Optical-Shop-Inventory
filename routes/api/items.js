const router = require("express").Router();
const verify = require("../../utilities/verifyToken");
const Item = require("../../model/item");
const validate = require("../../validation");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { db } = require("../../model/item");

dotenv.config({ path: "./config/config.env" });

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//@route GET api/items
//@desc Get all inventory items
//@access Public

router.get("/", async (req, res) => {
  const {
    keywords,
    pageNum,
    pageSize,

    colorGroup,
    material,
    frameShape,
    frameType,
    hingeType,
    hasNosePads,
    itemType,
    sortBy,
  } = req.query;
  let filter = {};
  let sortName, sequence;

  if (keywords) {
    const searchPattern = RegExp(`${keywords}`, "i");
    filter.$or = [
      { name: { $regex: searchPattern } },
      { barcode: { $regex: searchPattern } },
    ];
  }
  if (colorGroup) {
    filter.colorGroup = { $in: colorGroup };
  }
  if (material) {
    filter.material = { $in: material };
  }
  if (frameShape) {
    filter.frameShape = { $in: frameShape };
  }
  if (frameType) {
    filter.frameType = { $in: frameType };
  }
  if (hingeType) {
    filter.hingeType = { $in: hingeType };
  }
  if (hasNosePads) {
    filter.hasNosePads = { $in: hasNosePads };
  }
  if (itemType) {
    filter.itemType = { $in: itemType };
  }
  if (sortBy) {
    [sortName, sequence] = sortBy.split(" ");
  }

  if (pageNum <= 0) {
    return res.json({
      success: false,
      msg: "Invalid page number, page number starts from 1",
    });
  }
  if (pageSize <= 0) {
    return res.json({
      success: false,
      msg: "Invalid page size, must be greater than 0",
    });
  }
  try {
    /* USED TO INTEGRATE WITH SHOPIFY */
    // const specialChars = ["&", `'`];
    // const rootURL = "https://res.cloudinary.com/rainforss/image/upload/";
    // const all = await Item.find();
    // await all.forEach(async (item) => {
    //   item.frontImageURL = item.hasFront
    //     ? specialChars.some((el) => item.name.includes(el))
    //       ? `${encodeURIComponent(
    //           encodeURIComponent(item.name)
    //         )}AND${encodeURIComponent(encodeURIComponent(item.barcode))}FRONT`
    //       : `${encodeURIComponent(item.name)}AND${encodeURIComponent(
    //           item.barcode
    //         )}FRONT`
    //     : "sample";
    //   item.frontImageURL =
    //     rootURL + "v" + item.frontImageVersion + "/" + item.frontImageURL;
    //   item.sideImageURL = item.hasFront
    //     ? specialChars.some((el) => item.name.includes(el))
    //       ? `${encodeURIComponent(
    //           encodeURIComponent(item.name)
    //         )}AND${encodeURIComponent(encodeURIComponent(item.barcode))}SIDE`
    //       : `${encodeURIComponent(item.name)}AND${encodeURIComponent(
    //           item.barcode
    //         )}SIDE`
    //     : "sample";
    //   item.sideImageURL =
    //     rootURL + "v" + item.sideImageVersion + "/" + item.sideImageURL;
    //   await item.save();
    // });
    const items = Item.find(filter)
      .sort({ [sortName]: sequence, row: -1, column: 1 })
      .limit(parseInt(pageSize))
      .skip(parseInt(pageSize) * (parseInt(pageNum) - 1));
    const count = Item.countDocuments(filter);
    const results = await Promise.all([items, count]);
    const data = { items: results[0], count: results[1] };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `${err.message}. Server internal error. Cannot handle request at the moment`,
    });
  }
});

//@Route GET api/items
//@desc Search inventory by barcode
//@access Public

//@route POST api/items
//@desc Add an item
//@access Private

router.post("/", verify, async (req, res) => {
  //Validate input data before sending
  const { error } = validate.itemValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  //const currentUser = await User.findOne({ _id: req.user });

  try {
    const itemAtSamePosition = await Item.findOne({
      row: req.body.row,
      column: req.body.column,
    });
    if (itemAtSamePosition)
      return res.status(400).json({
        success: false,
        msg:
          "Item with same location already exists in the inventory, pick another location",
      });
    const newItem = new Item({
      name: req.body.name,
      eyeSize: parseInt(req.body.eyeSize),
      bridgeWidth: parseInt(req.body.bridgeWidth),
      templeLength: parseInt(req.body.templeLength),
      material: req.body.material,
      frameShape: req.body.frameShape,
      frameType: req.body.frameType,
      frameColor: req.body.frameColor,
      colorGroup: req.body.colorGroup,
      hingeType: req.body.hingeType,
      hasNosePads: req.body.hasNosePads,
      barcode: req.body.barcode,
      row: parseInt(req.body.row),
      column: parseInt(req.body.column),
      price: parseInt(req.body.price),
      itemType: req.body.itemType,
      inStock: req.body.inStock,
      hasFront: req.body.hasFront,
      hasSide: req.body.hasSide,
      lastModifiedBy: req.user,
    });
    const savedItem = await newItem.save();

    res.json(savedItem);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: `${err},Item was not added successfully.` });
  }
});

//@route PUT api/items/:id/version
//@desc Update an item image version
//@access Private

router.put("/:id/version", verify, async (req, res) => {
  try {
    const id = req.params.id;
    const { frontImageVersion, sideImageVersion } = req.body;
    let item;
    if (frontImageVersion && sideImageVersion) {
      item = await Item.findByIdAndUpdate(
        id,
        {
          frontImageVersion: frontImageVersion,
          sideImageVersion: sideImageVersion,
        },
        { new: true }
      );
    } else if (!frontImageVersion && sideImageVersion) {
      item = await Item.findByIdAndUpdate(
        id,
        { sideImageVersion: sideImageVersion },
        { new: true }
      );
    } else if (frontImageVersion && !sideImageVersion) {
      item = await Item.findByIdAndUpdate(
        id,
        { frontImageVersion: frontImageVersion },
        { new: true }
      );
    } else {
      item = await Item.findById(id);
    }

    res.json(item);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: `${err}, version update failed` });
  }
});

//@route PUT api/items/:id
//@desc Update an item
//@access Private

router.put("/:id", verify, async (req, res) => {
  //Validate input data before sending
  const updatedItem = req.body;
  const { error } = validate.itemValidation(updatedItem);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    //Find if the location is already occupied
    const itemAtSamePosition = await Item.findOne({
      row: updatedItem.row,
      column: updatedItem.column,
      _id: { $ne: req.params.id },
    });
    if (itemAtSamePosition)
      return res.status(400).json({
        success: false,
        msg:
          "Item with same location already exists in the inventory, pick another location",
      });

    //Then find the original item and construct the new item object
    const toBeUpdated = await Item.findById(req.params.id);
    toBeUpdated.name = updatedItem.name;
    toBeUpdated.eyeSize = parseInt(updatedItem.eyeSize);
    toBeUpdated.bridgeWidth = parseInt(updatedItem.bridgeWidth);
    toBeUpdated.templeLength = parseInt(updatedItem.templeLength);
    toBeUpdated.material = updatedItem.material;
    toBeUpdated.frameShape = updatedItem.frameShape;
    toBeUpdated.frameType = updatedItem.frameType;
    toBeUpdated.frameColor = updatedItem.frameColor;
    toBeUpdated.colorGroup = updatedItem.colorGroup;
    toBeUpdated.hingeType = updatedItem.hingeType;
    toBeUpdated.hasNosePads = updatedItem.hasNosePads;
    toBeUpdated.barcode = updatedItem.barcode;
    toBeUpdated.price = parseInt(updatedItem.price);
    toBeUpdated.row = parseInt(updatedItem.row);
    toBeUpdated.column = parseInt(updatedItem.column);
    toBeUpdated.inStock = updatedItem.inStock;
    toBeUpdated.itemType = updatedItem.itemType;
    toBeUpdated.lastModifiedBy = req.user;
    if (updatedItem.hasFront) {
      toBeUpdated.hasFront = updatedItem.hasFront;
    }
    if (updatedItem.hasSide) {
      toBeUpdated.hasSide = updatedItem.hasSide;
    }
    if (updatedItem.sideImageVersion) {
      toBeUpdated.sideImageVersion = updatedItem.sideImageVersion;
    }
    if (updatedItem.frontImageVersion) {
      toBeUpdated.frontImageVersion = updatedItem.frontImageVersion;
    }

    //Send new information back to the app for re-rendering
    const afterUpdate = await toBeUpdated.save();
    res.status(200).json(afterUpdate);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: `${err}, update failed, please try again` });
  }
});

//@route POST api/items/:item
//@desc Delete an item and its image if image is not default (on Cloudinary)
//@access Private

router.delete("/:id", verify, async (req, res) => {
  try {
    //If image deleted successfully or no image, then remove the item from database
    const { front, side } = req.query;
    if (front) {
      cloudinary.uploader.destroy(front);
    }
    if (side) {
      cloudinary.uploader.destroy(side);
    }
    const toBeDeleted = await Item.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      msg: `${toBeDeleted.name} with barcode ${toBeDeleted.barcode} has been removed from the inventory`,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      msg: `${err.message}. Item was not deleted successfully, please try again.`,
    });
  }
});

//@route POST api/items/

module.exports = router;
