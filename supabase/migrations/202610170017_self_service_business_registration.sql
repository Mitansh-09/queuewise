create or replace function public.create_business(p_name text, p_address text, p_business_type text)
returns public.clinics language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_business public.clinics;
  v_type text := lower(trim(p_business_type));
begin
  if auth.uid() is null then
    raise exception 'Sign in before creating a business';
  end if;
  if length(trim(p_name)) < 2 or length(trim(p_name)) > 120 then
    raise exception 'Business name must be between 2 and 120 characters';
  end if;
  if length(trim(p_address)) < 5 or length(trim(p_address)) > 240 then
    raise exception 'Address must be between 5 and 240 characters';
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
