export function unflatten(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.')

    let current = result
    parts.forEach((part, idx) => {
      const isLast = idx === parts.length - 1
      if (isLast) {
        current[part] = value
      } else {
        if (!(part in current)) {
          current[part] = {}
        }
        current = current[part]
      }
    })
  }

  return result
}
