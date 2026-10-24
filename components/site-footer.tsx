import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer-v2">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="footer-brand" href="/" aria-label="QueueWise home"><span className="footer-mark" aria-hidden="true"><i /><i /><i /></span><span>QueueWise</span></Link>
          <p>Make room for the rest of your day.<br />A clearer queue for local services.</p>
        </div>
        <nav className="footer-column" aria-label="Explore QueueWise">
          <p>EXPLORE</p>
          <Link href="/doctors">Browse businesses</Link>
          <Link href="/patient">Join or track a queue</Link>
        </nav>
        <nav className="footer-column" aria-label="For business teams">
          <p>FOR TEAMS</p>
          <Link href="/staff">Business workspace</Link>
          <Link href="/register?next=%2Fstaff">Create an account</Link>
        </nav>
        <nav className="footer-column" aria-label="Legal information">
          <p>INFORMATION</p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="footer-bottom"><span>© 2026 QueueWise</span><span>For clinics, college offices, salons, repair shops, and more.</span></div>
    </footer>
  )
}
