import mongoose from "mongoose";
const offerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["flat", "percentage", "buy-one-get-one"],
      required: true,
    },
    discount: {
      type: Number,
    },
    buyOneGetOneProduct: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

// Model for the Offer collection
export default mongoose.model("offer", offerSchema);
