export function GET() {
  return Response.json(Date.now() + (20 * 1000))
}

export const revalidate = 10