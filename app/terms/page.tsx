import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function TermsPage() {
  return <main className="shell"><SiteHeader /><article className="legal-page">
    <p className="eyebrow">Terms</p><h1>QueueWise terms of use</h1><p className="legal-updated">Student project · 24 October 2026</p>
    <p>QueueWise is a student software demonstration. It is not a hospital information system, emergency service, or source of medical advice.</p>
    <h2>Queue information</h2><p>Wait times are estimates based on session settings and queue activity. They can change as visits take longer or clinic staff adjust the order. Contact the clinic directly if you need to confirm your appointment or arrival time.</p>
    <h2>Clinic listings</h2><p>Participating clinic staff provide doctor and clinic details. QueueWise cannot guarantee that listings or schedules are complete or current.</p>
    <h2>Availability and real-world use</h2><p>The application may change or be unavailable during development. It has not had an independent clinical-safety, privacy, or security review. Do not rely on it for urgent care or use it with real patient information without the clinic’s approval and appropriate review.</p>
  </article><SiteFooter /></main>
}
