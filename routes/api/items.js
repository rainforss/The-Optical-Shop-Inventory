const router = require("express").Router();
const verify = require("../../utilities/verifyToken");
const Item = require("../../model/item");
const validate = require("../../validation");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

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
  // const pageNumber = parseInt(req.query.pageNum);
  // const pageSize = parseInt(req.query.pageSize);
  // const priceMax = parseInt(req.query.priceMax);
  // const priceMin = parseInt(req.query.priceMin);
  // const colorGroup = req.query.colorGroup;
  // const material = req.query.material;
  // const eyeSizeMax = parseInt(req.query.eyeSizeMax);
  // const eyeSizeMin = parseInt(req.query.eyeSizeMin);
  // const templeLengthMax = parseInt(req.query.templeLengthMax);
  // const templeLengthMin = parseInt(req.query.templeLengthMin);
  // const frameShape = req.query.frameShape;
  // const frameType = req.query.frameType;
  // const hingeType = req.query.hingeType;
  // const nosePads = req.query.nosePads;
  // const eyewearType = req.query.eyewearType;

  const {
    keywords,
    pageNum,
    pageSize,
    priceMax,
    priceMin,
    colorGroup,
    material,
    eyeSizeMax,
    eyeSizeMin,
    templeLengthMax,
    templeLengthMin,
    frameShape,
    frameType,
    hingeType,
    nosePads,
    itemType,
  } = req.query;
  let filter = {};
  if (keywords) {
    const searchPattern = RegExp(`${keywords}`, "i");
    filter.$or = [
      { name: { $regex: searchPattern } },
      { barcode: { $regex: searchPattern } },
    ];
  }
  if (priceMax && priceMin) {
    filter.price = { $gte: parseInt(priceMin), $lt: parseInt(priceMax) };
  }
  if (eyeSizeMax && eyeSizeMin) {
    filter.eyeSize = { $gte: eyeSizeMin, $lt: eyeSizeMax };
  }
  if (templeLengthMax && templeLengthMin) {
    filter.templeLength = { $gte: templeLengthMin, $lt: templeLengthMax };
  }
  if (colorGroup) {
    filter.colorGroup = colorGroup;
  }
  if (material) {
    filter.material = material;
  }
  if (frameShape) {
    filter.frameShape = frameShape;
  }
  if (frameType) {
    filter.frameType = frameType;
  }
  if (hingeType) {
    filter.hingeType = hingeType;
  }
  if (nosePads) {
    filter.hasNosePads = nosePads;
  }
  if (itemType) {
    filter.itemType = itemType;
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
    const items = await Item.find(filter)
      .limit(pageSize)
      .skip(pageSize * (pageNum - 1))
      .sort({ barcode: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server internal error. Cannot handle request at the moment",
    });
  }
});

//@route GET api/items
//@desc Search inventory by name
//@access Public

// router.post("/search", async (req, res) => {
//   try {
//     const searchPattern = RegExp(`${req.body.query}`, "i");
//     const items = await Item.find({
//       $or: [
//         { name: { $regex: searchPattern } },
//         { barcode: { $regex: searchPattern } },
//       ],
//     }).sort({ barcode: 1 });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       msg: `${err.message}. Server internal error. Cannot handle request at the moment`,
//     });
//   }
// });

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
  const newItem = new Item({
    name: req.body.name,
    eyeSize: req.body.eyeSize,
    bridgeWidth: req.body.bridgeWidth,
    templeLength: req.body.templeLength,
    material: req.body.material,
    frameShape: req.body.frameShape,
    frameType: req.body.frameType,
    frameColor: req.body.frameColor,
    colorGroup: req.body.colorGroup,
    hingeType: req.body.hingeType,
    hasNosePads: req.body.hasNosePads,
    barcode: req.body.barcode,
    row: req.body.row,
    column: req.body.column,
    price: req.body.price,
    itemType: req.body.itemType,
    inStock: req.body.inStock,
    imageURL: req.body.imageURL,
    imageID: req.body.imageID,
    lastModifiedBy: req.user,
  });
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
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: `${err},Item was not added successfully.` });
  }
});

//@route PUT api/items/:id
//@desc Update an item
//@access Private

router.put("/:id", verify, async (req, res) => {
  //Validate input data before sending
  const { updatedItem, hasNewImage } = req.body;
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
    toBeUpdated.eyeSize = updatedItem.eyeSize;
    toBeUpdated.bridgeWidth = updatedItem.bridgeWidth;
    toBeUpdated.templeLength = updatedItem.templeLength;
    toBeUpdated.material = updatedItem.material;
    toBeUpdated.frameShape = updatedItem.frameShape;
    toBeUpdated.frameType = updatedItem.frameType;
    toBeUpdated.frameColor = updatedItem.frameColor;
    toBeUpdated.colorGroup = updatedItem.colorGroup;
    toBeUpdated.hingeType = updatedItem.hingeType;
    toBeUpdated.hasNosePads = updatedItem.hasNosePads;
    toBeUpdated.barcode = updatedItem.barcode;
    toBeUpdated.price = updatedItem.price;
    toBeUpdated.row = updatedItem.row;
    toBeUpdated.column = updatedItem.column;
    toBeUpdated.inStock = updatedItem.inStock;
    toBeUpdated.itemType = updatedItem.itemType;
    toBeUpdated.lastModifiedBy = req.user;
    //Update the image id and URL if new image updated
    if (hasNewImage && updatedItem.imageID && updatedItem.imageURL) {
      //Destroy if the current image is not the default file, if imageID remains the same Cloudinary will invalidate the old version so no action required
      if (toBeUpdated.imageID !== updatedItem.imageID) {
        cloudinary.uploader.destroy(toBeUpdated.imageID, { invalidate: true });
      }

      //After disposal of old image information, set updated information
      toBeUpdated.imageID = updatedItem.imageID;
      toBeUpdated.imageURL = updatedItem.imageURL;
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

router.post("/:id", verify, async (req, res) => {
  try {
    //Delete the image on Cloudinary if it is not the default image (non-default images have a public_id)
    const { public_id } = req.body;
    if (public_id) {
      cloudinary.uploader.destroy(public_id);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: `${err}. Server error, please try again`,
    });
  }

  try {
    //If image deleted successfully or no image, then remove the item from database
    const toBeDeleted = await Item.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      msg: `${toBeDeleted.name} with barcode ${toBeDeleted.barcode} has been removed from the inventory`,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      msg: `${err.message}. Item was not found in the current inventory`,
    });
  }
});

//@route POST api/items/

module.exports = router;
