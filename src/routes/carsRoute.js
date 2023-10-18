import express from 'express';
import upload from '../helpers/multer.js';
import {
    registerCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
} from '../controllers/carController.js';

const router = express.Router();

router.post('/cars', upload.single("image"), registerCar);
router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.delete('/cars/:id', deleteCar);
router.put('/cars/:id', upload.single("image"), updateCar);

export default router;