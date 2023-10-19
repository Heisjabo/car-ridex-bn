import SparePart from "../models/sparePartModel.js";
import { uploadFiles } from "../helpers/cloud.js";

// registerPart

export const registerPart = async (req, res) => {
    try{
        const result = await uploadFiles(req.files, res);
        const part = await SparePart.create({
            partName: req.body.partName,
            description: req.body.description,
            brand: req.body.brand,
            modelCompatibility: req.body.modelCompatibility,
            yearCompatibility: req.body.yearCompatibility,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            images: result,
            dimensions: req.body.dimensions
        });
        return res.status(200).json({
            status: 'success',
            message: 'spare part added successfully',
            part
        });
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

// get all parts

export const getAllParts = async (req, res) => {
    try{
        const spareParts = await SparePart.find();
        return res.status(200).json({
            status: 'success',
            spareParts
        })
    }catch(error){
        return res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}

// get part by Id

export const getPartById = async (req, res) => {
    try{
        const sparePart = await SparePart.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            sparePart
        });
    }catch(error){
        return res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}

// update spare part

export const updatePart = async (req, res) => {
    try {
      const id = req.params.id;
      let newPartData;
      const partData = await SparePart.findById(id);
      if (req.file) {
        const result = await uploadFiles(req.files, res);
        newPartData = {
          ...req.body,
          images: result
        };
      } else {
        newPartData = { ...req.body, images: partData.images };
      }
  
      const sparePart = await SparePart.findByIdAndUpdate(id, newPartData, {
        new: true,
      });
  
      return res.status(200).json({
        status: "success",
        message: "sparepart updated successfully",
      });
      
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error: error.message,
      });
    }
};

// delete a spare part

export const deletePart = async (req, res) => {
    const id = req.params.id;
    try {
      const sparePart = await SparePart.findByIdAndDelete(id);
      if (!sparePart) {
        return res.status(404).json({
          status: "failed",
          message: "spare part not found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "spare part was deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message
      });
    }
  }

