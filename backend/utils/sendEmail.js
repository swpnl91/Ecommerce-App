const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,    // May need a gmail-host and a port as sometimes gmail doesn't work
    port: process.env.SMTP_PORT,    // Also (for the email you're using to send emails) go to myaccount.google.com amd under 'security' turn 'less secure app access' ON - to be able to use it with nodemailer
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,   // SMTP -> Simple Mail Transfer Protocol
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;