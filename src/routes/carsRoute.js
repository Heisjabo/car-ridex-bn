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
const uploadArray = upload.array('images', 5);

router.post('/cars', uploadArray, registerCar);
router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.delete('/cars/:id', deleteCar);
router.put('/cars/:id', uploadArray, updateCar);

export default router;