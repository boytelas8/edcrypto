import { useEffect, useRef, useState } from "react"
import type { CoinInterface } from "../interfaces/Coin"
//import coins from "../data/coins"
import CoinsTable from "./CoinsTable"
import CoinsNotFound from "./CoinsNotFound"
import { URL_API, URL_COINGECKO_API_KEY, URL_COINS } from "../constants/api"
//import Coin from "./Coin"



const WatchListContainer = () => {
    const [coinsList, setCoinsList] = useState<CoinInterface[]>([]) //Estado para almacenar la lista de monedas
    const [coinsListOriginal, setCoinsListOriginal] = useState<CoinInterface[]>([]) //Estado para almacenar la lista de monedas
    const [loading, setloading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const searchInput = useRef<HTMLInputElement>(null) //Estado para referenciar el input de busqueda


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        fetch(`${URL_API}/${URL_COINS}&x_cg_demo_api_key=${URL_COINGECKO_API_KEY}&ids=${favorites.join(',')}`) // Fetch coins from CoinGecko API using the IDs stored in local storage, comma-separated string format. Changed IDs to use those stored in local storage. Added missing comma in favorites.join(','). Changed IDs to use those stored in local storage. Removed hard-coded IDs and used those stored in local storage instead. Changed IDs to use those stored in local storage.
        .then(response => response.json())
        .then(data => {
            setCoinsList(data)
            setCoinsListOriginal(data)
        })
        .catch(error => {
            console.error("Error al obtener los datos", error)
            setError("Error al obtener los datos")
        })
        .finally(() => {
            setloading(false)
        })
    }, [])

    const handleSearch = () => {
        //Funcion que se ejecuta cuando se cambia el valor del input de busqueda
        const searchValue = searchInput?.current?.value || ''
        const newCoinList = coinsListOriginal.filter(coin => coin.name.toLowerCase().includes(searchValue.toLowerCase()))
        setCoinsList(newCoinList)
    }

    const handleClearFavorites = () => {
        localStorage.removeItem("favorites")  // Remove favorites from local storage // Elimina los favoritos del almacenamiento local
        setCoinsList([]) // Set coins list to empty // Establece la lista de monedas como vacía.
        setCoinsListOriginal([]) // Set original coins list to empty // Establece la lista original de monedas como vacía.
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    <div className="absolute inset-4 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
                </div>
                <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">Cargando criptomonedas...</p>
            </div>
        )
    }

    if (error) {
        return <div className="text-red-500 test-center py-12">{error}</div>
    }

    return (
        <>
        <div className="flex justify-end">
            <button onClick={handleClearFavorites} className="bg-red-700 text-white px-4 py-2 rounded-lg mb-4">Limpiar favoritos</button>
        </div>
            <input
                type="text"
                placeholder="Busca una criptomoneda..."
                ref={searchInput}
                onChange={handleSearch}
                className="bg-white w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/**Renderizado condicional */}
            {coinsList.length > 0 ?
                <CoinsTable coins={coinsList} /> :
                <CoinsNotFound/>
                }

        </>
    )
}


export default WatchListContainer;
