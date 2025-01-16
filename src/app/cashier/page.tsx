'use client'

import React, { useState, useEffect } from 'react'
import { Vehicle } from '../types'
import { LogOut, Car, Bike, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
export default function CashierDashboard() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehicle)
  const [plateNumber, setPlateNumber] = useState('')
  const [vehicleType, setVehicleType] = useState<'motor' | 'mobil'>('motor')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    fetchVehicles()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const fetchVehicles = async () => {
    const token = localStorage.getItem('token')
    await fetch('/api/vehicles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error('Error:', error))
  }

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()

    const floor = vehicleType === 'motor' ? 1 : 2
    const floorVehicles = vehicles.filter((v) => v.floor === floor)
    const maxCapacity = vehicleType === 'motor' ? 10 : 6

    if (floorVehicles.length >= maxCapacity) {
      alert('Lantai penuh!')
      return
    }

    const newVehicle: any = {
      type: vehicleType,
      plateNumber,
      floor,
      entryTime: new Date()
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token tidak ditemukan! Silakan login.')
      return
    }

    try {
      const response = await fetch('api/vehicles', {
        method: 'POST',
        body: JSON.stringify(newVehicle),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Pass the token here
        }
      })

      if (!response.ok) {
        throw new Error(`Unauthorized: ${response.statusText}`)
      }
      setPlateNumber('')
      setVehicles([...vehicles, newVehicle])
      await fetchVehicles()
    } catch (error) {
      console.error('Error adding vehicle:', error)
      alert('Gagal menambahkan kendaraan')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kasir Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Vehicle Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Tambah Kendaraan Baru
          </h2>
          <form onSubmit={handleAddVehicle} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nomor Plat
                </label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="Masukkan nomor plat"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Jenis Kendaraan
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) =>
                    setVehicleType(e.target.value as 'motor' | 'mobil')
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                >
                  <option value="motor">Motor</option>
                  <option value="mobil">Mobil</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
            >
              Tambah Kendaraan
            </button>
          </form>
        </div>

        {/* Vehicle Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Floor 1 - Motorcycles */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bike className="h-5 w-5 text-gray-900 dark:text-white" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Lantai 1 (Motor)
                  </h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {vehicles.filter((v) => v.floor === 1).length}/10
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles
                  .filter((v) => v?.floor === 1)
                  .map((vehicle) => (
                    <div
                      key={vehicle?.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {vehicle?.plateNumber}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(vehicle?.entryTime).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Floor 2 - Cars */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-gray-900 dark:text-white" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Lantai 2 (Mobil)
                  </h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {vehicles.filter((v) => v.floor === 2).length}/6
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles
                  .filter((v) => v?.floor === 2)
                  .map((vehicle) => (
                    <div
                      key={vehicle?.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {vehicle?.plateNumber}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(vehicle?.entryTime).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
