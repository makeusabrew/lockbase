create table public.licenses (
  key uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  owner_email text null,
  idempotency_key text null,
  support_expires_at timestamp with time zone null,
  status text null,
  seats bigint null,

  constraint idempotency_key_unique unique (idempotency_key),
  constraint licenses_pkey primary key (key)
);

create table public.license_instances (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  status text null,
  label text null,
  license_key uuid null,

  constraint license_instances_pkey primary key (id),
  constraint license_instances_license_key foreign key (license_key) references licenses (key) on delete cascade
);