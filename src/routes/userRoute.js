import express from 'express';
import {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from "../controllers/userController.js";

const router = express.Router();


router.post('/user/login', loginUser);
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.patch('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Creates a blog post
 *     description: Upload a blog post with title, description, and an optional image.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: title
 *         in: formData
 *         type: string
 *         required: true
 *         description: The title of the blog post.
 *       - name: description
 *         in: formData
 *         type: string
 *         required: true
 *         description: The description of the blog post.
 *       - name: image
 *         in: formData
 *         type: file
 *         required: false
 *         description: The image to be uploaded (optional).
 *     responses:
 *       '201':
 *         description: Blog created
 *       '200':
 *         description: Success
 *       '403':
 *         description: Blog creation failed
 */
    router.post('/user/register', createUser);

export default router;