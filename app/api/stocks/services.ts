import axios from "axios";
import Stocks from "./models";
import { StocksSchema } from "./schemas";
import io from "../..";

class StockService {
  private apiUrl: string = "https://api.livecoinwatch.com/coins/map";
  private codes: Array<string> = [];
  private apiKey: string = "ffb23c5a-2d30-45d8-bc24-fe55c8e7c9a5";

  constructor(
    codes: Array<string>,
    apiKey: string = "ffb23c5a-2d30-45d8-bc24-fe55c8e7c9a5"
  ) {
    if (!codes) {
      throw new Error("Missing stock codes");
    }

    this.codes = codes || this.codes;
    this.apiKey = apiKey || this.apiKey;

    // setInterval(() => {
    //   this.fetchStocks();
    // }, 5000);
  }

  async fetchStocks() {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          codes: this.codes,
          currency: "INR",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 5,
          meta: true,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );

      const stocks = response.data.map((stock: any) => ({
        symbol: stock.code,
        name: stock.name,
        price: stock.rate.toFixed(2),
        currency: "INR",
        timestamp: new Date(),
      }));

      console.log(stocks);
      io.emit("stocks", stocks);

      await this.saveStocks(stocks);

      return stocks;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error("Error fetching stocks");
    }
  }

  async getStocks(symbol: string, limit: number) {
    try {
      const stocks = await Stocks.find({ symbol: symbol }).limit(limit).sort({
        timestamp: -1,
      });
      return stocks;
    } catch (error) {
      throw new Error("Error getting stocks");
    }
  }

  async saveStocks(stocks: Array<StocksSchema>) {
    try {
      await Stocks.insertMany(stocks);
    } catch (error) {
      throw new Error("Error saving stocks");
    }
  }
}

export default StockService;
