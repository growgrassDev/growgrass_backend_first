import { Request, Response, NextFunction } from 'express';
import { postService } from '../services/post.service';
import { IUser } from '../models/User';

export class PostController {
  async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as IUser;
      if (!user) throw new Error('Unauthorized');
      const post = await postService.createPost({
        ...req.body,
        author: user._id.toString(),
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const post = await postService.getPostById(req.params.postId);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as IUser;
      if (!user) throw new Error('Unauthorized');
      const post = await postService.updatePost(
        req.params.postId,
        user._id.toString(),
        req.body
      );
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as IUser;
      if (!user) throw new Error('Unauthorized');
      const result = await postService.deletePost(req.params.postId, user._id.toString());
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getMyPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as IUser;
      if (!user) throw new Error('Unauthorized');
      const posts = await postService.getPostsByUser(user._id.toString());
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController(); 