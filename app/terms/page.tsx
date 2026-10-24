import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function TermsPage() {
  return <main className="shell"><SiteHeader /><article className="legal-page">
    <p className="eyebrow">Terms</p><h1>QueueWise terms of use</h1><p className="legal-updated">Student project · 24 October 2026</p>
    <p>QueueWise is a student software demonstration for appointment and walk-in queues at clinics, college offices, salons, repair shops, and other local services.</p>
    <h2>Queue information</h2><p>Wait times are estimates based on session settings and queue activity. They can change as service times vary or staff adjust the order. Contact the business directly to confirm its hours or your arrival time.</p>
    <h2>Business listings</h2><p>Participating businesses provide their own details, services, and schedules. QueueWise cannot guarantee that listings or schedules are complete or current.</p>
    <h2>Availability and real-world use</h2><p>The application may change or be unavailable during development. It has not had an independent privacy or security review. Do not use it with sensitive real-world customer information without the business’s approval and appropriate review.</p>
  </article><SiteFooter /></main>
}
