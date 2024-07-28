const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    // Check for provided token
    if (!token) {
        return res.status(403).send("An authentication token is required");
    }

    // Verify token
    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
        next(); // Call next middleware
    } catch (error) {
        return res.status(401).send("Invalid Token provided");
    }
};

module.exports = verifyToken;
