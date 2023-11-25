import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { createHostel, deleteHostel, getAllHostel, getHostel, updateHostel } from '../controllers/hostelController.js'
const router  =  express.Router()

//CREATE
router.post("/", verifyAdmin , createHostel)
//UPDATE
router.put("/update/:id", verifyAdmin , updateHostel)
//DELETE
router.delete("/delete", verifyAdmin , deleteHostel)
//GET
router.put("/get/:id", getHostel)
//GET ALL
router.get("/getall", getAllHostel)


export default  router