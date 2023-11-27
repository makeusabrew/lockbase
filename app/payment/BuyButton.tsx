import { stripe } from '@/lib/admin/stripe'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const createCheckoutSession = async () => {
  'use server'
  const siteUrl = headers().get('origin')
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/`,
  })
  console.log(`Redirecting user to Stripe...`)
  redirect(session.url!)
}

export default function BuyButton() {
  return (
    <form action={createCheckoutSession}>
      <button type="submit" className="bg-indigo-600 rounded-md ring-1 ring-indigo-500 text-white px-3 py-2">
        Buy now!
      </button>
    </form>
  )
}
