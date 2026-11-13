-- Create sent_emails table for admin outbound communications
create table if not exists public.sent_emails (
  id uuid primary key default gen_random_uuid(),
  sender_address text not null,
  recipient_email text not null,
  cc_emails text[] null,
  subject text not null,
  body_html text not null,
  resend_message_id text null,
  status text not null default 'sent',
  sent_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists sent_emails_created_at_idx on public.sent_emails (created_at desc);
create index if not exists sent_emails_sent_by_idx on public.sent_emails (sent_by);

alter table public.sent_emails enable row level security;

-- Only authenticated admin users can view sent emails
drop policy if exists "Admins can view sent emails" on public.sent_emails;
create policy "Admins can view sent emails"
  on public.sent_emails
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

-- Only authenticated admin users can insert sent emails
drop policy if exists "Admins can insert sent emails" on public.sent_emails;
create policy "Admins can insert sent emails"
  on public.sent_emails
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.users u
      where u.id = auth.uid()
        and u.role = 'admin'
    )
    and sent_by = auth.uid()
  );
