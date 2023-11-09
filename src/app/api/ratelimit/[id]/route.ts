import { NextRequest } from "next/server"

export function GET(p: Request | NextRequest, params: any) {
  console.log("Running ratelimit/[id]")
  console.log(params)
  return Response.json(Date.now() + (10 * 1000))
}

export const revalidate = 10
export const dynamic = 'force-static'