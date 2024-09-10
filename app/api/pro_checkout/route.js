import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key

// Format the amount for Stripe
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100);
}

// Get the checkout session
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams // Get the query parameters
    const session_id = searchParams.get('session_id') // Get the session ID from the query parameters

    // 
    try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
        return NextResponse.json(checkoutSession)
    } catch (error) {
        console.error('Error retrieving checkout session:', error);
        return NextResponse.json({error: {message: error.message}}, {status: 500});
    }
}

export async function POST(request) {
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Pro Subscription',
                },
                unit_amount: formatAmountForStripe(10),
                recurring: {
                    interval: 'month',
                    interval_count: 1
                }
            },
            quantity: 1,
          },
        ],
        success_url: `${request.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      };
    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
        status: 200
    });
}