import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    // photos:{
    //     type: [String]
    // },
    roomNumbers:[
        {
            number: Number,
            unavailableDates:[{type: Date}]
        }
    ],
},{timestamps: true})
const Room = mongoose.model("Room" , RoomSchema)
export default Room
