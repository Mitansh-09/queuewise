import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function PrivacyPage() {
  return <main className="shell"><SiteHeader /><article className="legal-page">
    <p className="eyebrow">Privacy</p><h1>QueueWise privacy notice</h1><p className="legal-updated">Student project · 24 October 2026</p>
    <p>QueueWise is a student demonstration for appointment and walk-in queues at local service businesses. Do not use it as a production system for sensitive customer data.</p>
    <h2>Information used</h2><p>QueueWise stores account details needed for sign-in and the name and phone number entered when a customer joins a queue. An optional note is shared with the assigned service team. Queue events and timestamps are stored to operate sessions and calculate wait estimates.</p>
    <h2>Who can see it</h2><p>Customers can see their own tokens and queue positions. Assigned business staff can see the queue for their workspace. Service providers can see their assigned sessions and customer-shared notes. Business administrators manage staff and settings.</p>
    <h2>Storage and security</h2><p>QueueWise uses Supabase authentication, database access policies, and a publishable client key. The project has not had an independent privacy or security review and should not be used with sensitive real-world customer data.</p>
    <h2>Retention</h2><p>Booking and queue records remain in the project database according to its configuration. Contact the project administrator for account or data removal requests.</p>
  </article><SiteFooter /></main>
}
