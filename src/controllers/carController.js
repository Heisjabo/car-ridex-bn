import Car from "../models/carsModel.js";
import { uploadFiles } from "../helpers/cloud.js";

// create a new car

export const registerCar = async (req, res) => {
    try{
        const result = await uploadFiles(req.files, res);
        console.log(result);
        const newCar = await Car.create({
            name: req.body.name,
            model: req.body.model,
            year: req.body.year,
            seats: req.body.seats,
            fuelConsumption: req.body.fuelConsumption,
            fuelType: req.body.fuelType,
            gearType: req.body.gearType,
            category: req.body.category,
            price: req.body.price,
            images: result
          });
  
          return res.status(200).json({
            status: "success",
            message: "car was added successfully",
            content: {
              newCar,
            },
          });
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

// get all cars

export const getAllCars = async (req, res) => {
    try{
        const cars = await Car.find();
        return res.status(200).json({
            status: "success",
            cars
        });
    } catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
}

// get car by Id

export const getCarById = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) throw Error('User not found');
      res.status(200).json({
        status: "success",
        car
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

// update a car

export const updateCar = async (req, res) => {
    try {
      const id = req.params.id;
      let newCarData;
      const carData = await Car.findById(id);
      if (req.file) {
        const result = await uploadFile(req.file, res);
        newCarData = {
          ...req.body,
          image: result.secure_url,
        };
      } else {
        newCarData = { ...req.body, image: carData.image };
      }
  
      const car = await Car.findByIdAndUpdate(id, newCarData, {
        new: true,
      });
  
      return res.status(200).json({
        status: "success",
        message: "car updated successfully",
      });
      
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error: error.message,
      });
    }
};


// delete a car 

export const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({
        status: "failed",
        message: "car not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "car deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
}