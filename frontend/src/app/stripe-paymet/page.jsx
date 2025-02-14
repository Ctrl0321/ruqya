"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ( formData ) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const { paymentIntent, error } = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then((res) => res.json());

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: { card: elements.getElement(CardElement) },
        });

        if (confirmError) {
            setError(confirmError.message || "Payment failed");
        } else {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <CardElement className="border p-3 rounded" />
            <button
                type="submit"
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">Payment successful! Meeting scheduled.</p>}
        </form>
    );
};

export default function StripePaymentForm( formData ) {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode:"payment",
                currency:"usd"
            }}
        >
            <CheckoutForm formData={formData} />
        </Elements>
    );
}
