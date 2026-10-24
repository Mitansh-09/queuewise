alter table public.clinics
  add column if not exists business_type text not null default 'clinic';

alter table public.clinics
  add constraint clinics_business_type_check
  check (business_type in ('clinic', 'college_office', 'salon', 'repair_shop', 'other'));

create or replace function public.create_business(p_name text, p_address text, p_business_type text)
returns public.clinics language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_business public.clinics;
  v_type text := lower(trim(p_business_type));
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Only a platform administrator can create a business';
  end if;
  if v_type is null or v_type not in ('clinic', 'college_office', 'salon', 'repair_shop', 'other') then
    raise exception 'Choose a supported business type';
  end if;
  insert into public.clinics (name, address, business_type)
    values (trim(p_name), trim(p_address), v_type)
    returning * into v_business;
  insert into public.clinic_settings (clinic_id) values (v_business.id);
  insert into public.staff_members (clinic_id, user_id, role)
    values (v_business.id, auth.uid(), 'admin');
  return v_business;
end; $$;

revoke all on function public.create_business(text, text, text) from public, anon;
grant execute on function public.create_business(text, text, text) to authenticated;
