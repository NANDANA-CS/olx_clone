import express from "express"
import addSchema from '../models/add.model.js'
import userSchema from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



// signup
export const signUp = async (req, res) => {
    try {
        
        // console.log(req.body.username)
        
        const { username, email, phone, password } = req.body;
        const file = req.file;
        console.log("Signup", req.body, req.file);

         if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await userSchema.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            username,
            email,
            phone,
            password: hashedPassword,
            profilepic: file ? `${file.filename}` : null,

        };

        const newUser = new userSchema(userData);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "24h",
        });
        res.status(201).json({ message: "Signup successful", token });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message:"Server error" });
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
        const files = req.files
        console.log("files",files);
        const { userId } = req.params
        const { title, brand, description, location,price ,category} = req.body
        console.log(req.body)

        // if (!title || !brand || !location || !description || !files ||!userId) {
        //     return res.status(404).json({ message: "Please fill all the fileds" })
        // }

        //  const user = await addSchema.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }



        // let post = []
        // for (let i = 0; i < files.length; i++) {
        //     post.push(files[i].filename)
        // }

        const images = files.map(file => file.filename)
          const productData = {
            title,
            brand,
            description,
            location,
            price,
            category,
            pic: images,
            user_id: userId
        }

        const data = await addSchema.create(productData)
        console.log(data, "dataaaaa");

        res.status(201).json({ message: "Product Uploaded Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}



// getproduct
export const getProducts=async (req,res) => {
    try {
        const data=await addSchema.find()
        console.log(data,"uploaded data")
        if(!data){
            return res.status(400).json({message:"data not found"})
        }
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"upload failed"})
    }
}