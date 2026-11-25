-- Create received_emails table for inbound emails via Resend Webhook
create table if not exists public.received_emails (
  id uuid primary key default gen_random_uuid(),
  resend_email_id text unique not null,
  from_email text not null,
  from_name text null,
  to_email text not null,
  subject text not null,
  body_text text null,
  body_html text null,
  is_read boolean not null default false,
  received_at timestamptz not null default now()
);

create index if not exists received_emails_received_at_idx on public.received_emails (received_at desc);
create index if not exists received_emails_is_read_idx on public.received_emails (is_read);
create index if not exists received_emails_to_email_idx on public.received_emails (to_email);

alter table public.received_emails enable row level security;

-- Only authenticated admin users can view received emails
drop policy if exists "Admins can view received emails" on public.received_emails;
create policy "Admins can view received emails"
  on public.received_emails
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.users u
      where u.id = auth.uid()
        and u.role = 'admin'
    )
  );

-- Only authenticated admin users can update received emails (e.g., mark as read)
drop policy if exists "Admins can update received emails" on public.received_emails;
create policy "Admins can update received emails"
  on public.received_emails
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.users u
      where u.id = auth.uid()
        and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.users u
      where u.id = auth.uid()
        and u.role = 'admin'
    )
  );
