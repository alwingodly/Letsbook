import express from 'express'
import { verifyUser , verifyAdmin } from '../utils/verifyToken.js'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/userController.js'
const router  =  express.Router()


//UPDATE
router.put("/update/:id", verifyUser , updateUser)
//DELETE
router.delete("/delete/:id", verifyUser , deleteUser)
//GET
router.put("/get/:id", verifyUser , getUser)
//GET ALL
router.get("/getall", verifyAdmin , getAllUser)


export default  router