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
  console.log("RateLimiting")
  const header = headers()
  console.log(header)
  // console.log(JSON.stringify(header, null, 1))


  const referer = headers().get('referer')

  const proto = headers().get("x-forwarded-proto")
  const host = headers().get('host')
  new URL("https://nextjs-ratelimiter.vercel.app")
  const hosturl = new URL(proto + "://" + host ?? "")
  console.log(hosturl.toString());
  console.log(proto)
  console.log(`${hosturl.toString()}api/ratelimit/${encodeURIComponent(id)}`);

  // return Date.now()
  return await (await fetch(`${hosturl.toString()}api/ratelimit/${encodeURIComponent(id)}`)).json()
}