import { AuthenticatedRequest } from "../@types/express";
import { Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const webhook = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (!sig || !endpointSecret) {
        console.error("❌ Missing Stripe webhook secret or signature.");
        res.status(400).send("Webhook secret or signature missing.");
        return;
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log("✅ Payment successful!", session);

                // Example: Mark the session as paid in your database
                const bookingId = session.metadata?.bookingId;
                if (bookingId) {
                    // Update database with payment status
                    await updateBookingStatus(bookingId, "paid");
                    console.log(`✅ Booking ${bookingId} marked as paid.`);
                } else {
                    console.warn("⚠️ No bookingId found in session metadata.");
                }
                break;
            }

            case "invoice.payment_failed":
                console.log("❌ Payment failed for invoice.");
                break;

            default:
                console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error: any) {
        console.error("❌ Error processing webhook event:", error.message);
        res.status(500).send(`Webhook handler error: ${error.message}`);
    }
};

// Mock function: Replace with actual database update logic
const updateBookingStatus = async (bookingId: string, status: string) => {
    console.log(`🔄 Updating booking ${bookingId} to status: ${status}`);
    // Example: await BookingModel.findByIdAndUpdate(bookingId, { status });
};
