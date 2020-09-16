const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    post: {
      title: "My first post",
      content: "random data you should not access",
    },
  });
});

module.exports = router;
