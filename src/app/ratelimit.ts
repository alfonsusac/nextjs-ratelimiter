import { unstable_cache } from "next/cache"
import { headers } from "next/headers"

// export const ratelimit = unstable_cache(async () => {
//   console.log("Applying Ratelimit...")
//   const rateLimitUntil = Date.now() + (20 * 1000)
//   return rateLimitUntil
// }, [], {
//   revalidate: 20,

// })

export const ratelimit = async (id: string) => {
  const url = headers().get('referer')
  const host = headers().get('host')
  const hosturl = new URL(host ?? "")
  console.log(hosturl.toString());
  console.log(hosturl.protocol)
  console.log(`${hosturl.toString()}/api/ratelimit/${encodeURIComponent(id)}`);

  // return Date.now()
  return await (await fetch(`http://localhost:3000/api/ratelimit`)).json()
}