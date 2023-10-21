import CarOrder from "../models/carsOrder.js";


// create car order

export const orderCar = async (req, res) => {
    try {
        const order = await CarOrder.create({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        item: req.body.item,
        price: req.body.price, 
    });
    return res.status(201).json({ message: 'car order was sent successfully', order });
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: error.message });
    }
};

// get al car orders

export const getAllCarOrders = async (req, res) => {
    try{
      const carOrders = await CarOrder.find();
      return res.status(200).json({
        status: 'success',
        carOrders
      });
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        mesage: error.message});
    }
}

// get order by id 

export const getCarOrderById = async (req, res) => {
  try{
    const order = await CarOrder.findById(req.params.id);
    return res.status(200).json({
      status: 'success',
      order
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      mesage: error.message});
  }
}

// update order

export const updateOrder = async (req, res) => {
  try{
    const order = await CarOrder.findByIdAndUpdate(req.params.id);
    if(!order){
      return res.status(404).json({
        Error: 'Order not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      order
    });
  } catch(err){
    res.status(500).json({
      status: 'failed',
      message: err.message
    });
  }
}





