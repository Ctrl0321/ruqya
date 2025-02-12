// import { AuthenticatedRequest } from "../@types/express";
// import { Response } from "express";
// import Stripe from "stripe";
//
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//     apiVersion: "2024-04-10",
// });
//
// export const webhook = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     const sig = req.headers["stripe-signature"];
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
//
//     let event: Stripe.Event;
//
//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err: any) {
//         console.error("⚠️ Webhook signature verification failed.", err.message);
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//     }
//
//     switch (event.type) {
//         case "checkout.session.completed":
//             const session = event.data.object as Stripe.Checkout.Session;
//             console.log("✅ Payment successful!", session);
//             // TODO: Update database (mark session as "paid")
//             break;
//
//         case "invoice.payment_failed":
//             console.log("❌ Payment failed!");
//             break;
//
//         default:
//             console.log(`Unhandled event type: ${event.type}`);
//     }
//
//     res.status(200).json({ received: true });
// };
