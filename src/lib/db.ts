// lib/db.ts
import { Vehicle, User } from '@/app/types'

// Mock database
let vehicles: Vehicle[] = []
let users: User[] = []

// Initialize some users
users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    username: 'kasir',
    password: 'kasir123',
    role: 'cashier'
  }
]

export const db = {
  vehicles: {
    findAll: () => vehicles,
    findByFloor: (floor: number) => vehicles.filter((v) => v.floor === floor),
    create: (vehicle: Omit<Vehicle, 'id'>) => {
      const newVehicle = { ...vehicle, id: Math.random().toString() }
      vehicles.push(newVehicle)
      return newVehicle
    },
    delete: (id: string) => {
      vehicles = vehicles.filter((v) => v.id !== id)
    }
  },
  users: {
    findByUsername: (username: string) =>
      users.find((u) => u.username === username)
  }
}
