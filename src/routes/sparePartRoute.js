import express from 'express';
import upload from '../helpers/multer.js';
import {
    registerPart,
    getAllParts,
    getPartById,
    updatePart,
    deletePart
} from '../controllers/sparePartController.js';

const router = express.Router();
const uploadArray = upload.array('images', 5);

router.post('/spare-parts', uploadArray, registerPart);
router.get('/spare-parts', getAllParts);
router.get('/spare-parts/:id', getPartById);
router.put('/spare-parts/:id', uploadArray, updatePart);
router.delete('/spare-parts/:id', deletePart);

export default router;