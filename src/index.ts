import express from 'express';
import dotenv from 'dotenv';
import { datetimeConversionController, datetimeConversionDesriptionController } from './controllers';

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app = express();

// Middleware to parse incoming request data
app.use(express.json());


// Routes
app.get('/functions/convert-datetime-tz', datetimeConversionDesriptionController);
app.post('/functions/convert-datetime-tz', datetimeConversionController);


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});