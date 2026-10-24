'use client'

import Link from 'next/link'
import { QueueWiseMark } from '@/components/queuewise-mark'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type ServiceListing = {
  id: string
  clinic_id: string
  display_name: string
  specialty: string
  qualifications: string | null
  experience_years: number | null
  languages: string[]
  search_terms: string[]
  listed?: boolean
  user_id?: string | null
  clinics: { name: string; address: string; business_type?: string }
}

const businessTypeNames: Record<string, string> = {
  clinic: 'Clinic',
  college_office: 'College office',
  salon: 'Salon',
  repair_shop: 'Repair shop',
  other: 'Local service',
}

export function DoctorDirectory() {
  const router = useRouter()
  const [services, setServices] = useState<ServiceListing[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const supabase = createClient()
        const { data: identity } = await supabase.auth.getUser()
        if (!identity.user) { router.push('/login?next=/doctors'); return }
        const { data, error: fetchError } = await supabase.from('clinic_doctors')
          .select('id,clinic_id,display_name,specialty,qualifications,experience_years,languages,search_terms,clinics!inner(name,address,business_type)')
          .eq('listed', true).order('display_name').limit(250)
        if (fetchError) throw fetchError
        if (!cancelled) setServices((data || []) as unknown as ServiceListing[])
      } catch (caught) {
        if (!cancelled) setError(caught instanceof Error ? caught.message : 'Service listings could not be loaded.')
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [router])

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    if (!term) return services
    return services.filter((service) => [service.display_name, service.specialty, service.qualifications || '', service.clinics.name, service.clinics.address, ...service.search_terms, ...service.languages].join(' ').toLocaleLowerCase().includes(term))
  }, [services, query])

  return <main className="directory-page"><header className="health-topbar"><Link className="wordmark" href="/"><QueueWiseMark className="queuewise-mark" />QueueWise</Link><nav aria-label="QueueWise navigation"><Link href="/patient">Join a queue</Link><Link href="/staff">Business workspace</Link></nav></header><div className="directory-content"><p className="eyebrow">Local services</p><h1>Find a business or service.</h1><p className="directory-intro">Browse participating clinics, college offices, salons, repair shops, and other local services. Join a queue when a service session is available.</p><label className="directory-search">Search business or service<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try a business name, service, or area" /></label>{error && <p role="alert" className="form-message error">{error}</p>}{loading ? <p className="page-state">Loading service listings…</p> : filtered.length ? <div className="doctor-grid">{filtered.map((service) => <article className="doctor-card" key={service.id}><p className="eyebrow">{businessTypeNames[service.clinics.business_type || 'other']} · {service.specialty}</p><h2>{service.display_name}</h2><p className="doctor-clinic">{service.clinics.name}</p><p>{service.clinics.address}</p>{service.qualifications && <p>{service.qualifications}</p>}{service.experience_years !== null && <p>{service.experience_years} years of experience</p>}{service.languages.length > 0 && <p>Languages: {service.languages.join(', ')}</p>}{service.search_terms.length > 0 && <div className="doctor-tags">{service.search_terms.map((tag) => <span key={tag}>{tag}</span>)}</div>}<Link className="button button-secondary" href={`/patient?clinic=${encodeURIComponent(service.clinic_id)}&doctor=${encodeURIComponent(service.display_name)}`}>View queue</Link></article>)}</div> : <section className="directory-empty surface"><h2>{services.length ? 'No services match that search.' : 'No service listings yet.'}</h2><p>{services.length ? 'Try another business name, service, or area.' : 'Business teams can publish their services from the workspace. No sample listings are shown.'}</p><Link className="button button-secondary" href="/staff">Business sign in</Link></section>}</div></main>
}

export function ClinicDoctorManager({ clinicId }: { clinicId: string }) {
  const [services, setServices] = useState<ServiceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { data, error: fetchError } = await createClient().from('clinic_doctors')
          .select('id,clinic_id,display_name,specialty,qualifications,experience_years,languages,search_terms,listed,user_id,clinics!inner(name,address,business_type)')
          .eq('clinic_id', clinicId).order('display_name')
        if (fetchError) throw fetchError
        if (!cancelled) setServices((data || []) as unknown as ServiceListing[])
      } catch (caught) {
        if (!cancelled) setError(caught instanceof Error ? caught.message : 'Business listings could not be loaded.')
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [clinicId])

  async function addService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('')
    const form = event.currentTarget
    const values = new FormData(form)
    try {
      const { data, error: insertError } = await createClient().from('clinic_doctors').insert({
        clinic_id: clinicId,
        display_name: String(values.get('name') || '').trim(),
        specialty: String(values.get('specialty') || '').trim(),
        qualifications: String(values.get('qualifications') || '').trim() || null,
        experience_years: String(values.get('experience') || '') ? Number(values.get('experience')) : null,
        languages: String(values.get('languages') || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 10),
        search_terms: String(values.get('searchTerms') || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 24),
        user_id: String(values.get('accountId') || '').trim() || null,
      }).select('id,clinic_id,display_name,specialty,qualifications,experience_years,languages,search_terms,listed,user_id,clinics!inner(name,address,business_type)').single()
      if (insertError) throw insertError
      setServices((items) => [...items, data as unknown as ServiceListing]); setMessage('Service listing published.'); form.reset()
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Service listing could not be saved.') }
    finally { setBusy(false) }
  }

  async function toggleListing(service: ServiceListing) {
    const listed = !service.listed
    const { error: updateError } = await createClient().from('clinic_doctors').update({ listed }).eq('id', service.id)
    if (updateError) return setError(updateError.message)
    setServices((items) => items.map((item) => item.id === service.id ? { ...item, listed } : item))
  }

  return <section className="surface doctor-manager"><div className="health-panel-heading"><div><p className="eyebrow">Business listings</p><h2>Team and services</h2></div></div>{error && <p className="form-message error" role="alert">{error}</p>}{message && <p className="form-message" role="status">{message}</p>}<form className="doctor-manager-form" onSubmit={addService}><label>Team member or service name<input name="name" required minLength={2} maxLength={100} /></label><label>Service category<input name="specialty" required minLength={2} maxLength={100} placeholder="For example, hair styling, repair, advising" /></label><label>Account ID for staff sign-in<input name="accountId" placeholder="Optional account UUID" /></label><label>Short service details<input name="qualifications" maxLength={200} placeholder="What customers can expect" /></label><label>Years of experience (optional)<input name="experience" type="number" min="0" max="70" /></label><label>Languages, separated by commas<input name="languages" placeholder="Hindi, English" /></label><label>Search tags, separated by commas<input name="searchTerms" placeholder="For example, laptop screen, haircut" /></label><button className="button button-primary" disabled={busy}>{busy ? 'Saving…' : 'Publish service'}</button></form><div className="health-list">{loading ? <p className="page-state">Loading business listings…</p> : services.map((service) => <article className="health-list-item" key={service.id}><div><h3>{service.display_name}</h3><p>{service.specialty} · {service.listed === false ? 'Hidden from directory' : 'Listed'}{service.user_id ? ' · Account linked' : ''}</p></div><button className="text-action" onClick={() => toggleListing(service)}>{service.listed === false ? 'Publish' : 'Hide listing'}</button></article>)}{!loading && services.length === 0 && <p className="empty-state">No services have been added for this business.</p>}</div></section>
}
