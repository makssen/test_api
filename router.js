const Router = require('express');
const PostController = require('./controllers/PostController');

const router = new Router();

router.post('/posts', PostController.create);
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getById);
router.put('/posts', PostController.update);
router.delete('/posts/:id', PostController.delete);


module.exports = router;