const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/controller");

const verifyUserEmail = async ({ email, otp }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw new Error("Invalid code passed. Check your inbox.");
        }

        // Use $set operator to update the verified field
        const result = await User.updateOne({ email }, { $set: { verified: true } });
        console.log('Update Result:', result); // Log the update result

        if (result.nModified === 0) {
            throw new Error("Failed to update user verification status.");
        }

        await deleteOTP(email);
        return;
    } catch (error) {
        console.error('Error verifying user email:', error); // Log any errors
        throw error;
    }
};

const sendVerificationOTPEmail = async (email) => {
    try {
        // Check if an account exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("There's no account for the provided email.");
        }

        const otpDetails = {
            email,
            subject: "Email Verification",
            message: "Verify your email with the code below.",
            duration: 1,
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        console.error('Error sending verification OTP email:', error); // Log any errors
        throw error;
    }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };
