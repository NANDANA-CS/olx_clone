import express from 'express'
import { addProducts, Bike, getProducts, getUser, previewProduct, signUp } from '../controllers/olx.controller.js'
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"

const olx_router=express.Router()

// olx_router.get('/getuser',getUser)
olx_router.post('/signup',signUp)
olx_router.post('/post',upload.array('file'),addProducts)
olx_router.get("/getproducts",getProducts)
olx_router.get('/products/:id',previewProduct)
olx_router.post('/bikes',upload.array('file'),Bike)

export default olx_router