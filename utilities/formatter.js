module.exports = (req, res, next) => {
  var splitStr = req.body.name.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  req.body.name = splitStr.join(" ");
  next();
};
