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

router.post('/spare-parts', upload.single("image"), registerPart);
router.get('/spare-parts', getAllParts);
router.get('/spare-parts/:id', getPartById);
router.put('/spare-parts/:id', upload.single("image"), updatePart);
router.delete('/spare-parts/:id', deletePart);

export default router;