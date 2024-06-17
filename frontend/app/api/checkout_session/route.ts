import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16',
    appInfo: {
        name: 'e-commerce',
        version: '0.1.0',
    },
});

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const lineItems = req.body.lineItems;
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                automatic_tax: { enabled: true },
            });
            res.redirect(303, session.url);
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}