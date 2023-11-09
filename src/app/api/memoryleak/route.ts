let obj: {[key: string]:string}  = {}

export function GET() {
  
  const len = Object.keys(obj).length + 1
  for (let i = 0; i < len ; i++){
    obj[crypto.randomUUID()] = crypto.randomUUID()
  }

  return Response.json({
    size: Object.keys(obj).length,
  })
}

export const dynamic = 'force-dynamic'