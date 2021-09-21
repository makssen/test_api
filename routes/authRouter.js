const Router = require('express');
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const authRouter = new Router();

authRouter.post('/signup', [
        check('email', 'Username cannot be empty').isEmail(),
        check('password', 'Password must be between 4 and 10 characters').isLength({ min: 4, max: 10 })
    ],
    AuthController.signup
);
authRouter.post('/login', AuthController.login);
authRouter.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);

module.exports = authRouter;