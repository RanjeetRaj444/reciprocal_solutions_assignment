const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { register, login };
