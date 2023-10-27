import { createAdminClient } from '@/lib/admin/supabase-admin'
import { keyToUuid } from '@/lib/format-key'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

// TODO: responses should use http status codes, remove "ok" resp prop

export async function POST(request: Request) {
  const { licenseKey, label } = await request.json()

  const client = createAdminClient()

  console.log(`Attempting to activate license ${licenseKey} for ${label}`)

  const formattedKey = keyToUuid(licenseKey)
  const { data, error } = await client
    .from('licenses')
    .select('key, seats, license_instances(*)')
    .eq('key', formattedKey)
    .eq('status', 'active')
    .maybeSingle()

  if (error || !data) {
    console.log(`Could not retrieve license key ${formattedKey}`)
    return NextResponse.json({
      ok: false,
    })
  }

  const activations = data.license_instances as any[]

  if (activations.length >= (data.seats ?? 0)) {
    return NextResponse.json({
      ok: false,
      error: 'License has no seats available',
    })
  }

  const { data: instance, error: instanceError } = await client
    .from('license_instances')
    .insert({
      license_id: data.key,
      label,
      status: 'active',
    })
    .select()

  if (instanceError || !instance || instance.length === 0) {
    console.error(`Could not activate license: ${instanceError?.message}`)
    return NextResponse.json({
      ok: false,
    })
  }

  return NextResponse.json({
    ok: true,
    instanceID: instance[0].id,
  })
}
