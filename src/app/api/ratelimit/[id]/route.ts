import { NextRequest } from "next/server"

export function GET(p: Request | NextRequest, params: any ) {
  return Response.json(Date.now() + (10 * 1000))
}

export const revalidate = 10
export const dynamic = 'force-static'