import express from 'express';
import {
    createOrder,
    updateOrderStatus,
    closeOrder,
    getAllPartOrders
} from '../controllers/partOrder.js';


const router = express.Router();

router.post('/orderPart', createOrder);
router.get('/sparePart/orders', getAllPartOrders);
router.put('/orderPart/:orderId', updateOrderStatus);
router.put('/closePartOrder', closeOrder);

export default router;