import mongoose from "mongoose";

const Stocks = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  currency: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("stocks", Stocks);
