import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your-secret-key'

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1]

  console.log(token, 'toke')

  // Directly pass the request to the next handler without validation
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/vehicles/:path*']
}

//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET)
//     const requestHeaders = new Headers(request.headers)
//     requestHeaders.set('user', JSON.stringify(decoded))

//     return NextResponse.next({
//       request: {
//         headers: requestHeaders
//       }
//     })
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
//   }
