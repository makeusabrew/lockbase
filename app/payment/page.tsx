import { stripe } from "@/lib/admin/stripe";
import { createAdminClient } from "@/lib/admin/supabase-admin";
import { uuidToKey } from "@/lib/format-key";
import { addYears } from "date-fns";
import Link from "next/link";

// TODO can probably remove?
export const dynamic = "force-dynamic";

// TODO split off into a separate file...
const getDetails = async (sessionId: string) => {
  const sbAdmin = createAdminClient();

  try {
    console.log(`Fetching checkout status for Stripe session ${sessionId}`);
    const checkout = await stripe.checkout.sessions.retrieve(sessionId);
    if (checkout.payment_status !== "paid" || checkout.status !== "complete") {
      return null;
    }

    const { data, error } = await sbAdmin
      .from("licenses")
      .insert({
        idempotency_key: checkout.id,
        owner_email: checkout.customer_details?.email,
        // result.created is seconds since epoch hence the upscale here
        support_expires_at: addYears(
          new Date(checkout.created * 1000),
          1
        ).toISOString(),
        status: "active",
        seats: 1,
      })
      .select();

    // TODO: handle error: it's expected if the row already exists

    // data can be null or an object if it was created this time

    const { data: licenseData, error: licenseError } = await sbAdmin
      .from("licenses")
      .select("key, owner_email")
      .eq("idempotency_key", checkout.id)
      .single();
    if (licenseError) throw licenseError;
    console.log(
      `Successfully fetched license data for checkout ID ${checkout.id}`
    );
    return licenseData;
  } catch (e) {
    console.error(`Error during success chain: ${e}`);
    return null;
  }
};

export default async function UpgradeSuccess({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id) {
    throw new Error("No session ID provided");
  }

  const details = await getDetails(searchParams.session_id);

  if (!details) {
    return (
      <div className="mx-auto mt-10 max-w-4xl">
        <h1 className="mb-10 text-2xl font-semibold">Payment failed</h1>
        <p>
          Your payment was not successful. You have <b>not</b> been charged and
          you have <b>not</b> been issued with a license key.
        </p>
        <p>
          You may try again, or please feel free to get in touch and I&rsquo;ll
          investigate this failure for you.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <h1 className="mb-10 text-2xl font-semibold">
        Payment successful - thank you!
      </h1>
      <p>
        License key: <b>{uuidToKey(details.key)}</b>
      </p>
      <p>
        Recovery email address: <b>{details.owner_email}</b>
      </p>
      <p className="mt-10">
        Please copy your license key and use it to activate your application as
        soon as convenient. If you ever lose your license key or need to
        reactivate it, please get in touch using the email address above. Your
        payment receipt has been sent to this same address for future reference.
      </p>

      <p className="mt-5">
        <Link href="/" className="underline">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
