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
import stripeRoutes from "./routes/stripeRoutes"
import Meeting, {MeetingStatus} from "./models/meeting";
import {stripeClient} from "./config/stripeConfig";


dotenv.config();
connectDB();

const app:Application = express();

const allowedOrigins = ['http://192.168.1.8:3000','http://localhost:3000', 'http://localhost:3001','https://your-production-domain.com'];

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

app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        const sig = req.headers['stripe-signature'];

        try {
            const event = stripeClient.webhooks.constructEvent(
                req.body,
                sig!,
                process.env.STRIPE_WEBHOOK_SECRET!
            );

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;

                console.log("------------",session.metadata?.rakiId,session.metadata?.date)

                const updatedMeeting = await Meeting.findOneAndUpdate(
                    {rakiId: session.metadata?.rakiId, date: session.metadata?.date},
                    {
                        status: MeetingStatus.SCHEDULED,
                    },
                    {new: true}
                );

                console.log(updatedMeeting)

            }

            res.json({received: true});
        } catch (error) {
            console.error('Webhook Error:', error);
            res.status(400).send(`Webhook Error: ${error}`);
        }

    })

app.use(cors(corsOptions));
app.use(express.json());

app.use('/ruqya-api/auth', authRoutes);
app.use('/ruqya-api/user', userRoutes);
app.use('/ruqya-api/raki', rakiAvailabilityRoutes);
app.use('/ruqya-api/meeting', meetingRoutes);
app.use('/ruqya-api/review', reviewRoutes);
app.use('/ruqya-api/get-stream', getStreamRouted);
app.use('/ruqya-api/stripe', stripeRoutes);



export default app;
