const memory = new Map<string, { count: number; reset: number }>()

export async function guardRateLimit(key: string) {
  const now = Date.now()
  const current = memory.get(key)
  if (!current || current.reset < now) {
    memory.set(key, { count: 1, reset: now + 10 * 60 * 1000 })
    return { success: true, remaining: 7 }
  }
  if (current.count >= 8) {
    return { success: false, remaining: 0 }
  }
  current.count += 1
  return { success: true, remaining: 8 - current.count }
}
