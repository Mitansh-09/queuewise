import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const workflows = [
  { number: '01', title: 'Join a queue', description: 'Choose a nearby business and an available service session. Your place is reserved in the same queue the team manages.' },
  { number: '02', title: 'Know your place', description: 'See how many people are ahead and follow a live wait estimate as the team serves each person.' },
  { number: '03', title: 'Keep the day moving', description: 'Staff check in arrivals, add walk-ins, call the next token, and close out completed or missed visits.' },
]

export default function Home() {
  return (
    <main className="home-page">
      <div className="shell">
        <SiteHeader />
        <section className="hero" aria-labelledby="home-heading">
          <div>
            <p className="eyebrow">For customers and service teams</p>
            <h1 id="home-heading">One clear queue for every kind of service.</h1>
            <p className="hero-copy">Join a same-day queue or walk in. Customers see who&apos;s ahead and a changing wait estimate; teams manage every visit in one place.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/patient">Join or track a queue</Link>
              <Link className="button button-secondary" href="/doctors">Browse businesses</Link>
            </div>
            <p className="hero-caption">Wait estimates can change. Staff can adjust the queue when the situation calls for it.</p>
          </div>
          <div className="queue-card" aria-label="Sample service queue">
            <div className="queue-card-head"><span>Example service queue</span><span className="status-serving">Queue preview</span></div>
            <div className="queue-row"><strong>12</strong><span>Now serving</span><time>In progress</time></div>
            <div className="queue-row current"><strong>13</strong><span><b>Your place</b><br />1 person ahead</span><time>~10 min</time></div>
            <div className="queue-row"><strong>14</strong><span>Waiting</span><time>~20 min</time></div>
            <p className="queue-note">Sample values. Your queue position appears after you book a token.</p>
          </div>
        </section>

        <section className="workflow-section" aria-labelledby="workflow-heading">
          <p className="eyebrow">One shared queue</p>
          <h2 id="workflow-heading">From joining to being served.</h2>
          <div className="workflow-grid">
            {workflows.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-heading">
          <div><p className="eyebrow">For business teams</p><h2 id="principles-heading">Keep bookings and walk-ins in one queue.</h2></div>
          <ul>
            <li>Online bookings and walk-ins share one numbered queue, with capacity checked for every token.</li>
            <li>Staff check in arrivals, call the next person, finish service, and record missed turns or skips.</li>
            <li>Customers see their queue position and can cancel or move an eligible token.</li>
          </ul>
        </section>
        <SiteFooter />
      </div>
    </main>
  )
}
