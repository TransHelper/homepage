export function useAvatarUrl(github: string | undefined) {
  if (!github) return undefined
  return `/api/avatar/${github}`
}
