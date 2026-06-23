import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
    },

    items: [
      {
        productName: String,

        base: String,

        price: Number,

        qty: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "UPI",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Bill", billSchema);
