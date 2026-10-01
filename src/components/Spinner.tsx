const Spinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
                {/* Círculo exterior giratorio */}
                <div className="w-24 h-24 border-8 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Círculo intermedio giratorio inverso */}
                <div className="absolute top-2 left-2 w-20 h-20 border-8 border-gray-700 border-t-gray-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

                {/* Círculo interior giratorio */}
                <div className="absolute top-4 left-4 w-16 h-16 border-8 border-gray-700 border-t-blue-500 rounded-full animate-[spin_2s_linear_infinite]"></div>

                {/* Punto central pulsante */}
                <div className="absolute top-8 left-8 w-8 h-8 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    )
}

export default Spinner