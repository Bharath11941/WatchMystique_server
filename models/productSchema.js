import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    default:0
  },
  image: {
    type: String,
    required: true,
  },
  offer: {
    type: mongoose.Types.ObjectId,
    ref: 'offer' 
  }
 
},{timestamps:true})

export default mongoose.model('product',productSchema);
