export function GET() {
  console.log("Running ratelimit")
  return Response.json(Date.now() + (10 * 1000))
}

export const revalidate = 10