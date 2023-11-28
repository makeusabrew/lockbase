# Lockbase

Lockbase is a very simple demo license key activation system built with Next.js, Supabase and Stripe.
It exposes just two API endpoints: one to activate an instance of a license (a "seat"), and another to validate a
license instance/seat.

License creation is _not_ exposed via the API: instead, licenses are created using the Supabase SDK when a user
completes the Stripe checkout flow. An example of this flow is also included in the demo repository.
Creation could certainly be pushed behind an API method and might be one day. To read more details including why it isn't yet, head over
to https:/stronglytyped.uk/articles/building-license-key-activation-system-nextjs-supabase-stripe

## Quick start

* Clone the repository
* Run `npm i`
* Copy `.env.local.example` to `.local.env`
* Populate the required environment variables: if you only want to use the API these are the `SUPABASE_xxx` properties,
but if you want to enable payment and license creation you'll need to configure the `STRIPE_xxx` ones too