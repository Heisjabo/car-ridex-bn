import mongoose from 'mongoose';

const sparePartSchema = new mongoose.Schema({
    partName: {
      type: String,
      required: true,
    },
    description: String,
    images: [String],
    brand: String,
    modelCompatibility: [String],
    yearCompatibility: [Number],
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    }
});

const SparePart = mongoose.model('SparePart', sparePartSchema);

export default SparePart;