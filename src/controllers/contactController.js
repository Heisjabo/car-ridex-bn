import Contact from "../models/contactModel.js";

// create a new message

export const createMessage = async (req, res) => {
    try{
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        return res.status(200).json({
            status: 'success',
            message: 'your message was sent successfully'
        });
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message});
    }
}

// get all messages

export const getMessages = async (req, res) => {
    try{
        const messages = await Contact.find();
        return res.status(200).json({
            status: 'success',
            length: messages.length,
            messages
        });
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}

// get message by id

export const getMessageById = async (req, res) => {
    try{
        const message = await Contact.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            message
        });
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}

// delete message

export const deleteMessage = async (req, res) => {
    try{
        const message = await Contact.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 'success',
            message: 'message was deleted successfully'
        });
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}