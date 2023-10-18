import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    model: {
        type: String,
        required: false
    },

    year: {
        type: Number,
        required: false
    },

    seats: {
        type: String,
        required: false
    },
    fuelConsumption: {
        type: String,
        required: false
    },
    
    fuelType: {
        type: String,
        required: false
    },

    gearType: {
        type: String,
        required: true
    },
    
    price: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }

});

const Car = mongoose.model('Car', carSchema);

export default Car;