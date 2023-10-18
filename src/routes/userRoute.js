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

router.post('/users', createUser);

router.post('/users/login', loginUser);

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/:id', updateUserById);

router.delete('/users/:id', deleteUserById);

export default router;