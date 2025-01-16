export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4">
      <nav className="space-y-2">
        <a
          href="/admin"
          className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
        >
          Daftar Kendaraan
        </a>
      </nav>
    </div>
  )
}
