import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="coins-list">
                    <Outlet /> {/*Para poner un componente dinamico */}
                </div>
            </main>
        </>
    )

}


export default Layout