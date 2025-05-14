import mongoose from "mongoose";

const addSchema = new mongoose.Schema({
    pic: { type: Array, required: true },
    adtitle: { type: String, required: true },
    brand: { type: String, required: true },
    price:{type:String,required:true},
    description: { type: String, required: true },
    fuel: { type: String, default: null },
    kilometers: { type: String, default: null },
    location: { type: String, required:true },

    category:{type:String,required:true},
    owner: { type: String, default: null },
    gear: { type: String, default: null },
    model: { type: String, default: null },
    date: { type: Date, default: Date.now, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

})
const Add=mongoose.model('Add',addSchema)
export default Add