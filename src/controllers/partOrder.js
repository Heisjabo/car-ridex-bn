import PartOrder from "../models/partOrder.js";
import SparePart from "../models/sparePartModel.js";
// create a new part order

export const createOrder = async (req, res) => {
    try {
        const order = await PartOrder.create({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        items: req.body.items,
        totalPrice: req.body.totalPrice, 
    });
    return res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: error.message });
    }
};

// get al orders

export const getAllPartOrders = async (req, res) => {
  try{
    const partOrders = await PartOrder.find();
    return res.status(200).json({
      status: 'success',
      partOrders
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      mesage: error.message});
  }
}


// Update the status of an order 

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;                
        const newStatus = req.body.status;
        const order = await PartOrder.findByIdAndUpdate(
        orderId,
        { status: newStatus },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
      res.status(500).json({ error: 'Error updating order status' });
    }
};


// close order to delivered

export const closeOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await PartOrder.findByIdAndUpdate(
        orderId,
        { status: 'Delivered' },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json({ message: 'Order closed successfully', order });
    } catch (error) {
      res.status(500).json({ error: 'Error closing the order' });
    }
  };