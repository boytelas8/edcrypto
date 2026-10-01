import { useEffect, useState } from "react"
import type { CoinInterface } from "../interfaces/Coin"
import { Link } from "react-router-dom"

const Coin = ({ id, image, name, symbol, current_price, price_change_percentage_24h }: CoinInterface) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    

    // 1. Sincronizar el estado inicial con LocalStorage al cargar el componente
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        setIsFavorite(favorites.includes(id))
    }, [id])

    // 2. Función corregida para agregar o quitar de favoritos
    const handleFavorites = () => { 
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") 
        
        let updatedFavorites: string[] // Ajusta el tipo (string o number) según sea tu ID

        if (isFavorite) {
            // Si ya es favorito, lo filtramos para quitarlo
            updatedFavorites = favorites.filter((favId: any) => favId !== id)
        } else {
            // Si no es favorito, lo agregamos
            updatedFavorites = [...favorites, id]
        }
        
        setIsFavorite(!isFavorite) 
        //localStorage.setItem("favorites", JSON.stringify([...favorites, id])) 
        
        // CORRECCIÓN: Guardamos el arreglo correcto (updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)) 
    }

    // 1. Validamos si el valor es completamente nulo o no disponible
    const hasChangeData = price_change_percentage_24h !== null && price_change_percentage_24h !== undefined;

    // 2. Definimos el color del texto basado en el valor real
    const textColor = !hasChangeData 
        ? 'text-gray-500' 
        : price_change_percentage_24h >= 0 
            ? 'text-green-600' 
            : 'text-red-600';
            

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            {/* 1. Celda de Orden */}
            <td className="px-6 py-4 text-sm text-gray-600">{id}</td>

            {/* 2. Celda de la Imagen (Separada para coincidir con la cabecera) */}
            {/* <td className="p-3">
                <img
                    src={image}
                    alt={symbol}
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                />
            </td>
 */}
            {/* 3. Celda del Nombre y Símbolo */}
            <td className="px-6 py-4">
                <Link to={`/coin/${id}`} className="flex items-center gap-3">
                    <img
                        src={image}
                        alt={symbol}
                        className="w-8 h-8 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-semibold text-gray-800">{name}</span>
                    <span className="text-xs text-gray-400 uppercase">{symbol}</span>
                </Link>
            </td>

            {/* 4. Celda del Precio actual */}
            <td className="p-3 text-gray-800 font-medium">
                ${(current_price ?? 0).toLocaleString()} dlls
            </td>

            {/* 5. Celda del Cambio de precio en 24h */}
            {/* <td className={`p-3 font-medium ${(price_change_percentage_24h ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}{(price_change_percentage_24h ?? 0).toFixed(2)}%
            </td> */}

            {/* 5. Celda del Cambio de precio en 24h (Corregida) */}
            <td className={`p-3 font-medium ${textColor}`}>
                {hasChangeData ? (
                    <>
                        {price_change_percentage_24h >= 0 ? '+' : ''}
                        {price_change_percentage_24h.toFixed(2)}%
                    </>
                ) : (
                    'N/A'
                )}
            </td>

            {/* 6. Celda de Favoritos */}
            <td className="p-3">
                <button
                    onClick={handleFavorites}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isFavorite
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                >
                    {isFavorite ? "Quitar" : "Favorito"}
                </button>
            </td>
        </tr>
    )
}

export default Coin;
