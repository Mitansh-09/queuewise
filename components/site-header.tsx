import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="QueueWise home">
        <span className="wordmark-mark" aria-hidden="true" />
        QueueWise
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/patient">Book a token</Link>
        <Link href="/doctors">Clinics</Link>
        <Link href="/staff">For clinics</Link>
        <Link className="nav-action" href="/login">Sign in</Link>
      </nav>
      <details className="site-menu">
        <summary aria-label="Open navigation menu"><span>Menu</span><i aria-hidden="true" /></summary>
        <nav className="site-menu-links" aria-label="Mobile navigation">
          <Link href="/patient">Book or track a token</Link>
          <Link href="/doctors">Find a clinic</Link>
          <Link href="/staff">Clinic staff</Link>
          <Link href="/login">Sign in</Link>
        </nav>
      </details>
    </header>
  )
}
