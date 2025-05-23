import express from 'express'
import { addProducts, Bike, getProducts, getUser,  getUserAds,  Laptop,  Mobile,  offer,  previewProduct, signUp, toggleWishlist, updateUser } from '../controllers/olx.controller.js'
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"

const olx_router=express.Router()

olx_router.get('/user/:id', getUser)
olx_router.post('/signup',signUp)
olx_router.post('/post',upload.array('file'),addProducts)
olx_router.post('/bikes',upload.array('file'),Bike)
olx_router.post('/mobile', upload.array('file'), Mobile)
olx_router.post('/lap', upload.array('file'), Laptop)
olx_router.get("/getproducts",getProducts)
olx_router.get('/products/:id',previewProduct)
olx_router.post('/wishlist', toggleWishlist)
olx_router.put('/user/:id', updateUser)
olx_router.post('/offer',offer)

olx_router.get('/user/:id/ads', getUserAds);


export default olx_router