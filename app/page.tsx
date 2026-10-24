import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const workflows = [
  { number: '01', title: 'Book a token', description: 'Choose a participating clinic and an available doctor session. Your place is reserved in the same queue staff manage.' },
  { number: '02', title: 'Know when to arrive', description: 'See how many people are ahead and get a live wait estimate that changes as visits move through the queue.' },
  { number: '03', title: 'Keep the day moving', description: 'Clinic teams check in arrivals, add walk-ins, call the next patient, and close out missed or completed visits.' },
]

export default function Home() {
  return (
    <main className="home-page">
      <div className="shell">
        <SiteHeader />
        <section className="hero" aria-labelledby="home-heading">
          <div>
            <p className="eyebrow">For patients and clinic teams</p>
            <h1 id="home-heading">One clear queue for clinic visits.</h1>
            <p className="hero-copy">Book a same-day token or register a walk-in. Patients see who&apos;s ahead and a changing wait estimate; clinic teams manage every visit in one place.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/patient">Book or track a token</Link>
              <Link className="button button-secondary" href="/doctors">View clinics</Link>
            </div>
            <p className="hero-caption">Wait estimates can change. The clinic team manages the order of care.</p>
          </div>
          <div className="queue-card" aria-label="Sample clinic queue">
            <div className="queue-card-head"><span>Example clinic queue</span><span className="status-serving">Queue preview</span></div>
            <div className="queue-row"><strong>12</strong><span>Now seeing</span><time>In consultation</time></div>
            <div className="queue-row current"><strong>13</strong><span><b>Your place</b><br />1 person ahead</span><time>~10 min</time></div>
            <div className="queue-row"><strong>14</strong><span>Waiting</span><time>~20 min</time></div>
            <p className="queue-note">Sample values. Your queue position appears after you book a token.</p>
          </div>
        </section>

        <section className="workflow-section" aria-labelledby="workflow-heading">
          <p className="eyebrow">One shared queue</p>
          <h2 id="workflow-heading">From booking to a finished visit.</h2>
          <div className="workflow-grid">
            {workflows.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-heading">
          <div><p className="eyebrow">For clinic staff</p><h2 id="principles-heading">Keep bookings and walk-ins in one queue.</h2></div>
          <ul>
            <li>Appointments and walk-ins share one numbered queue, with capacity checked when a token is created.</li>
            <li>Reception checks in arrivals, calls the next patient, finishes visits, and records no-shows or skips.</li>
            <li>Patients see their own queue position and can cancel or move an eligible token.</li>
          </ul>
        </section>
        <SiteFooter />
      </div>
    </main>
  )
}
