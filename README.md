# QueueWise

QueueWise is a same-day appointment and walk-in queue manager for local service businesses. It can be used by clinics, college offices, salons, repair shops, and similar teams. Customers reserve a token and follow their place in line; staff manage bookings and walk-ins in one shared queue.

## The problem

Small service teams often handle walk-ins and appointments at the same time, while customers have little idea how long they will wait. QueueWise gives each business a shared queue, lets customers follow their token, and gives staff clear actions for running the day.

## Main workflows

1. A signed-in owner creates a business and chooses its type: clinic, college office, salon, repair shop, or other. The creator becomes its business administrator.
2. The business administrator assigns team roles and publishes service sessions with hours, capacity, typical service time, and an optional price.
3. A customer chooses a participating business and joins an available same-day queue.
4. The database allocates tokens atomically and rejects closed, full, past, or duplicate bookings.
5. Customers follow their token, people ahead, and estimated wait as the queue moves.
6. Staff check in arrivals, add walk-ins, call the next token, record missed turns, and finish service.
7. Business administrators review daily booking, arrival, completion, and wait figures.

## Tech stack

- Next.js 16, React 19, and TypeScript
- Supabase Auth, Postgres, Realtime, and Row Level Security
- CSS and responsive layouts

## Architecture

The browser uses only the Supabase publishable key. Queue operations that need consistent ordering run through authenticated Postgres functions. Row Level Security scopes customer data to its owner and business data to assigned staff. Supabase Realtime updates customer and staff screens when tokens change.

```text
Customer queue / Business workspace
                 ↓
           Supabase Auth
                 ↓
   RLS-protected tables and queue functions
                 ↓
        Supabase Realtime
                 ↓
       Updated queue views
```

The database retains some clinic-oriented table and function names for compatibility with earlier migrations. The user interface and business setup support multiple service types.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a Supabase project. Enable email and password authentication. Set the Site URL to your app URL and add its URL pattern to Redirect URLs.

Apply the SQL files in `supabase/migrations/` in filename order. The migrations create the schema, access policies, queue functions, indexes, service directory, and business types.

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

## First business setup

1. Register an account and sign in to the business workspace.
2. Create a business and choose its type, name, and address. The creator becomes its business administrator.
3. Register team accounts. In workspace settings, assign each account UUID as a front-desk user, service provider, or business administrator.
4. Add service listings and link team account UUIDs where applicable.
5. Publish service sessions with dates, hours, capacity, service-time estimates, and optional prices.

New accounts can use the customer queue or create their own business. Business access is assigned through `staff_members`; users cannot grant themselves access to another business from the browser.

## Security and limits

- Row Level Security is enabled on the public tables.
- Customers can read their own tokens and queue status. Staff can read queue data for businesses they belong to.
- Booking, walk-in registration, status changes, session setup, and business setup use database functions that check the signed-in user’s permissions.
- Token allocation locks a schedule before incrementing its counter, preventing duplicate token numbers.
- The application uses a publishable key only. Do not add a service-role key to client-side environment variables.
- Queue estimates are indicative, not guaranteed. Staff may adjust the order when the situation requires it.
- QueueWise is a student demonstration and has not had independent privacy or security review. Do not use it with sensitive real customer data.

## Deployment

The current deployment uses Vercel for the Next.js app and Supabase for backend services. Set the two environment variables in Vercel and configure the deployed URL as the Supabase Site URL and Redirect URL. GitHub pushes to `main` trigger a new Vercel deployment.

## Demo outline

1. Create a business and choose a type such as a salon or repair shop.
2. Publish a service session and token capacity.
3. Join a customer token and show its starting queue position.
4. Add a walk-in and show it joining the same queue.
5. Call the next token, finish service, and show the wait estimate update.
