import express from 'express'
import { addProducts, getProducts, getUser, signUp } from '../controllers/olx.controller.js'
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"

const olx_router=express.Router()

// olx_router.get('/getuser',getUser)
olx_router.post('/signup', upload.single('profilepicture'),signUp)
olx_router.post('/post',upload.array('file'),addProducts)
olx_router.get("/products",getProducts)
export default olx_router