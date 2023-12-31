import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import carsRouter from './routes/carsRoute.js';
import sparePartRouter from './routes/sparePartRoute.js';
import partOrderRouter from './routes/partOrderRoute.js';
import contactRouter from './routes/contactRoute.js';
import carsOrderRouter from './routes/carsOrderRoute.js';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import swaggerDocs from './swagger.js';

dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();
connectDB();
swaggerDocs(app, PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) =>{
    return res.status(200).json({
        status: "success",
        message: "welcome to my api"
    })
});

app.use("/api/v1", userRouter);
app.use("/api/v1", carsRouter);
app.use("/api/v1", sparePartRouter);
app.use("/api/v1", partOrderRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1", carsOrderRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));