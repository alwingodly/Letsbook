import Hostel from '../models/Hostel.js'


export const createHostel = async(req , res, next)=>{
    const newHostel = new Hostel(req.body)
    try {
        const savedHostel = await new newHostel.save()
        res.status(200).json(savedHostel)
    } catch (error) {
        next(error)
    }
}

export const updateHostel = async(req , res, next)=>{
    try {
        const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id  ,  {$set: req.body} , {new: true})
        res.status(200).json(updatedHostel)
    } catch (error) {
        next(error)
    }
}

export const deleteHostel = async(req , res, next)=>{
    try {
        await Hostel.findByIdAndDelete(req.params.id)
        res.status(200).json(" Hostel has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getHostel = async(req , res, next)=>{
    try {
        const hostel = await Hostel.findById(req.params.id)
        res.status(200).json(hostel)
    } catch (error) {
        next(error)
    }
}

export const getAllHostel = async(req , res, next)=>{
    try {
        const hostels = await Hostel.find()
        res.status(200).json(hostels)
    } catch (error) {
        next(error)
    }
}