// app/admin/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Car, Bike, Moon, Sun } from 'lucide-react'
import { Vehicle } from '../types'
import { useEffect, useState } from 'react'

const vehicle: Vehicle[] = [
  {
    id: '1',
    type: 'motor',
    plateNumber: 'B 1234 ABC',
    floor: 1,
    entryTime: new Date('2025-01-16T08:00:00Z')
  },
  {
    id: '2',
    type: 'mobil',
    plateNumber: 'B 5678 DEF',
    floor: 2,
    entryTime: new Date('2025-01-16T09:00:00Z')
  },
  {
    id: '3',
    type: 'motor',
    plateNumber: 'B 9012 GHI',
    floor: 1,
    entryTime: new Date('2025-01-16T10:00:00Z')
  },
  {
    id: '4',
    type: 'mobil',
    plateNumber: 'B 3456 JKL',
    floor: 2,
    entryTime: new Date('2025-01-16T11:00:00Z')
  }
]

export default function AdminDashboard() {
  const router = useRouter()

  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  const handleLogout = () => {
    // Remove the token and user from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Redirect to the login page
    router.push('/')
  }
  const fetchVehicles = async () => {
    console.log('fetchVehicles admin')
    const token = localStorage.getItem('token')
    await fetch('/api/vehicles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setVehicles([...vehicle, ...data]))
      .catch((error) => console.error('Error:', error))
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  console.log(vehicles, 'vehicles')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
      <div>
        {/* Navigation and page content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Vehicle List
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                      Plate Number
                    </th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                      Vehicle Type
                    </th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                      Floor
                    </th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                      Entry Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles &&
                    vehicles.length > 0 &&
                    vehicles?.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-4 py-2 text-gray-900 dark:text-white">
                          {vehicle.plateNumber}
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-white">
                          {vehicle.type}
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-white">
                          {vehicle.floor}
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-white">
                          {new Date(vehicle.entryTime).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
