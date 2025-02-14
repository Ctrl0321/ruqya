import express from 'express';
import { createCheckoutSession } from '../controllers/stripeController';
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.post('/create-checkout-session',protect, authorizeRoles('user'), createCheckoutSession);
// router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
