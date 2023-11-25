import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import hostelRoute from './routes/hostels.js'
import roomRoute from './routes/rooms.js'
import userRoute from './routes/users.js'
dotenv.config();

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

//middlewares
app.use(express.json())
app.use("/auth" , authRoute)
app.use("/hostel" , hostelRoute)
app.use("/room" , roomRoute)
app.use("/user" , userRoute)


app.use((err , req , res , next)=>{
    const errroStatus = err.status || 500
    const errroMessage = err.message || "Something went wrong!.."

    return res.status(errroStatus).json({
        success: false,
        status:  errroStatus,
        message: errroMessage,
        stack: err.stack
    })
})

const PORT = process.env.PORT;

connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server connected to PORT ${PORT}`);
    });
});
