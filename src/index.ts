import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/realtime-prices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Stock Schema
const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});
const Stock = mongoose.model("Stock", stockSchema);

// Fetch and store data
const fetchAndStoreData = async () => {
  try {
    const response = await fetch("API_URL_FOR_STOCK_DATA"); // Replace with actual API URL
    const data: any = await response.json();

    // Example data format
    const stockData = data.map((stock: any) => ({
      symbol: stock.symbol,
      price: stock.price,
    }));

    await Stock.insertMany(stockData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Polling every few seconds
setInterval(fetchAndStoreData, 5000);

// Get recent data
app.get("/api/stocks/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const stocks = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(stocks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
