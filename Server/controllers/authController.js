import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();

export const userRegister = async(req , res , next)=>{
    try {

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req,body.password , salt)
        const newUser = new User({
            username : req.body.username,
            email: req.bosy.email,
            password : hashedPassword,
            isAdmin : req.body.isAdmin
        })

        await newUser.save()
        res.status(200).json("success")
    } catch (error) {
        next(error)
    }
}

export const userLogin = async(req , res , next)=>{
try {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(createError(404 , " User not found "))
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password , user.password )
    if(!isPasswordCorrect){
        return next(createError(404 , " incorrect password "))
    }
    const token = jwt.sign({id: user._id , isAdmin: user.isAdmin} , process.env.JWT_KEY)
   const {password , isAdmin , ...sanitizedData} = user._doc
   res.cookie("access_token", token , {httpOnly: true}).status(200).json({...sanitizedData})

} catch (error) {
    next(error)
}
}

