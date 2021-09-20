const Router = require('express');
const UserController = require('../controllers/UserController');

const userRouter = new Router();

userRouter.post('/users', UserController.create);
userRouter.get('/users', UserController.getAll);
userRouter.get('/users/:id', UserController.getById);
userRouter.put('/users', UserController.update);
userRouter.delete('/users/:id', UserController.delete);

module.exports = userRouter;