
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600 tracking-tight">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">Esta página se fue a exchanges</p>
      <p className="mt-2 text-gray-500 max-w-md">
        Al igual que tu altcoin favorito, esta ruta hizo rug pull y ya no existe.
      </p>
      <div className="mt-8 flex gap-2 text-sm font-mono text-gray-400">
        <span className="text-red-500">-100%</span>
        <span>en 24h</span>
      </div>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al mercado
      </a>
    </div>
  )
}

export default NotFound

