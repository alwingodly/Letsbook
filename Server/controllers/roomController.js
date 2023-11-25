import Room from "../models/Room.js";
import Hostel from "../models/Hostel.js";
import { createError } from "../utils/error.js";


export const createRoom = async(req , res, next)=>{
    const newRoom= new Room(req.body)
    const hostelId = req.params.hostelId
    try {
        const savedRoom = await new newRoom.save()
        try {
            await Hostel.findByIdAndUpdate(hostelId ,{$push : {rooms: savedRoom._id}} )
        } catch (error) {
        next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req , res, next)=>{
    try {
        const updatedHostel = await Room.findByIdAndUpdate(req.params.id  ,  {$set: req.body} , {new: true})
        res.status(200).json(updatedHostel)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req , res, next)=>{
    const hostelId = req.params.hostelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hostel.findByIdAndUpdate(hostelId ,{$pull : {rooms: req.params.id}} )
        } catch (error) {
        next(error)
        }
        res.status(200).json(" Hostel has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req , res, next)=>{
    try {
        const hostel = await Room.findById(req.params.id)
        res.status(200).json(hostel)
    } catch (error) {
        next(error)
    }
}

export const getAllRoom = async(req , res, next)=>{
    try {
        const hostels = await Room.find()
        res.status(200).json(hostels)
    } catch (error) {
        next(error)
    }
}