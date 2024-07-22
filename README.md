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
   git clone https://github.com/akashsahu1701/realtime-prices-backend.git
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

- Replace the placeholder API URL in `app/index.ts` with the actual API endpoint.

## Env File

```
   PORT=8080
   MONGODB_URI=
   DATABASE_NAME=
   LIVECOIN_API_KEY=
```

## License

MIT
