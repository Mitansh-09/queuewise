import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const useCases = [
  { icon: '✳', title: 'Clinics', note: 'Appointments and walk-ins' },
  { icon: '▤', title: 'College offices', note: 'Student service desks' },
  { icon: '⌁', title: 'Salons', note: 'Everyday appointments' },
  { icon: '⌘', title: 'Repair shops', note: 'Drop-offs and service' },
]

const steps = [
  { number: '01', title: 'Pick a service', body: 'Find a participating business and choose a session that works for you.' },
  { number: '02', title: 'Keep your place', body: 'Get a token and follow the queue from your phone while the day moves.' },
  { number: '03', title: 'Run a smoother day', body: 'Teams manage bookings and walk-ins together, with clear actions at every step.' },
]

export default function Home() {
  return (
    <main className="home-v2">
      <div className="shell home-shell">
        <SiteHeader />

        <section className="home-hero" aria-labelledby="home-heading">
          <div className="home-hero-copy">
            <p className="home-kicker"><span /> A little less waiting, a lot more clarity</p>
            <h1 id="home-heading">Your day has <em>better things</em> to do than wait.</h1>
            <p className="home-lede">Join a local service queue, see your place, and head over when it makes sense. For the people waiting—and the teams helping them.</p>
            <div className="home-hero-actions">
              <Link className="button button-primary" href="/patient">Find a queue <span aria-hidden="true">↗</span></Link>
              <Link className="home-text-link" href="/staff">I run a business <span aria-hidden="true">→</span></Link>
            </div>
            <div className="home-proof"><span className="proof-dots" aria-hidden="true"><i /><i /><i /></span><span>One queue for appointments and walk-ins</span></div>
          </div>

          <div className="home-hero-art" aria-label="Illustration of a sample QueueWise service queue">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="mini-note mini-note-top"><span className="mini-note-icon">↗</span><span><strong>Keep your place</strong><small>Updates as the queue moves</small></span></div>
            <article className="queue-preview">
              <div className="preview-topline"><span className="preview-brand"><span className="preview-brand-mark">q</span> QueueWise</span><span className="preview-live"><i /> SAMPLE QUEUE</span></div>
              <div className="preview-business"><div><span className="preview-label">TODAY AT</span><h2>Corner & Co.</h2></div><span className="preview-category">Local service</span></div>
              <div className="preview-now"><div><span className="preview-label">NOW SERVING</span><strong>12</strong></div><div className="preview-now-name"><span className="preview-avatar">J</span><span>Jordan<small>In service</small></span></div></div>
              <div className="preview-you"><div className="preview-token"><span className="preview-label">YOUR TOKEN</span><strong>15</strong></div><div className="preview-wait"><span className="preview-label">PEOPLE AHEAD</span><strong>2 <small>people</small></strong></div><div className="preview-estimate">~20 min</div></div>
              <div className="preview-progress"><span /></div>
              <p className="preview-foot"><span>◷</span> An estimate, so you can plan your time.</p>
            </article>
            <div className="mini-note mini-note-bottom"><span className="mini-note-check">✓</span><span><strong>Appointments + walk-ins</strong><small>One shared line. No guesswork.</small></span></div>
            <span className="art-spark art-spark-one" aria-hidden="true">✳</span><span className="art-spark art-spark-two" aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="use-cases" aria-labelledby="use-cases-heading">
          <div className="use-cases-heading"><p className="section-overline">MADE FOR EVERYDAY SERVICES</p><h2 id="use-cases-heading">Wherever a line can form.</h2></div>
          <div className="use-case-grid">{useCases.map((item) => <article className="use-case" key={item.title}><span className="use-case-icon" aria-hidden="true">{item.icon}</span><span><strong>{item.title}</strong><small>{item.note}</small></span><span className="use-case-arrow" aria-hidden="true">↗</span></article>)}</div>
        </section>

        <section className="how-section" aria-labelledby="how-heading">
          <div className="how-heading"><div><p className="section-overline">A BETTER WAY THROUGH THE DAY</p><h2 id="how-heading">Simple for everyone<br />in the queue.</h2></div><p>Customers know what to expect. Teams know what to do next. The whole line stays in sync.</p></div>
          <div className="how-grid">{steps.map((step) => <article className="how-card" key={step.number}><span className="how-number">{step.number}</span><span className="how-arrow" aria-hidden="true">↗</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
        </section>

        <section className="owner-cta"><div className="owner-cta-mark" aria-hidden="true"><span /><span /><span /></div><div><p className="section-overline">FOR LOCAL TEAMS</p><h2>Give the waiting room<br />a better rhythm.</h2><p>Set up your business, publish service hours, and bring bookings and walk-ins into one manageable queue.</p></div><Link className="button button-light" href="/staff">Set up your business <span aria-hidden="true">→</span></Link></section>

        <SiteFooter />
      </div>
    </main>
  )
}
