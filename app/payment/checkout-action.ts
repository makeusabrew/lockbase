"use server"

import { stripe } from "@/lib/admin/stripe"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const priceId = process.env.STRIPE_PRICE_ID!

export const createCheckoutSession = async () => {
  const siteUrl = headers().get("origin")
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
  })
  console.log(`[STRIPE] Redirecting user to Stripe...`)
  redirect(session.url!)
}
