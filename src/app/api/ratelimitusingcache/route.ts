import { ratelimit } from "@/app/ratelimit"


export async function GET() {
  // Rate Limit
  const rateLimitedUntil = await ratelimit()

  // Check if ratelimited
  console.log("RateLimitUntil: " + rateLimitedUntil)
  console.log("Now:            " + Date.now())
  const success = Date.now() > rateLimitedUntil

  // Do stuff
  if (success) {
    return Response.json("ok")
  }
  else {
    const seconds = (rateLimitedUntil - Date.now()) / 1000 | 0
    return Response.json(`try again in ${seconds} seconds`)
  }
}

export const dynamic = "force-dynamic"