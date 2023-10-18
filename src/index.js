import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';


dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) =>{
    return res.status(200).json({
        status: "success",
        message: "welcome to my api"
    })
});

app.use("/api/v1", userRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

