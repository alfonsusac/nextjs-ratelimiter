let x = 1

export async function GET() {
  // Rate Limit
  x += 1
  return Response.json({ x })
}
export const dynamic = "force-dynamic"