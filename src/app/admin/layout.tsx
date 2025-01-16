import Sidebar from '../components/sidebar'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </div>
  )
}
