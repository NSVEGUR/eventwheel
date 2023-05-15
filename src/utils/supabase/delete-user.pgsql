create function public.handle_old_user()
returns trigger as $$
begin
  delete from public.users
  where id = old.id::text;
  return old;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_old_user();