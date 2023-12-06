import CarOrder from "../models/carsOrder.js";
import sendEmail from "../helpers/sendEmail.js";


// create car order

export const orderCar = async (req, res) => {
    try {
        
        const order = await CarOrder.create({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        pickupDate: req.body.pickupDate,
        returnDate: req.body.returnDate,
        email: req.body.email,
        item: req.body.item,
        price: req.body.price, 
    });
    const email = req.body.email;
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
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        color: #333;
        margin-bottom: 10px;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${req.body.name},</p>
        <p>Your car rental order with GAGA Cars has been received and is currently being processed. Here are the details of your request:</p>
        <ul>
          <li><strong>Order Number:</strong> [Your Order Number]</li>
          <li><strong>Pickup Date and Time:</strong> [Date and Time]</li>
          <li><strong>Return Date and Time:</strong> [Date and Time]</li>
          <li><strong>Vehicle Type:</strong> [e.g., Economy, Compact, SUV, etc.]</li>
          <li><strong>Pickup Location:</strong> [Location]</li>
          <li><strong>Return Location:</strong> [Location]</li>
          <li><strong>Total Cost:</strong> $[Amount]</li>
        </ul>
        <p>We'll review your request and ensure the availability of your selected vehicle. Please expect a confirmation and further instructions within [Specify the expected response time, e.g., 24 hours].</p>
        <p>If you have any questions or need to make changes, please contact our customer service team at [Customer Service Phone Number] or [Customer Service Email Address].</p>
        <p>Thank you for choosing GAGA Cars. We're committed to making your car rental experience a smooth and enjoyable one.</p>
        <p>Best regards,<br>[Your Name]<br>[Your Title]<br>[Your Car Rental Company]</p>
      </div>
    </body>
    </html>
     `;
    sendEmail(
      '"GAGA Cars" <jaboinnovates@gmail.com>',
      email,
      "Order Confirmation: We've Received Your Car Rental Request",
      html
    );
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





