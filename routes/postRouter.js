const Router = require('express');
const PostController = require('../controllers/PostController');

const postRouter = new Router();

postRouter.post('/posts', PostController.create);
postRouter.get('/posts', PostController.getAll);
postRouter.get('/posts/:id', PostController.getById);
postRouter.put('/posts', PostController.update);
postRouter.delete('/posts/:id', PostController.delete);

module.exports = postRouter;