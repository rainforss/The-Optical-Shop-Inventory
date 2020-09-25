const nodemailer = require("nodemailer");

module.exports = (mail, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAUTH2",
      user: process.env.HOST_EMAIL_USER,
      clientId: process.env.MAIL_CLIENT_ID,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
      accessToken: process.env.MAIL_ACCESS_TOKEN,
      expires: 3599,
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

  transporter.sendMail(mailOptions);
};
