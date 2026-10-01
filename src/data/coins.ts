//importo la interface Coin.ts
import type { CoinInterface } from "../interfaces/Coin"

const coins: CoinInterface[] = [
    { id: "bitcoin", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033578", name: "Bitcoin", symbol: "BTC", current_price: 100000, price_change_percentage_24h: 10, code: "BTC" },
    { id: "ethereum", image: "https://assets.coingecko.com/coins/images/2/large/ethereum.png?1547033578", name: "Ethereum", symbol: "ETH", current_price: 100000, price_change_percentage_24h: 10, code: "ETH" },
    { id: "litecoin", image: "https://assets.coingecko.com/coins/images/3/large/litecoin.png?1547033578", name: "Litecoin", symbol: "LTC", current_price: 100000, price_change_percentage_24h: 10, code: "LTC" },
    { id: "bitcoin-cash", image: "https://assets.coingecko.com/coins/images/4/large/bitcoin-cash.png?1547033578", name: "Bitcoin Cash", symbol: "BCH", current_price: 100000, price_change_percentage_24h: 10, code: "BCH" },
    { id: "ripple", image: "https://assets.coingecko.com/coins/images/5/large/ripple.png?1547033578", name: "Ripple", symbol: "XRP", current_price: 100000, price_change_percentage_24h: 10, code: "XRP" },
    { id: "bitcoin-sv", image: "https://assets.coingecko.com/coins/images/6/large/bitcoin-sv.png?1547033578", name: "Bitcoin SV", symbol: "BSV", current_price: 100000, price_change_percentage_24h: 10, code: "BSV" },
    { id: "bitcoin-cash-sv", image: "https://assets.coingecko.com/coins/images/7/large/bitcoin-cash-sv.png?1547033578", name: "Bitcoin Cash SV", symbol: "BCHSV", current_price: 100000, price_change_percentage_24h: 10, code: "BCHSV" }
]

export default coins;
