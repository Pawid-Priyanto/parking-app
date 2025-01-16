// app/api/auth/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your-secret-key'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const user = db.users.findByUsername(username)

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h'
  })

  return NextResponse.json({ token, user })
}
