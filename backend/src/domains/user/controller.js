const User = require("./model");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("./../../util/createToken");

const authenticateUser = async (data) => {
    try {
        const { email, password } = data;

        const fetchedUser = await User.findOne({ email });
        if (!fetchedUser) {
            throw new Error("Invalid credentials entered!");
        }
        if (!fetchedUser.verified) {
            throw new Error("Email hasn't been verified yet. Check your inbox.");
        }
        const passwordMatch = await verifyHashedData(password, fetchedUser.password);
        if (!passwordMatch) {
            throw new Error("Invalid password entered!");
        }

        // Create user token
        const tokenData = { userId: fetchedUser._id, email };
        const token = await createToken(tokenData);

        // Assign user token
        fetchedUser.token = token;
        await fetchedUser.save(); // Save the token to the user

        // Return user without password
        const userToReturn = fetchedUser.toObject();
        delete userToReturn.password;
        return userToReturn;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};

const createNewUser = async (data) => {
    try {
        const { fullname, email, password, phone } = data;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User with the provided email already exists");
        }

        // Hash password
        const hashedPassword = await hashData(password);

        // Create new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phone,
            verified: false, // Ensure new users are not verified by default
        });

        // Save user
        const createdUser = await newUser.save();

        // Return user without password
        const userToReturn = createdUser.toObject();
        delete userToReturn.password;
        return userToReturn;
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
};

module.exports = { createNewUser, authenticateUser };
