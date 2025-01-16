// app/types/index.ts
export interface Vehicle {
  id: string | number
  type: 'motor' | 'mobil'
  plateNumber: string
  floor: number
  entryTime: string | Date
}

export type User = {
  id: string
  username: string
  password: string
  role: 'admin' | 'cashier'
}
