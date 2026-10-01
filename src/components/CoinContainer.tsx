import { useEffect, useState } from "react"
import { URL_API, URL_COINS, URL_COINGECKO_API_KEY } from "../constants/api"
import { useParams } from "react-router-dom"
import Spinner from "./Spinner"
import { type CoinFullInterface } from "../interfaces/Coin"


const formatUSD = (n: number | null | undefined) => {
    if (n === null || n === undefined) return "N/A"
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
    if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`
    return `$${n.toFixed(2)}`
}

const formatCoin = (n: number | null | undefined) => {
    if (n === null || n === undefined) return "N/A"
    if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`
    if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
    if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`
    return n.toLocaleString()
}

// Nota: se eliminó formatDate ya que no se usaba en el componente anterior

const CoinContainer = () => {
    const [coin, setCoin] = useState<CoinFullInterface | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        fetch(`${URL_API}/${URL_COINS}&x_cg_demo_api_key=${URL_COINGECKO_API_KEY}&ids=${id}`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo obtener la moneda")
                return res.json()
            })
            .then(data => {
                setCoin(data[0] || null)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                console.error("Error al obtener los datos de la moneda.")
                setLoading(false)
            })
    }, [id])

    if (loading) return <Spinner />
    if (error) return <div className="text-center py-20 text-red-500 font-medium">{error}</div>
    if (!coin) return <div className="text-center py-20 text-gray-500">Moneda no encontrada</div>

    // Lógica segura para el cambio de precio (Evita romper con null)
    const pct = coin.price_change_percentage_24h
    const hasPriceChange = pct !== null && pct !== undefined
    const positive = hasPriceChange && pct >= 0

    // Lógica segura para el cambio de market cap
    const mcPct = coin.market_cap_change_percentage_24h
    const hasMarketCapChange = mcPct !== null && mcPct !== undefined
    const mcPositive = hasMarketCapChange && mcPct >= 0

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
                <img src={coin.image} alt={coin.name} className="w-16 h-16 rounded-full shadow-md" />
                <div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <h1 className="text-3xl font-bold text-gray-800">{coin.name}</h1>
                        <span className="text-lg text-gray-400 uppercase font-mono tracking-wider">{coin.symbol}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                            #{coin.market_cap_rank ?? "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Precio principal */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <p className="text-sm text-gray-500 mb-1">Precio actual</p>
                <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-bold text-gray-800">
                        {coin.current_price !== null && coin.current_price !== undefined
                            ? `$${coin.current_price.toLocaleString()}`
                            : "N/A"}
                    </span>

                    {/* Celda del Porcentaje Corregida */}
                    <span className={`text-lg font-semibold ${!hasPriceChange ? "text-gray-500" : positive ? "text-green-600" : "text-red-500"}`}>
                        {hasPriceChange ? `${positive ? "+" : ""}${pct.toFixed(2)}%` : "N/A"}
                    </span>

                    {/* Celda del Cambio Nominal Corregida */}
                    <span className={`text-sm ${!hasPriceChange ? "text-gray-400" : positive ? "text-green-600" : "text-red-500"}`}>
                        ({coin.price_change_24h !== null && coin.price_change_24h !== undefined
                            ? `${coin.price_change_24h >= 0 ? "+" : ""}${coin.price_change_24h.toFixed(2)} USD`
                            : "Sin cambios"})
                    </span>
                </div>
            </div>

            {/* Rango 24h + Volumen + Market Cap */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-md p-4">
                    <p className="text-xs text-gray-500 mb-1">Maximo 24h</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {coin.high_24h !== null && coin.high_24h !== undefined ? `$${coin.high_24h.toLocaleString()}` : "N/A"}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                    <p className="text-xs text-gray-500 mb-1">Minimo 24h</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {coin.low_24h !== null && coin.low_24h !== undefined ? `$${coin.low_24h.toLocaleString()}` : "N/A"}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                    <p className="text-xs text-gray-500 mb-1">Volumen 24h</p>
                    <p className="text-lg font-semibold text-gray-800">{formatUSD(coin.total_volume)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                    <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                    <p className="text-lg font-semibold text-gray-800">{formatUSD(coin.market_cap)}</p>
                </div>
            </div>

            {/* Market Cap Change Corregido */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Cambio market cap 24h</span>
                    <span className={`font-semibold ${!hasMarketCapChange ? "text-gray-500" : mcPositive ? "text-green-600" : "text-red-500"}`}>
                        {hasMarketCapChange ? `${mcPositive ? "+" : ""}${mcPct.toFixed(2)}%` : "N/A"}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>
                        {coin.market_cap_change_24h !== null && coin.market_cap_change_24h !== undefined
                            ? formatUSD(Math.abs(coin.market_cap_change_24h))
                            : "N/A"}
                    </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${!hasMarketCapChange ? "bg-gray-300" : mcPositive ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${hasMarketCapChange ? Math.min(Math.abs(mcPct) * 5, 100) : 0}%` }}
                    />
                </div>
            </div>

            {/* Fully Diluted Valuation Corregido */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Fully Diluted Valuation</span>
                    <span className="text-lg font-semibold text-gray-800">{formatUSD(coin.fully_diluted_valuation)}</span>
                </div>
            </div>

            {/* Supply Corregido */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Suministro</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">En circulacion</span>
                        <span className="font-medium text-gray-800">{formatCoin(coin.circulating_supply)} {coin.symbol?.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Total</span>
                        <span className="font-medium text-gray-800">{formatCoin(coin.total_supply)} {coin.symbol?.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Maximo</span>
                        <span className="font-medium text-gray-800">{formatCoin(coin.max_supply)} {coin.symbol?.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinContainer;
