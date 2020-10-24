module.exports = (req, res, next) => {
  var toBeConverted = req.body.value;
  var splitStr = toBeConverted.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  req.body.text = splitStr.join(" ");
  req.body.value = req.body.value.toLowerCase();
  next();
};
