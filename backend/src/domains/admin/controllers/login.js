const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Environment variables
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email matches
    if (email !== ADMIN_EMAIL) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    if (password !== ADMIN_PASSWORD) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      admin: {
        email: ADMIN_EMAIL
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
