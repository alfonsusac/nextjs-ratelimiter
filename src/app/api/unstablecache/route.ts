import { unstable_cache } from "next/cache"

const cachedRandomize = unstable_cache(async () => {
  return Math.random()
},['firstcache'])
export async function GET() {
  // Rate Limit
  const random = await cachedRandomize()
  return Response.json({random})
}
export const dynamic = "force-dynamic"