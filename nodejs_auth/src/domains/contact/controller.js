const Contact = require('./model');

exports.createContact = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const contact = new Contact({
      fullName,
      email,
      message
    });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error occurred while submitting the form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
};
