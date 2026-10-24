import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>QueueWise helps customers and service teams manage in-person queues together.</p>
      <div>
        <Link href="/doctors">Browse businesses</Link>
        <Link href="/staff">For businesses</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  )
}
