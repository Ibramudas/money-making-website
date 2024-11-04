const jwt = require('jsonwebtoken');
const User = require('./user.model');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.json({ message: 'Invalid username or password' });
    } else {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.json({ message: 'Invalid username or password' });
        } else {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });
            res.json({ token });
        }
    }
};
module.exports = { registerUser, loginUser };


