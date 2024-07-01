const express = require("express");
const { createNewUser, authenticateUser } = require("./controller");
const router = express.Router();
const auth = require("./../../middleware/auth");
const { sendVerificationOTPEmail } = require("./../email_verification/controller");

// Protected route
router.get("/private_data", auth, (req, res) => {
    res.status(200).send(`You're in the private territory of ${req.currentUser.email}`);
});

// Signin
router.post("/", async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();
        if (!(email && password)) {
            throw new Error("Empty credentials supplied!");
        }
        const authenticatedUser = await authenticateUser({ email, password });
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Signup
router.post("/signup", async (req, res) => {
    try {
        let { fullname, email, password, phone } = req.body;
        fullname = fullname.trim();
        email = email.trim();
        password = password.trim();
        phone = phone.trim();
        if (!(fullname && email && password && phone)) {
            throw new Error("Empty input fields!");
        } else if (!/^[a-zA-Z ]*$/.test(first_name) || !/^[a-zA-Z ]*$/.test(last_name)) {
            throw new Error("Invalid name entered");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new Error("Invalid email entered");
        } else if (!/^[0-9]{10}$/.test(phone)) {
            throw new Error("Invalid phone number");
        } else if (password.length < 8) {
            throw new Error("Password is too short!");
        } else {

            // Good credentials, create new user
            const newUser = await createNewUser({
                fullname,
                email,
                password,
                phone
            });
            await sendVerificationOTPEmail(email);
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
