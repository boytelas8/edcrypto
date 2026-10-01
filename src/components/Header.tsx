import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg">
      {/* Logo */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Crypto
            <span className="text-blue-400">App</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-6">
          {/* space-x-6 ya controla el espacio entre los elementos de la lista */}
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Overview
          </Link>
          <Link to="/watchlist" className="hover:text-blue-600 transition-colors">
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
