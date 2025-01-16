'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null) // Reset any previous errors

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/cashier')
      }
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Welcome Back
      </h2>

      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Input Username"
            className="mt-2 block w-full px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Input Pass"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  )
}
