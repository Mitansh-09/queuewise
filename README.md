# QueueWise

QueueWise is a clinic queue application for same-day doctor sessions. Patients reserve a token and follow their place in line. Reception staff manage online bookings and walk-ins in the same queue, while doctors and clinic administrators see tools for their assigned work.

## The problem

Patients often arrive without knowing how long they will wait. Clinic teams manage appointments and walk-ins at the same time, while the queue changes through the day. QueueWise gives patients and clinic staff a shared queue with clear actions and an estimated wait that updates as visits move forward.

## Main workflows

1. A clinic administrator creates a clinic, adds staff, and publishes doctor sessions with hours, capacity, and average consultation time.
2. A patient finds a participating clinic and books an available same-day token.
3. The database allocates the token atomically and rejects closed, full, past, or duplicate bookings.
4. The patient follows their token, people ahead, and estimated wait as the queue changes.
5. Reception checks in arrivals, registers walk-ins, calls the next patient, records skips or no-shows, and finishes visits.
6. Clinic administrators review daily booking, arrival, completion, and wait figures.

## Tech stack

- Next.js 16, React 19, and TypeScript
- Supabase Auth, Postgres, Realtime, and Row Level Security
- CSS and responsive layouts

## Architecture

The browser uses only the Supabase publishable key. Queue operations that need consistent ordering run through authenticated Postgres functions. Row Level Security scopes patient data to its owner and clinic data to assigned staff. Supabase Realtime notifies the patient and staff screens when appointments change.

```text
Patient portal / Clinic console
              ↓
        Supabase Auth
              ↓
RLS-protected tables and queue functions
              ↓
     Supabase Realtime
              ↓
     Updated queue views
```

### Core tables

| Table | Purpose |
| --- | --- |
| `profiles` | Account name, phone, and default patient role |
| `clinics` | Clinic name, address, and active state |
| `staff_members` | Clinic assignments and staff roles |
| `clinic_doctors` | Clinic-managed clinician directory and doctor account link |
| `clinic_schedules` | Doctor sessions, capacity, hours, and token availability |
| `appointments` | Online and walk-in tokens with workflow timestamps |
| `queue_events` | Audit trail for queue status changes |
| `clinic_settings`, `clinic_closures` | Booking preferences and closure dates |
| `appointment_notes` | Optional patient-shared visit reason, visible to the assigned doctor |

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a Supabase project. Enable email and password authentication. Set the local Site URL to `http://localhost:3000` and allow that URL in Redirect URLs.

Apply every SQL file in `supabase/migrations/` in filename order. The migrations create the schema, access policies, queue functions, indexes, and doctor directory.

### 3. Set environment variables

Copy `.env.example` to `.env.local` and enter the project URL and publishable key:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

Never expose a Supabase secret or service-role key in the browser or commit credentials.

### 4. Start Next.js

```bash
npm run dev
```

Open `http://localhost:3000`.

## First clinic setup

1. Register an account, then promote it to the platform administrator once in the Supabase SQL Editor:

```sql
update public.profiles set role = 'admin' where id = 'registered-account-uuid';
```

2. Sign in at **For clinics** and create a clinic. The creator becomes its clinic administrator.
3. Register receptionist and doctor accounts. In the clinic admin screen, assign each account UUID to a clinic role.
4. Add doctor directory entries and link doctor account UUIDs where applicable.
5. Publish doctor sessions with dates, hours, capacity, consultation estimates, and fees.

The first account should remain a patient by default. Staff access is assigned through `staff_members`; users cannot grant themselves clinic access from the browser.

## Security and limits

- Row Level Security is enabled on the public tables.
- Patients can read their own bookings and queue status. Staff can read queue data for clinics they belong to.
- Booking, walk-in registration, status changes, session setup, and clinic setup use database functions that check the signed-in user’s permissions.
- Token allocation locks a schedule before incrementing its counter, preventing duplicate token numbers.
- The application uses a publishable key only. Do not add a service-role key to client-side environment variables.
- Queue estimates are indicative, not guaranteed. Clinic staff may change the order of care.
- QueueWise is a student demonstration and has not had independent clinical-safety, privacy, or security review. Do not use it for urgent care or production patient data.

## Deploy

Deploy to Vercel or another Next.js host. Add the two environment variables in the host settings. Set the deployed URL as the Supabase Site URL and add it to Redirect URLs. Test patient and staff workflows using separate accounts before sharing the deployment.

## Demo outline

1. Show the clinic’s doctor session and token capacity.
2. Book a patient token and show its initial queue position.
3. Add a walk-in and show the shared token order.
4. Check the patient in, call the next token, and finish a visit.
5. Show the patient queue updating and review the daily report.
