import express from 'express';
import {
    createMessage,
    getMessages,
    getMessageById,
    deleteMessage
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', createMessage);

router.get('/contacts', getMessages);

router.get('/contacts/:id', getMessageById);

router.delete('/contacts/:id', deleteMessage);

export default router;