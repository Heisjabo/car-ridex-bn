import mongoose from "mongoose";

const carsOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    pickupDate:{
        type: Date,
        required: false,
    },
    returnDate:{
        type: Date,
        required: false,
    },
    item: {
            type: String,
            required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered'],
        default: 'pending',
    },
});


const CarOrder = mongoose.model('CarOrder', carsOrderSchema);

export default CarOrder;