import mongoose from 'mongoose';

const HostelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photos:{
        type: [String]
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    }
})
const Hostel = mongoose.model("Hostel" , HostelSchema)
export default Hostel
