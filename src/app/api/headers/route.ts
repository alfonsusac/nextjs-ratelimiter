import { headers } from "next/headers"

export function GET(p: Request, params: any) {
  const res: any = {}
  headers().forEach((val, key, parent) => {
    res[key] = val
  })
  return Response.json(res)
}

export const dynamic = 'force-dynamic'