import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from '../controllers/roomController.js'
const router  =  express.Router()

//CREATE
router.post("/:hostelId", verifyAdmin , createRoom)
//UPDATE
router.put("/update/:id", verifyAdmin , updateRoom)
//DELETE
router.delete("/delete", verifyAdmin , deleteRoom)
//GET
router.put("/get/:id/:hostelId", getRoom)
//GET ALL
router.get("/getall", getAllRoom)


export default  router