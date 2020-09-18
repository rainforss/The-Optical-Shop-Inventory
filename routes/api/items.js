const router = require("express").Router();
const verify = require("../../utilities/verifyToken");
const Item = require("../../model/item");
const User = require("../../model/User");

//@route GET api/items
//@desc Get all inventory items
//@access Public

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ barcode: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server internal error. Cannot handle request at the moment",
    });
  }
});

//@route GET api/items

//@route POST api/items
//@desc Add an item
//@access Private

router.post("/", verify, async (req, res) => {
  //const currentUser = await User.findOne({ _id: req.user });
  const newItem = new Item({
    name: req.body.name,
    barcode: req.body.barcode,
    row: req.body.row,
    column: req.body.column,
    price: req.body.price,
    itemType: req.body.itemType,
    inStock: req.body.inStock,
    //lastModifiedBy: currentUser.email,
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

//@route DELETE api/items/:id
//@desc Delete an item
//@access Private

router.delete("/:id", verify, async (req, res) => {
  try {
    const toBeDeleted = await Item.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      msg: `${toBeDeleted.name} with barcode ${toBeDeleted.barcode} has been removed from the inventory`,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: `${err.message}. Item was not found in the current inventory`,
    });
  }
});

module.exports = router;
