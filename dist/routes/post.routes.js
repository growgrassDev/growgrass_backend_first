"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
exports.postRoutes = router;
router.post('/', auth_middleware_1.authenticateJwt, post_controller_1.postController.createPost);
router.get('/', post_controller_1.postController.getAllPosts);
router.get('/:postId', post_controller_1.postController.getPostById);
router.put('/:postId', auth_middleware_1.authenticateJwt, post_controller_1.postController.updatePost);
router.delete('/:postId', auth_middleware_1.authenticateJwt, post_controller_1.postController.deletePost);
router.get('/user/me', auth_middleware_1.authenticateJwt, post_controller_1.postController.getMyPosts);
//# sourceMappingURL=post.routes.js.map