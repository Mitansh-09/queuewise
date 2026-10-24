import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>QueueWise helps patients and clinic teams manage the waiting room together.</p>
      <div>
        <Link href="/doctors">Find a clinic</Link>
        <Link href="/staff">Clinic staff</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  )
}
