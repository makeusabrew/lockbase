export const uuidToKey = (key: string | null) => {
  if (!key) return ""
  const upper = key.replaceAll("-", "").toUpperCase()

  return [
    upper.substring(0, 4),
    upper.substring(4, 8),
    upper.substring(8, 12),
    upper.substring(12, 16),
    upper.substring(16, 20),
    upper.substring(20, 24),
    upper.substring(24, 28),
    upper.substring(28, 32),
  ].join("-")
}

export const keyToUuid = (key: string | null) => {
  if (!key) return ""

  const lower = key.replaceAll("-", "").toLowerCase()
  return [
    lower.substring(0, 8),
    lower.substring(8, 12),
    lower.substring(12, 16),
    lower.substring(16, 20),
    lower.substring(20, 32),
  ].join("-")
}
