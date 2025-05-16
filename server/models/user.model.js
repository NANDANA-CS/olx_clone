import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    profilepicture: { type: String, default: null },
    username: { type: String, required: true},
    email: { type: String, required: true},
    phone:{type:String,  default: null},
    password: { type: String, default: null },
    about: { type: String, maxlength: 200 },
    // wishlist:{type:Array,default:null},
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Add' }],
    otp:{type:Number,default:null}
});

const User = mongoose.model('User', userSchema);
export default User;