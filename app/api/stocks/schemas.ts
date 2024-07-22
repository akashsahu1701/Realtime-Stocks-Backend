export interface ResponseData {
  symbol: string;
  name: string;
  price: number;
  timestamp: Date;
}

export interface RequestData {
  symbol: string;
  limit: number;
}

export interface StocksSchema {
  symbol: string;
  price: number;
  name: string;
  currency: string;
  timestamp: Date;
}
