"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = exports.PostController = void 0;
const post_service_1 = require("../services/post.service");
class PostController {
    async createPost(req, res, next) {
        try {
            const user = req.user;
            if (!user)
                throw new Error('Unauthorized');
            const post = await post_service_1.postService.createPost({
                ...req.body,
                author: user._id.toString(),
            });
            res.status(201).json(post);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllPosts(_req, res, next) {
        try {
            const posts = await post_service_1.postService.getAllPosts();
            res.json(posts);
        }
        catch (error) {
            next(error);
        }
    }
    async getPostById(req, res, next) {
        try {
            const post = await post_service_1.postService.getPostById(req.params.postId);
            res.json(post);
        }
        catch (error) {
            next(error);
        }
    }
    async updatePost(req, res, next) {
        try {
            const user = req.user;
            if (!user)
                throw new Error('Unauthorized');
            const post = await post_service_1.postService.updatePost(req.params.postId, user._id.toString(), req.body);
            res.json(post);
        }
        catch (error) {
            next(error);
        }
    }
    async deletePost(req, res, next) {
        try {
            const user = req.user;
            if (!user)
                throw new Error('Unauthorized');
            const result = await post_service_1.postService.deletePost(req.params.postId, user._id.toString());
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getMyPosts(req, res, next) {
        try {
            const user = req.user;
            if (!user)
                throw new Error('Unauthorized');
            const posts = await post_service_1.postService.getPostsByUser(user._id.toString());
            res.json(posts);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PostController = PostController;
exports.postController = new PostController();
//# sourceMappingURL=post.controller.js.map