import { Request, Response, NextFunction } from 'express';
import { postService } from '../services/post.service';

export class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as { _id: string })._id;
      const post = await postService.createPost({
        ...req.body,
        author: userId,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(_req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postService.getPostById(req.params.postId);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as { _id: string })._id;
      const post = await postService.updatePost(
        req.params.postId,
        userId,
        req.body
      );
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as { _id: string })._id;
      const result = await postService.deletePost(req.params.postId, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getMyPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as { _id: string })._id;
      const posts = await postService.getPostsByUser(userId);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController(); 