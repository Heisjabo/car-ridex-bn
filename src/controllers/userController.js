import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// create user

export const createUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            return  res.status(409).json({
                status:"failed",
                message:"Email has been taken by other user",
              });
        }

        let newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.status(200).json({
            status:"success",
            message:"User created successfully",
            newUser
        });
    } catch (err){
        res.status(400).json({message: err.message});
    }
}

// user login 

export const loginUser = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(user.password !== req.body.password){
            return res.status(401).json({
                status: "failed",
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            status: "success",
            token: await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"}),
            user
        });

    } catch (err){
        res.status(400).json({message: err.message});
    }
}

// get all users

export const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// get user by id

export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error('User not found');
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

// update user

export const updateUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) throw Error('User not found');
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// delete user

export const deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) throw Error('User not found');
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };