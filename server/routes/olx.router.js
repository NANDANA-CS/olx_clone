import express from 'express'
import { addProducts, Bike, getProducts, getUser,  Mobile,  previewProduct, signUp, toggleWishlist, updateUser } from '../controllers/olx.controller.js'
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"

const olx_router=express.Router()

olx_router.get('/user/:id', getUser)
olx_router.post('/signup',signUp)
olx_router.post('/bikes',upload.array('file'),Bike)
olx_router.post('/post',upload.array('file'),addProducts)
olx_router.get("/getproducts",getProducts)
olx_router.get('/products/:id',previewProduct)
olx_router.post('/wishlist', toggleWishlist);
olx_router.post('/mobile',upload.array('file'),Mobile)

olx_router.put('/user/:id', updateUser)


export default olx_router