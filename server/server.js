import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import './config/instrument.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/Webhooks.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

//Connect to DB
await connectDB();

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the ATS Backend Server');
});


app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error("My first Sentry Error!");
});

app.post('/webhooks', clerkWebhooks);

Sentry.setupExpressErrorHandler(app);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 
