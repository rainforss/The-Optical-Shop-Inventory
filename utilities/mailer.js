const nodemailer = require("nodemailer");

module.exports = (mail, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL_USER,
      pass: process.env.HOST_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `The Optical Shop IMS ${process.env.HOST_EMAIL_USER}`,
    //to: req.body.email, coming from auth configuration
    subject: "Welcome to IMS",
    text: "Please finish the activation process so you can log in",
    //html: `Please click <a href="${activationLink}">HERE</a> to activate your account.`, coming from auth configuration
    ...mail,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error)
      return res.json({
        msg: "Activation link was not sent successfully, please try again",
      });
  });
};
