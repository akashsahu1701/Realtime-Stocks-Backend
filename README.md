# Real-time Stock/Crypto Prices Backend

This is the backend for collecting and storing real-time price data for stocks and cryptocurrencies.

## Features

- Polls real-time data every few seconds for 5 stocks or cryptocurrencies.
- Stores data in a MongoDB database.

## Technologies Used

- Express
- MongoDB
- Mongoose

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/realtime-prices-backend.git
   cd realtime-prices-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm run dev
   ```

4. Ensure MongoDB is running locally or provide the appropriate MongoDB connection string.

## Configuration

- Replace the placeholder API URL in `src/index.ts` with the actual API endpoint.

## License

MIT
