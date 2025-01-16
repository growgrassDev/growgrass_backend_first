import { Post, IPost } from '../models/Post';
import { AppError } from '../utils/errors';
import { Types } from 'mongoose';

export class PostService {
  async createPost(data: { title: string; content: string; author: string }) {
    return Post.create(data);
  }

  async getAllPosts() {
    return Post.find().populate('author', 'name email');
  }

  async getPostById(postId: string) {
    const post = await Post.findById(postId).populate('author', 'name email');
    if (!post) {
      throw new AppError(404, 'Post not found');
    }
    return post;
  }

  async updatePost(postId: string, userId: string, data: Partial<IPost>) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(404, 'Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new AppError(403, 'Not authorized to update this post');
    }

    return Post.findByIdAndUpdate(
      postId,
      { $set: data },
      { new: true, runValidators: true }
    ).populate('author', 'name email');
  }

  async deletePost(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(404, 'Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new AppError(403, 'Not authorized to delete this post');
    }

    await post.deleteOne();
    return { message: 'Post deleted successfully' };
  }

  async getPostsByUser(userId: string) {
    return Post.find({ author: new Types.ObjectId(userId) })
      .populate('author', 'name email');
  }
}

export const postService = new PostService(); 