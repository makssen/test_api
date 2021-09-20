const Post = require("../models/Post");

class PostService {
    async create(post) {
        const createdPost = await Post.create(post);
        return createdPost;
    }

    async getAll(obj = {}, options) {
        const posts = await Post.find(obj).limit(Number(options.limit)).exec();
        return posts;
    }

    async getById(id) {
        if (!id) {
            throw new Error('id not specified');
        }
        const post = await Post.findById(id);
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('id not specified');
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('id not specified');
        }
        const post = await Post.findByIdAndDelete(id);
        return post;
    }
}

module.exports = new PostService();