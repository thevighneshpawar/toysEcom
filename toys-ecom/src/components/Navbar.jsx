import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User, LogOut, LogIn, Home, Menu, X, Sparkles, Star, Heart } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartProvider"
import { useState, useEffect } from "react"

const Navbar = () => {
    const { user, logout } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const categoryData = [
        { name: 'Soft Toys', value: 'softtoys', emoji: '🧸', color: 'from-pink-400 to-rose-400' },
        { name: 'Hard Toys', value: 'hardtoys', emoji: '🦸', color: 'from-blue-400 to-indigo-400' },
        { name: 'Kids Toys', value: 'kidstoys', emoji: '📚', color: 'from-green-400 to-emerald-400' },
        { name: 'My orders', value: 'orders', emoji: '📚', color: 'from-green-400 to-emerald-400' },
    ]

    return (
        <>
            <nav className={`bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl bg-white/98' : ''
                }`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center space-x-2 group"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
                                    <span className="text-2xl">🎠</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
                                    <Sparkles className="w-2 h-2 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 group-hover:from-blue-500 group-hover:to-pink-500 transition-all duration-300">
                                    ToyLand
                                </h1>
                                <p className="text-xs text-gray-500 font-semibold -mt-1">Fun for Everyone!</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="group flex items-center space-x-2 font-bold text-gray-700 hover:text-pink-500 transition-all duration-300 relative"
                            >
                                <div className="p-2 rounded-xl group-hover:bg-gradient-to-r group-hover:from-pink-100 group-hover:to-purple-100 transition-all duration-300">
                                    <Home className="w-5 h-5" />
                                </div>
                                <span>Home</span>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                            </Link>

                            {categoryData.map((category) => (
                                <Link
                                    key={category.name}
                                    to={category.value == 'orders' ? `/orders` : `/category/${category.value}`}
                                    className="group flex items-center space-x-2 font-bold text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300 relative"
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                        {category.emoji}
                                    </span>
                                    <span>{category.name}</span>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">

                            {/* Shopping Cart */}
                            <button
                                onClick={() => navigate("/cart")}
                                className="group relative p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-110"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-pink-500 transition-colors duration-300" />
                                {cartCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </div>
                                )}
                                <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap">
                                    Shopping Cart
                                </div>
                            </button>

                            {/* User Actions */}
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    {/* Profile */}
                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="group flex items-center space-x-2 p-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="hidden md:block font-bold text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                                            {user.name ? user.name.split(' ')[0] : "Profile"}
                                        </span>
                                    </button>

                                    {/* Logout */}
                                    <button
                                        onClick={logout}
                                        className="group p-3 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-110"
                                    >
                                        <LogOut className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
                                        <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap">
                                            Sign Out
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Sign In</span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out rounded-2xl"></div>
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-2xl transform transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                    }`}>
                    <div className="p-6 space-y-4">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-gray-700">Home</span>
                        </Link>

                        {categoryData.map((category) => (
                            <Link
                                key={category.name}
                                to={`/category/${category.name === 'Educational' ? 'Educational Toys' : category.name}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
                            >
                                <div className={`p-2 bg-gradient-to-r ${category.color} rounded-xl`}>
                                    <span className="text-lg">{category.emoji}</span>
                                </div>
                                <span className="font-bold text-gray-700">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Navbar