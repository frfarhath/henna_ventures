const jwt = require("jsonwebtoken");

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = async (tokenData, tokenKey = TOKEN_KEY, expiresIn = TOKEN_EXPIRY) => {
    try {
        console.log("Creating token with:", tokenKey, expiresIn, tokenData); // Debugging output
        const token = await jwt.sign(tokenData, tokenKey, { expiresIn });
        return token;
    } catch (error) {
        console.error("Error creating token:", error); // Error logging
        throw error;
    }
};

module.exports = createToken;
