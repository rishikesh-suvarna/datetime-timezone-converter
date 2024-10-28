import express from 'express';
import dotenv from 'dotenv';
import { datetimeConversionController, datetimeConversionDesriptionController } from './controllers';
import { rateLimiterConfig } from './config/rateLimiter';

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app = express();

// Trust the reverse proxy
app.set('trust proxy', 1);

// Middleware to parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiterConfig);


// Routes
app.get('/functions/convert-datetime-tz', datetimeConversionDesriptionController);
app.post('/functions/convert-datetime-tz', datetimeConversionController);


// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.all("*", (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Export the server for testing
export default server;