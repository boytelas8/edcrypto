import { useEffect } from "react"
import type { CoinInterface } from "../interfaces/Coin"
import Coin from "./Coin"

const CoinsTable = ({coins} : {coins: CoinInterface[]}) => {
    
    useEffect(() => {
        console.log("CoinsTable renderizado")
    })
    
    return (
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
                <tr className="hover:bg-gray-50 transition-colors hover:text-gray-900">
                    <th className="p-3 text-left">Orden</th>
                    <th className="p-3 text-left">Nombre</th>
                    <th className="p-3 text-left">Precio</th>
                    <th className="p-3 text-left">Cambio 24h</th>
                    <th className="p-3 text-left">Favorito</th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <Coin 
                        key={coin.id} // <-- ¡Ahora TypeScript ya no fallará aquí!
                        id={coin.id}
                        image={coin.image}
                        name={coin.name}
                        symbol={coin.symbol}
                        current_price={coin.current_price}
                        // Pasamos la propiedad corregida con guiones bajos
                        price_change_percentage_24h={coin.price_change_percentage_24h} 
                        code={coin.code}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default CoinsTable
