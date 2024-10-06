const nodemailer = require("nodemailer");
require('dotenv').config();

const { AUTH_EMAIL, AUTH_PASS } = process.env; // AUTH_PASS should be the App Password, not your Gmail password if 2FA is enabled

let transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail's SMTP service
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS, // Use App Password here if using 2FA
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to Gmail SMTP server:', error);
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
