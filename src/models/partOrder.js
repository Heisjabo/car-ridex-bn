import mongoose from "mongoose";

const partOrderSchema = new mongoose.Schema({
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
    items: [
        {
            part: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SparePart',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered'],
        default: 'pending',
    },
});


const PartOrder = mongoose.model('PartOrder', partOrderSchema);

export default PartOrder;