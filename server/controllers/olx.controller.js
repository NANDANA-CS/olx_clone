import express from "express";
import addSchema from '../models/add.model.js';
import userSchema from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";




const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "574a10109dd239",
    pass: "466c3668f60968",
  },
});




// signup
export const signUp = async (req, res) => {
  try {
    console.log("signup function");
    console.log(req.body);
    console.log("add user in controller");
    const { username, email } = req.body;

    if (!(username && email)) {
      return res.status(400).json({ error: "Email or Username is required" });
    }

    const userExist = await userSchema.findOne({ email });

    if (userExist) {
      return res.status(200).json({ success: "Successfully logged in", id: userExist._id });
    }

    const data = await userSchema.create({ username, email });
    res.status(201).json({ id: data._id });
  } catch (error) {
    console.log({ errorMessage: error });
    res.status(500).json({ error: "Server error" });
  }
};

// getUser
export const getUser = async (req, res) => {
  console.log("getuser");
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await userSchema.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// getProducts
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category: { $regex: `^${category}$`, $options: 'i' } } : {};
    const data = await addSchema.find(query).sort({ date: -1 });
    console.log(data, "uploaded data");
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found for the specified category" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// previewProduct
export const previewProduct = async (req, res) => {
  try {
    console.log("inside preview product");
    const product = await addSchema.findById(req.params.id).populate('user_id', 'username');
    console.log(product, "products");

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// addProducts
export const addProducts = async (req, res) => {
  try {
    console.log("addproooooo");
    const files = req.files;
    console.log("files", files);
    const { adTitle, brand, carName, year, fuel, transmission, noOfOwners, description, kmDriven, location, price, category, email } = req.body;
    console.log(req.body);

    if (!adTitle || !carName || !year || !fuel || !transmission || !noOfOwners || !brand || !location.state || !location.city || !location.neighborhood || !description || !price || !kmDriven || !category || !files) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const locationString = `${location.neighborhood}, ${location.city}, ${location.state}`;

    const images = files.map(file => file.filename);
    const productData = {
      adtitle: adTitle,
      brand,
      model: carName,
      price,
      description,
      fuel,
      kilometers: kmDriven,
      location: locationString,
      category: category.toLowerCase(),
      owner: noOfOwners,
      gear: transmission,
      pic: images,
      user_id: user._id,
      date: new Date(),
    };

    const data = await addSchema.create(productData);
    console.log(data, "product dataaaaa");

    res.status(201).json({ message: "Product Uploaded Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Bike
export const Bike = async (req, res) => {
  try {
    console.log("inside bike");
    const files = req.files;
    console.log("files", files);

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
      kmDriven,
      category,
      email,
      location,
    } = req.body;

    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

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
      !kmDriven ||
      !category ||
      !email ||
      !parsedLocation.state ||
      !parsedLocation.city ||
      !parsedLocation.neighborhood
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const locationString = `${parsedLocation.neighborhood}, ${parsedLocation.city}, ${parsedLocation.state}`;

    const images = files.map(file => file.filename);
    const newBike = {
      adtitle: adTitle,
      brand,
      model: bikeName,
      year,
      fuel,
      kilometers: kmDriven,
      gear: transmission,
      owner: noOfOwners,
      description,
      price,
      location: locationString,
      category: category.toLowerCase(), 
      pic: images,
      user_id: user._id,
      date: new Date(),
    };

    const data = await addSchema.create(newBike);
    console.log(data, "new bike");

    res.status(201).json({ message: 'Bike ad posted successfully', bike: newBike });
  } catch (error) {
    console.error('Error posting bike ad:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// toggleWishlist
export const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await addSchema.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const isInWishlist = user.wishlist.includes(productId);

    if (isInWishlist) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    res.status(200).json({
      message: isInWishlist ? "Product removed from wishlist" : "Product added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// updateUser
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!userId || !username || !email) {
      return res.status(400).json({ message: 'User ID, username, and email are required' });
    }

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const emailExists = await userSchema.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const offer = async (req, res) => {
  try {
    console.log("helooo")
    const { userId, productId, offerPrice } = req.body;

    if (!userId || !productId || !offerPrice) {
      return res.status(400).json({ message: "User ID, Product ID, and Offer Price are required" });
    }

    const buyer = await userSchema.findById(userId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const product = await addSchema.findById(productId).populate('user_id', 'username email');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const seller = product.user_id;
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const originalPrice = parseFloat(product.price);
    const offer = parseFloat(offerPrice);
    const minPrice = originalPrice * 0.9;
    const maxPrice = originalPrice * 1.1;

    if (isNaN(offer) || offer < minPrice || offer > maxPrice) {
      return res.status(400).json({ message: "Offer must be within 10% of the original price" });
    }

    // Email seller
    const sellerMailOptions = {
      from: buyer.email, 
      to: seller.email, 
      subject: `New Offer for ${product.adtitle}`,
      html: `
        <h2>New Offer Received!</h2>
        <p>Dear ${seller.username},</p>
        <p>You have received a new offer for your product:</p>
        <ul>
          <li><strong>Product:</strong> ${product.adtitle}</li>
          <li><strong>Original Price:</strong> ₹${product.price}</li>
          <li><strong>Offer Price:</strong> ₹${offerPrice}</li>
          <li><strong>Buyer:</strong> ${buyer.username}</li>
          <li><strong>Buyer Email:</strong> ${buyer.email}</li>
        </ul>
        <p>Please contact the buyer to discuss the offer further.</p>
        <p>Best regards,<br>OLX</p>
      `,
    };

    // Email  buyer
    const buyerMailOptions = {
      from: seller.email, 
      to: buyer.email,
      subject: `Offer Confirmation for ${product.adtitle}`,
      html: `
        <h2>Offer Proposal!</h2>
        <p>Dear ${buyer.username},</p>
        <p>You have successfully submitted an offer for the following product:</p>
        <ul>
          <li><strong>Product:</strong> ${product.adtitle}</li>
          <li><strong>Original Price:</strong> ₹${product.price}</li>
          <li><strong>Your Offer:</strong> ₹${offerPrice}</li>
          <li><strong>Seller:</strong> ${seller.username}</li>
          <li><strong>Seller Email:</strong> ${seller.email}</li>
          <li><strong>Seller Location:</strong>${seller.location}</li>
        </ul>
        <p>The seller will contact you soon to discuss your offer.</p>
        <p>Best regards,<br>OLX</p>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(sellerMailOptions);
      await transporter.sendMail(buyerMailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ message: "Offer saved, but failed to send email notifications" });
    }

    
    res.status(200).json({ message: "Offer submitted successfully and emails sent" });
  } catch (error) {
    console.error("Error processing offer:", error);
    res.status(500).json({ message: "Server error" });
  }
};









// Mobile
 export const Mobile = async (req, res) => {
     try {
       console.log("inside mobile");
       const files = req.files;
       console.log("files", files);

       const {
         brand,
         adTitle,
         description,
         price,
         category,
         email,
         location,
       } = req.body;

       const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

       if (
         !brand ||
         !adTitle ||
         !description ||
         !price ||
         !category ||
         !email ||
         !parsedLocation.state ||
         !parsedLocation.city ||
         !parsedLocation.neighborhood ||
         !files ||
         files.length === 0
       ) {
         return res.status(400).json({ error: 'All fields and at least one image are required' });
       }

       const user = await userSchema.findOne({ email });
       if (!user) {
         return res.status(404).json({ message: "User not found" });
       }
       const locationString = `${parsedLocation.neighborhood}, ${parsedLocation.city}, ${parsedLocation.state}`;
       const images = files.map(file => file.filename);
       const newMobileAd = {
         adtitle: adTitle,
         brand,
         price,
         description,
         location: locationString,
         category: category.toLowerCase(),
         pic: images,
         user_id: user._id,
         date: new Date(),
       };

       const data = await addSchema.create(newMobileAd);
       console.log(data, "new mobile ad");

       res.status(201).json({ message: 'Mobile ad posted successfully', mobile: newMobileAd });
     } catch (error) {
       console.error('Error posting mobile ad:', error);
       res.status(500).json({ error: 'Server error' });
     }
   };