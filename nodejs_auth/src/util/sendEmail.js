const nodemailer = require("nodemailer");
require('dotenv').config();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to Outlook SMTP server:', error);
    } else {
        console.log("Ready to send emails");
        console.log('Success:', success);
    }
});

const sendEmail = async (mailOptions) => {
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
