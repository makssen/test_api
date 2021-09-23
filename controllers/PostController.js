const PostService = require('../services/PostService');

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body);
            res.json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const { title, author, limit } = req.query;
            const options = {
                limit: limit || 0
            };
            let posts;
            if (!title && !author) {
                posts = await PostService.getAll({}, options);
            }
            if (title && !author) {
                posts = await PostService.getAll({ title }, options);
            }
            if (!title && author) {
                posts = await PostService.getAll({ author }, options);
            }
            if (title && author) {
                posts = await PostService.getAll({ author, title }, options);
            }
            return res.json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req, res) {
        try {
            const post = await PostService.getById(req.params.id);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body);
            return res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new PostController();