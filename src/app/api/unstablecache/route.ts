import { unstable_cache } from "next/cache"

export async function GET() {
  // Rate Limit
  const random = await unstable_cache(async ()=> {
    return Math.random()
  })()
  
  return Response.json(random)
}

export const dynamic = "force-dynamic"