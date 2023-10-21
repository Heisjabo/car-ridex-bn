import PartOrder from "../models/partOrder.js";
import SparePart from "../models/sparePartModel.js";
import sendEmail from "../helpers/sendEmail.js";
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
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #333;
  }
  p {
    color: #555;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f0f0f0;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Spare Parts Order Confirmation</h1>
    <p>Dear ${req.body.name},</p>
    <p>We are pleased to confirm that we have successfully received your spare parts order. Thank you for choosing [Your Company Name] for your automotive needs.</p>
    <p>Here is a summary of your spare parts order:</p>
    <ul>
      <li><strong>Order Number:</strong> [Your Order Number]</li>
      <li><strong>Order Date:</strong> [Date]</li>
      <li><strong>Estimated Delivery Date:</strong> [Estimated Delivery Date]</li>
      <li><strong>Shipping Address:</strong> [Shipping Address]</li>
    </ul>
    <p><strong>Order Details:</strong></p>
    <table>
      <tr>
        <th>Part Number</th>
        <th>Part Description</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total Price</th>
      </tr>
      <tr>
        <td>[Part Number]</td>
        <td>[Part Description]</td>
        <td>[Quantity]</td>
        <td>$[Unit Price]</td>
        <td>$[Total Price]</td>
      </tr>
    </table>
    <p><strong>Total Amount:</strong> $[Total Amount]</p>
    <p>Our team is diligently processing your order and will prepare it for shipment. Please note that the estimated delivery date is [Estimated Delivery Date]. You will receive a separate email with shipment tracking information once your order has been dispatched.</p>
    <p>If you have any questions or require further assistance, please do not hesitate to contact our customer service team at [Customer Service Phone Number] or [Customer Service Email Address].</p>
    <p>We appreciate your trust in [Your Company Name] for your spare parts needs. Our commitment is to provide you with high-quality parts and exceptional service.</p>
    <p>Thank you for choosing us. We look forward to serving you.</p>
    <p>Best regards,<br>[Your Name]<br>[Your Title]<br>[Your Company Name]<br>[Contact Information]</p>
  </div>
</body>
</html>`;
sendEmail(
  '"GAGA Cars" <jaboinnovates@gmail.com>',
  req.body.email,
  "Order Confirmation: We've Received Your Spare Part Order",
  html
);

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