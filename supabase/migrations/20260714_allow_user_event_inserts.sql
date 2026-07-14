drop policy if exists "Users can insert own events" on public.events;

create policy "Users can insert own events"
on public.events
for insert
with check (auth.uid() = user_id);
