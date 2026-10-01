// function App() {
//   return (
//     <div>
//       <h1>Hola EDteam</h1>
//     </div>
//   )
// }

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import CoinsContainer from "./components/CoinsContainer"
import NotFound from "./components/NotFound"
import WatchListContainer from "./components/WatchListContainer"
import CoinContainer from "./components/CoinContainer"

//import Course from "./components/Course"
//import Header from "./components/Header"

const App = () => {

  //Recibo coins de ./data/coins y la guardo en la variable coinsList
  //coinsList es una variable de estado para poder actualizar la lista 
  //de monedas que se muestra en la pantalla.

  return (
    //Para manejar una sistema de rutas se utiliza BrowserRouter
    <BrowserRouter>
      <Routes> {/*Para manejar una lista de rutas se utiliza Routes */}
        <Route path="/" element={<Layout />}>
           <Route index element={<CoinsContainer />} />  {/*Página principal de monedas */}
           <Route path="*" element={<NotFound />} />
           <Route path="watchlist" element={<WatchListContainer />} />
           <Route path="coin/:id" element={<CoinContainer />} />
        </Route>
      </Routes> 
    </BrowserRouter>

  )

}

export default App