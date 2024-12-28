const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userObj = new User({ name, email, password });
        userObj.password = await bcrypt.hash(password, 10);
        await userObj.save();
        res.status(201).json({ success: true, message: 'Singup successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: true, message: 'Login succcessfully', token, email, name: user.name });
        console.log(token);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { signup, login };