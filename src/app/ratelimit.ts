import { headers } from "next/headers"

export const ratelimit = async (id: string) => {
  console.log("RateLimiting Function")
  // console.log(header)

  const proto = headers().get("x-forwarded-proto")
  const host = headers().get('host')
  const hosturl = new URL(proto + "://" + host ?? "")
  // console.log(hosturl.toString());
  // console.log(proto)
  // console.log(`${hosturl.toString()}api/ratelimit/${encodeURIComponent(id)}`);

  // return Date.now()
  const ratelimitid = encodeURIComponent(id)
  console.log(ratelimitid)
  return await (await fetch(`${hosturl.toString()}api/ratelimit/${encodeURIComponent(ratelimitid)}`)).json()
}