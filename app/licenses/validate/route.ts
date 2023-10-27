import { createAdminClient } from '@/lib/admin/supabase-admin'
import { keyToUuid } from '@/lib/format-key'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

// TODO: responses should use http status codes, remove "ok" resp prop

export async function POST(request: Request) {
  const { licenseKey, instanceID } = await request.json()

  const client = createAdminClient()

  console.log(`Validating license instance ${instanceID}`)

  const { data, error } = await client
    .from('licenses')
    .select('status, support_expires_at, license_instances(*)')
    .eq('key', keyToUuid(licenseKey))
    .filter('license_instances.id', 'eq', instanceID)
    .maybeSingle()

  if (error) {
    console.error(`Error querying license information: ${error.message}`)
    return NextResponse.json({
      ok: false,
      valid: false,
    })
  }
  if (!data) {
    console.log(`No matching license for key ${licenseKey} and instance ${instanceID}`)
    return NextResponse.json({
      ok: true,
      valid: false,
    })
  }

  console.log(`Retrieved license information for instance ${instanceID}`)

  return NextResponse.json({
    ok: true,
    // TODO: factor in app version Vs license expiry: versions will need to be mapped to release dates
    valid: data.status === 'active',
    supported: data.support_expires_at ? new Date(data.support_expires_at) > new Date() : false,
  })
}
