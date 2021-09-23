const Post = require("../models/Post");
const FileService = require("./FileService");

class PostService {
    async create(post) {
        if (!post.author || !post.text || !post.title) {
            throw new Error('Request body with empty fields');
        }
        const filename = await FileService.saveFile(post.image);
        const createdPost = await Post.create({...post, image: filename });
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