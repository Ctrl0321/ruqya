import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";
import rakiAvailabilityRoutes from "./routes/rakiAvailabilityRoutes";
import meetingRoutes from "./routes/meetingRoutes";
import reviewRoutes from "./routes/reviewRoutes"
import getStreamRouted from "./routes/getStreamRoutes"


dotenv.config();
connectDB();

const app:Application = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001','https://your-production-domain.com'];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use('/ruqya-api/auth', authRoutes);
app.use('/ruqya-api/user', userRoutes);
app.use('/ruqya-api/raki', rakiAvailabilityRoutes);
app.use('/ruqya-api/meeting', meetingRoutes);
app.use('/ruqya-api/review', reviewRoutes);
app.use('/ruqya-api/get-stream', getStreamRouted);



export default app;
