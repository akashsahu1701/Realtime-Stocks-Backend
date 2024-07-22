import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./db";
import StockHandlers from "./api/stocks/handlers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/stocks", StockHandlers);

app.get("/", (req: any, res: any) => {
  res.send("Real-time Stock/Crypto Prices Backend");
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

var io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default io;
