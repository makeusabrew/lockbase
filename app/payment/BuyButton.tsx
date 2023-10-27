import { stripe } from "@/lib/admin/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function BuyButton() {
  const createCheckoutSession = async () => {
    "use server"
    const priceId = process.env.STRIPE_PRICE_ID!;
    const siteUrl = headers().get("origin");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
    });
    console.log(`[STRIPE] Redirecting user to Stripe...`);
    redirect(session.url!);
  };

  return (
    <form action={createCheckoutSession}>
      <button type="submit" className="btn btn-primary">
        Buy
      </button>
    </form>
  );
}
