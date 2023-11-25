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
    const {min , max , ...others} = req.query
    try {
        const hostels = await Hostel.find({ ...others, cheapestPrice:{$gt:min || 1 , $lt:max || 999}}).limit(req.query.limit)
        res.status(200).json(hostels)
    } catch (error) {
        next(error)
    }
}

export const getAllHostelByCity = async(req , res, next)=>{
    try {
        const cities = req.query.cities.split(",")
        const list = Promise.all(cities.map(city=>{
            return Hostel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}


export const getAllHostelByType = async(req , res, next)=>{
    try {
        const hotelCount = await Hostel.countDocuments({type: "hotel"})
        const apartmentCount = await Hostel.countDocuments({type: "apartment"})
        const resortCount = await Hostel.countDocuments({type: "resort"})
        const villaCount = await Hostel.countDocuments({type: "villa"})
        const cabinCount = await Hostel.countDocuments({type: "cabin"})

        res.status(200).json([
            {type: "hotel" , count: hotelCount},
            {type: "apartment" , count: apartmentCount},
            {type: "resort" , count: resortCount},
            {type: "villa" , count: villaCount},
            {type: "cabin" , count: cabinCount},
            
        ])
    } catch (error) {
        next(error)
    }
}


export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };