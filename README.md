# Lockbase

Lockbase is a very simple demo license key activation system built with Next.js, Supabase and Stripe.
It exposes just two API endpoints: one to activate an instance of a license (a "seat"), and another to validate a
license instance/seat.

License creation is _not_ exposed via the API: instead, licenses are created using the Supabase SDK when a user
completes the Stripe checkout flow. An example of this flow is also included in the demo repository.
Creation could certainly be pushed behind an API method and might be one day. To read more details including why it isn't yet, head over
to https://stronglytyped.uk/articles/building-license-key-activation-system-nextjs-supabase-stripe

## Quick start

* Clone the repository
* Run `npm i`
* Copy `.env.local.example` to `.local.env`
* Populate the required environment variables: if you only want to use the API these are the `SUPABASE_xxx` properties,
but if you want to enable payment and license creation you'll need to configure the `STRIPE_xxx` ones too

## API usage

### Activate a license

Replace `label` and `licenseKey` with an appropriate label and a valid license key:

```
curl -X POST -H "Content-Type: application/json" http://localhost:3002/licenses/activate  -d '{"label": "foo", "licenseKey": "F0E7-BD01-A47D-
40AA-8991-DF41-4B4B-A906"}'
```

If successful, you'll get a JSON response containing an instance ID:

`{"instanceID":"e0a689fa-d9a8-4394-b5dd-d2c6ba107b19"}`

This instance ID can be used in conjunction with the license key to periodically validate the license/instance pair:

### Validate a license instance

```
curl -X POST -H "Content-Type: application/json" http://localhost:3002/licenses/validate  '{"instanceID": "e0a689fa-d9a8-4394-b5dd-d2c6ba
107b19","licenseKey": "F0E7-BD01-A47D-40AA-8991-DF41-4B4B-A906"}'
```