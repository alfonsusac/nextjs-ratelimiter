import { unstable_cache } from "next/cache"

export const ratelimit = unstable_cache(async () => {
  console.log("Applying Ratelimit...")
  const rateLimitUntil = Date.now() + (20 * 1000)
  return rateLimitUntil
}, [], {
  revalidate: 20,
  
})