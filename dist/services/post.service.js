"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = exports.PostService = void 0;
const Post_1 = require("../models/Post");
const errors_1 = require("../utils/errors");
const mongoose_1 = require("mongoose");
class PostService {
    async createPost(data) {
        return Post_1.Post.create(data);
    }
    async getAllPosts() {
        return Post_1.Post.find().populate('author', 'name email');
    }
    async getPostById(postId) {
        const post = await Post_1.Post.findById(postId).populate('author', 'name email');
        if (!post) {
            throw new errors_1.AppError(404, 'Post not found');
        }
        return post;
    }
    async updatePost(postId, userId, data) {
        const post = await Post_1.Post.findById(postId);
        if (!post) {
            throw new errors_1.AppError(404, 'Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new errors_1.AppError(403, 'Not authorized to update this post');
        }
        return Post_1.Post.findByIdAndUpdate(postId, { $set: data }, { new: true, runValidators: true }).populate('author', 'name email');
    }
    async deletePost(postId, userId) {
        const post = await Post_1.Post.findById(postId);
        if (!post) {
            throw new errors_1.AppError(404, 'Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new errors_1.AppError(403, 'Not authorized to delete this post');
        }
        await post.deleteOne();
        return { message: 'Post deleted successfully' };
    }
    async getPostsByUser(userId) {
        return Post_1.Post.find({ author: new mongoose_1.Types.ObjectId(userId) })
            .populate('author', 'name email');
    }
}
exports.PostService = PostService;
exports.postService = new PostService();
//# sourceMappingURL=post.service.js.map