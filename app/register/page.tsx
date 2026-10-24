import { AuthForm } from '@/components/auth-form'
import { SiteHeader } from '@/components/site-header'

export default function RegisterPage() {
  return <main className="shell"><SiteHeader /><section className="auth-page"><p className="eyebrow">Customer account</p><h1>Keep your place in line.</h1><p>Create an account to join a queue and follow your token as the line moves.</p><AuthForm mode="register" /></section></main>
}
