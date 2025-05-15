import express from "express"
import addSchema from '../models/add.model.js'
import userSchema from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



// signup
export const signUp = async (req, res) => {
  try {
    console.log("signup function");

    console.log(req.body);

    console.log("add user in controller");
    const {  username, email } = req.body


    if (!(username && email)) {
      return res.status(404).send({ error: "Email or Username is incorrect" })
  }

    const userExist = await userSchema.findOne({email})

    if(userExist) {
      return res.status(200).send({ success: "succesfully loggedin", id:userExist._id })

    }

    const data = await userSchema.create({ username, email })
    res.status(201).send({id:data._id})

  } catch (error) {
    console.log({errorMessage: error})
    res.status(500).send(error)
  }
}



export const getUser = async (req, res) => {
    console.log("getuser");
    const userId = req.params.id
    console.log("userid", userId);

    if (!userId) {
        return res.status(400).json({ message: 'invalid userid' })
    }

    try {
        const user = await userSchema.findOne({ id: userId })
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: 'server error' })
    }

}




// addproduct
export const addProducts = async (req, res) => {
    try {
        console.log("addproooooo")
        const files = req.files

        console.log("files", files);
        const { adTitle, brand, carName, year, fuel, transmission, noOfOwners, description, kmDriven, location, price, category, email } = req.body
        console.log(req.body)

        if (!adTitle || !carName || !year || !fuel || !transmission || !noOfOwners || !brand || !location.state || !location.city || !location.neighborhood || !description || !price || !kmDriven || !category || !files) {
            return res.status(400).json({ message: "Please fill all the fileds" })
        }

        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }



        // let post = []
        // for (let i = 0; i < files.length; i++) {
        //     post.push(files[i].filename)
        // }
        const locationString = `${location.neighborhood}, ${location.city}, ${location.state}`;


        const images = files.map(file => file.filename)
        const productData = {
            adtitle: adTitle,
            brand,
            model: carName,
            price,
            description,
            fuel,
            kilometers: kmDriven,
            location: locationString,
            category,
            owner: noOfOwners,
            gear: transmission,
            pic: files ? files.map((file) => file.filename) : [],
            user_id: user._id,
            date: new Date(),
        }

        const data = await addSchema.create(productData)
        console.log(data, "product dataaaaa");

        res.status(201).json({ message: "Product Uploaded Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}





// getproduct
export const getProducts = async (req, res) => {
    try {
        const data = await addSchema.find().sort({date:-1})
        console.log(data, "uploaded data")
        if (!data) {
            return res.status(400).json({ message: "data not found" })
        }
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "upload failed" })
    }
}


export const previewProduct=async(req,res)=>{
    try {
    const product = await addSchema.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}



export const Bike=async(req,res)=>{
  try {
    const {
      brand,
      bikeName,
      year,
      fuel,
      transmission,
      noOfOwners,
      adTitle,
      description,
      price,
      location,
    } = req.body;

    // Parse location if sent as a JSON string
    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

    // Validate required fields
    if (
      !brand ||
      !bikeName ||
      !year ||
      !fuel ||
      !transmission ||
      !noOfOwners ||
      !adTitle ||
      !description ||
      !price ||
      !parsedLocation.state ||
      !parsedLocation.city ||
      !parsedLocation.neighborhood
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get uploaded image paths
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    // Create new bike ad
    const newBike = new Bike({
      brand,
      bikeName,
      year,
      fuel,
      transmission,
      noOfOwners,
      adTitle,
      description,
      price,
      images: imagePaths,
      location: parsedLocation,
    });

    
    await newBike.save();

    res.status(201).json({ message: 'Bike ad posted successfully', bike: newBike });
  } catch (error) {
    console.error('Error posting bike ad:', error);
    res.status(500).json({ error: 'Server error' });
  }
}