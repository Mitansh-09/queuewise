-- Public clinic directory and doctor assignment data for QueueWise.
create table public.clinic_doctors (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 100),
  specialty text not null check (char_length(specialty) between 2 and 100),
  qualifications text check (qualifications is null or char_length(qualifications) <= 200),
  experience_years integer check (experience_years is null or experience_years between 0 and 70),
  languages text[] not null default '{}',
  search_terms text[] not null default '{}',
  listed boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index clinic_doctors_clinic_listed_idx on public.clinic_doctors (clinic_id, listed, specialty);
create index clinic_doctors_search_terms_idx on public.clinic_doctors using gin (search_terms);

alter table public.clinic_doctors enable row level security;

create policy "Clinic staff manage their doctor directory" on public.clinic_doctors
  for all to authenticated
  using (exists (
    select 1 from public.staff_members sm
    where sm.clinic_id = clinic_doctors.clinic_id and sm.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.staff_members sm
    where sm.clinic_id = clinic_doctors.clinic_id and sm.user_id = (select auth.uid())
  ));

create policy "Signed-in patients see listed doctors at active clinics" on public.clinic_doctors
  for select to authenticated
  using (listed and exists (
    select 1 from public.clinics c
    where c.id = clinic_doctors.clinic_id and c.active
  ));

revoke all on public.clinic_doctors from anon;
grant select, insert, update, delete on public.clinic_doctors to authenticated;
