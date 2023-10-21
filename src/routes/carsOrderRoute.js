import express from 'express';
import {
    orderCar,
    getAllCarOrders,
    getCarOrderById,
    updateOrder
} from '../controllers/carOrderController.js';

const router = express.Router();

router.get('/cars-order', getAllCarOrders);
router.post('/cars-order', orderCar);
router.get('/cars-order/:id', getCarOrderById);
router.put('/cars-order/:id', updateOrder);


export default router;