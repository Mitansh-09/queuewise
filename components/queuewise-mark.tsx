type QueueWiseMarkProps = { className?: string }

export function QueueWiseMark({ className }: QueueWiseMarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill="#f3f1e7" />
      <path d="M15 19h34M15 32h24M15 45h34" fill="none" stroke="#214b3d" strokeLinecap="round" strokeWidth="5" />
      <circle cx="47" cy="32" r="5.5" fill="#d67549" stroke="#f3f1e7" strokeWidth="2" />
    </svg>
  )
}
