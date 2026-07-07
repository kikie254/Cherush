'use client'

export function RetryButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
    >
      Try Again
    </button>
  )
}
