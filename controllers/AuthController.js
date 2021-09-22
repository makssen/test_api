const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const generateAccessToken = (id, email, roles) => {
    const payload = {
        id,
        email,
        roles
    }
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
}

class AuthController {
    async signup(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Signup error', errors });
            }

            const { nick, email, password } = req.body;
            const cretedUser = await User.findOne({ email });

            if (cretedUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({ nick, email, password: hashPassword, roles: userRole.value });

            await user.save();

            const token = generateAccessToken(user._id, user.email, user.roles);
            return res.json({ token, data: jwt_decode(token) });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Signup error' });
        }
    }

    async login(req, res) {
        try {
            console.log(process.env.SECRET);
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User with this email was not found' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = generateAccessToken(user._id, user.email, user.roles);
            return res.json({ token, data: jwt_decode(token) });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new AuthController();