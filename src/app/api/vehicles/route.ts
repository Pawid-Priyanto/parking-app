import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your-secret-key'

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null // If verification fails, return null
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization')
  console.log(authHeader, 'authHeader')
  const token = authHeader?.split(' ')[1] // Extract token from Authorization header

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 }
    )
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const floor = searchParams.get('floor')

  const vehicles = floor
    ? db.vehicles.findByFloor(Number(floor))
    : db.vehicles.findAll()

  return NextResponse.json(vehicles)
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.split(' ')[1] // Extract token from Authorization header

  console.log(authHeader, 'authHeader')

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 }
    )
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const data = await req.json()
  const vehicle = db.vehicles.create(data)
  console.log(vehicle, 'vehicle')
  return NextResponse.json(vehicle)
}
