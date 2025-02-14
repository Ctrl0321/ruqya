import { AuthenticatedRequest } from "../@types/express";
import { Response,Request } from "express";
import dotenv from "dotenv";
import Meeting, {MeetingStatus} from "../models/meeting";
import {stripeClient} from "../config/stripeConfig";

dotenv.config();

const price = Math.round(parseFloat(process.env.SESSION_COST as string));



export const createCheckoutSession = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id ?? "";
        const { topic, date, rakiId } = req.body;

        if (!topic || !date || !rakiId ) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const session = await stripeClient.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `1-on-1 Session: ${topic}`,
                            description: `Session with Raki ${rakiId} on ${date}`,
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            customer_email: req.user?.email || undefined,
            metadata: {
                rakiId: rakiId.toString(),
                date: date.toString(),
                topic: topic.toString(),
                userId: userId?.toString()
            }
        });

        if (!session.url) {
            throw new Error('Failed to create checkout session URL');
        }

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error instanceof Error ? error.message : 'Unknown error');
        res.status(500).json({ message: "Stripe session creation failed" });
    }
};
// export const handleStripeWebhook = async (req: AuthenticatedRequest, res: Response) => {
//     const sig = req.headers['stripe-signature'];
//
//     try {
//         const event = stripeClient.webhooks.constructEvent(
//             req.body,
//             sig!,
//             process.env.STRIPE_WEBHOOK_SECRET!
//         );
//
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;
//
//             const updatedMeeting = await Meeting.findOneAndUpdate(
//                 { rakiId:session.metadata?.rakiId,date: session.metadata?.date },
//                 {
//                     status: MeetingStatus.SCHEDULED,
//                 },
//                 { new: true }
//             );
//
//         }
//
//         res.json({ received: true });
//     } catch (error) {
//         console.error('Webhook Error:', error);
//         res.status(400).send(`Webhook Error: ${error}`);
//     }
// };