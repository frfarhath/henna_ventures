const OTP = require("./model");
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error("Provide values for email and OTP.");
        }
        const matchedOTPRecord = await OTP.findOne({ email });
        if (!matchedOTPRecord) {
            throw Error("No OTP records found for the provided email.");
        }
        const { expiresAt, otp: hashedOTP } = matchedOTPRecord;

        if (expiresAt < Date.now()) {
            await OTP.deleteOne({ email });
            throw Error("OTP has expired. Request a new one.");
        }

        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;
    } catch (error) {
        console.error('Error verifying OTP:', error); // Log error for debugging
        throw error;
    }
};

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error("Provide values for email, subject, and message.");
        }
        await OTP.deleteOne({ email }); // Clean any existing OTP records

        const generatedOTP = await generateOTP(); // Generate OTP
        const hashedOTP = await hashData(generatedOTP); // Hash OTP for storage

        // Email configuration
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p>
                   <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${generatedOTP}</b></p>
                   <p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        };
        await sendEmail(mailOptions); // Send email with OTP

        // Save OTP record to the database
        const newOTP = new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        console.error('Error sending OTP:', error); // Log error for debugging
        throw error;
    }
};

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({ email });
    } catch (error) {
        console.error('Error deleting OTP:', error); // Log error for debugging
        throw error;
    }
};

module.exports = { sendOTP, verifyOTP, deleteOTP };
