import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function PrivacyPage() {
  return <main className="shell"><SiteHeader /><article className="legal-page">
    <p className="eyebrow">Privacy</p><h1>QueueWise privacy notice</h1><p className="legal-updated">Student project · 24 October 2026</p>
    <p>QueueWise is a student demonstration for clinic queue management. Do not use it for emergency care or as a production medical record system.</p>
    <h2>Information used</h2><p>QueueWise stores account details needed for sign-in and the name and phone number entered when a patient books a token. An optional visit reason is shared with the doctor assigned to that session. Queue events and timestamps are stored to operate the session and calculate wait estimates.</p>
    <h2>Who can see it</h2><p>Patients can see their own bookings and queue positions. Assigned clinic staff can see the queue for their clinic. Doctors are limited to their assigned sessions and patient-shared visit reasons. Clinic administrators manage clinic staff and settings.</p>
    <h2>Storage and security</h2><p>QueueWise uses Supabase authentication, database access policies, and a publishable client key. The project has not had an independent privacy or security review and should not be used with sensitive real-world patient data.</p>
    <h2>Retention</h2><p>Booking and queue records remain in the project database according to its configuration. Contact the project administrator for account or data removal requests.</p>
  </article><SiteFooter /></main>
}
