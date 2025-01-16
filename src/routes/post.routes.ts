import { Router } from 'express';
import { authenticateJwt } from '../middleware/auth.middleware';
import { postController } from '../controllers/post.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         author:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/', authenticateJwt, postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: [Posts]
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     tags: [Posts]
 *     summary: Get post by ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */
router.get('/:postId', postController.getPostById);

/**
 * @swagger
 * /api/posts/{postId}:
 *   put:
 *     tags: [Posts]
 *     summary: Update post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 */
router.put('/:postId', authenticateJwt, postController.updatePost);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 */
router.delete('/:postId', authenticateJwt, postController.deletePost);

/**
 * @swagger
 * /api/posts/user/me:
 *   get:
 *     tags: [Posts]
 *     summary: Get my posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's posts
 */
router.get('/user/me', authenticateJwt, postController.getMyPosts);

export { router as postRoutes }; 