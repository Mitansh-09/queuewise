# QueueWise

QueueWise is an appointment and walk-in queue manager for local service businesses. Customers can reserve a token and follow their place in line while teams manage bookings and walk-ins in one shared queue.
Demo Video: https://drive.google.com/drive/folders/1eIcJpSozTgCMrQA-A-sks5p-YOIy99k4?usp=drive_link

Live URL: https://queuewise-xi.vercel.app/

## Problem Statement

Small service teams often handle appointments and walk-ins at the same time. Customers may not know how long they will wait, and staff can end up coordinating the line manually. QueueWise gives both sides a shared view of the queue and clear actions for moving it forward.

## Target Users

- Customers who need to visit a local service and want to follow their queue.
- Owners and staff at clinics, college offices, salons, repair shops, and similar businesses.
- Front-desk teams that coordinate appointments and walk-ins.

## Solution

Each business publishes its service sessions, hours, capacity, and typical service time. Customers join an available queue online or arrive as a walk-in. QueueWise assigns tokens, shows queue position and an estimated wait, and gives staff tools to check people in, call the next token, and record completed or missed visits.

## Key Features

- Business owners can create a workspace and select a business type.
- Business administrators can add team members and publish service listings and sessions.
- Customers can find a service, reserve a token, and follow their place in the queue.
- Online bookings and walk-ins receive tokens in the same queue.
- Staff can check in arrivals, call the next token, finish service, skip or mark missed turns, and manage booking availability.
- Customers can cancel or reschedule eligible tokens.
- Queue status updates in real time, with an estimated wait based on service time and people ahead.
- Business administrators can review daily booking, arrival, completion, and wait figures.
- Light and dark themes are available, with the selected theme saved in the browser.

## Tech Stack

- Next.js 16, React 19, and TypeScript
- Supabase Auth, PostgreSQL, Realtime, and Row Level Security
- CSS for responsive layouts and themes
- Vercel for application hosting

## Architecture

The Next.js application provides the customer, business, and directory screens. The browser uses the Supabase publishable key. Supabase Auth handles sign-in; PostgreSQL stores business and queue data; authenticated database functions handle operations that need permission checks and consistent token ordering. Row Level Security scopes customer data to its owner and business data to assigned staff. Supabase Realtime keeps queue views current.

```text
Customer / Business browser
           ↓
     Next.js on Vercel
           ↓
       Supabase Auth
           ↓
PostgreSQL + RLS + queue functions
           ↓
   Supabase Realtime updates
           ↓
     Refreshed queue views
```

Some database tables and functions retain clinic-oriented names from the original schema. Business types and customer-facing screens support multiple kinds of local services.

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a Supabase project and enable email and password authentication. Set the local Site URL to `http://localhost:3000` and allow it in the authentication Redirect URLs.

Apply the SQL files in `supabase/migrations/` in filename order. They create the schema, access policies, queue functions, indexes, service directory, business types, and self-service business registration.

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and enter your Supabase project URL and publishable key. See [Environment Variables](#environment-variables) below.

### 4. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Create your first business

Register and sign in, open the business workspace, and create a business with its name, type, and address. The creator becomes its first administrator. Add team accounts, publish service listings, then create service sessions with dates, hours, capacity, service-time estimates, and optional prices.

## Environment Variables

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL of the Supabase project | `https://your-project-ref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser-safe Supabase publishable key | `sb_publishable_your_key` |

Keep real credentials in `.env.local` or the hosting provider's environment settings. Never expose or commit a Supabase secret or service-role key.

## Deployment

- **Live application:** [queuewise-xi.vercel.app](https://queuewise-xi.vercel.app/)
- **Source code:** [github.com/Mitansh-09/queuewise](https://github.com/Mitansh-09/queuewise)

The project is hosted on Vercel and uses Supabase for authentication, database, and realtime updates. To deploy your own copy, import the GitHub repository into Vercel, add the two environment variables above, deploy the app, then set the deployed URL as the Supabase Site URL and add it to Redirect URLs. Pushes to `main` trigger a new Vercel deployment for the connected project.

## Security and Limits

- Row Level Security is enabled on public tables.
- Customers can read their own tokens and queue status. Staff can read queue data for businesses they belong to.
- Booking, walk-in registration, status changes, session setup, and business setup use database functions that check the signed-in user's permissions.
- Token allocation locks a schedule before incrementing its counter, preventing duplicate token numbers.
- Queue estimates are indicative and may change as service times vary or staff adjust the order.
- QueueWise has not had an independent privacy or security review. Do not use it with sensitive real customer data.
