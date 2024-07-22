import express from "express";
import sendResponse from "../../responses";
import StockService from "./services";
import { RequestData } from "./schemas";

const StockHandlers = express.Router();

const apiKey = process.env.LIVECOIN_API_KEY || "";
const stockService: StockService = new StockService(
  ["BTC", "ETH", "USDT", "BNB", "SOL"],
  apiKey
);

StockHandlers.get("/", async (req: any, res: any) => {
  try {
    const params: RequestData = req.query;
    const stocksHistory = await stockService.getStocks(
      params.symbol,
      params.limit
    );
    sendResponse(res, 200, stocksHistory, "", "Success");
  } catch (error) {
    console.log(error);
    sendResponse(
      res,
      500,
      null,
      JSON.stringify(error),
      "Internal Server Error"
    );
  }
});

export default StockHandlers;
