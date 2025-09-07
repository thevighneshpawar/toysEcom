// src/pages/HomePage.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { productAPI } from "../api/api"
import {
    Search, Star, ShoppingCart, Loader, ArrowRight,
    Sparkles, Gift, Heart, Zap, TrendingUp, Crown
} from "lucide-react"
import { useCart } from "../context/CartProvider"
import { useAuth } from "../context/AuthContext"

const HomePage = () => {
    const [bestsellers, setBestsellers] = useState([])
    const [search, setSearch] = useState("")
    const [addingToCart, setAddingToCart] = useState({})
    const [searchFocused, setSearchFocused] = useState(false)
    const [hoveredProduct, setHoveredProduct] = useState(null)
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const res = await productAPI.getBestsellers()
                setBestsellers(res.data.products || [])
            } catch (err) {
                console.error("Failed to fetch bestsellers:", err)
            }
        }
        fetchBestsellers()
    }, [])

    const handleAddToCart = async (productId) => {
        if (!user) {
            navigate('/signin')
            return
        }

        setAddingToCart(prev => ({ ...prev, [productId]: true }))
        try {
            const result = await addToCart(productId, 1)
        } catch (error) {
            // Error handling in CartProvider
        } finally {
            setAddingToCart(prev => ({ ...prev, [productId]: false }))
        }
    }

    const handleSearch = e => {
        e.preventDefault()
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search)}`)
        }
    }

    const categories = [
        {
            name: "Soft Toys",
            emoji: "🧸",
            color: "from-pink-400 to-rose-500",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            description: "Cuddly friends",
            value: "softtoys"
        },
        {
            name: "Hard Toys",
            emoji: "🦸",
            color: "from-blue-400 to-indigo-500",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
            description: "Hero adventures",
            value: "hardtoys"
        },

        {
            name: "kids Toys",
            emoji: "👸",
            color: "from-pink-400 to-purple-500",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
            description: "Magical companions",
            value: "kidstoys"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-36 h-36 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-32 w-28 h-28 bg-yellow-300/25 rounded-full blur-xl animate-pulse delay-700"></div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 animate-float">
                    <Gift className="w-8 h-8 text-pink-300/40" />
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float-delay">
                    <Star className="w-6 h-6 text-yellow-300/50" />
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-float">
                    <Heart className="w-7 h-7 text-red-300/40" />
                </div>
                <div className="absolute top-2/3 right-1/5 animate-float-delay">
                    <Sparkles className="w-6 h-6 text-purple-300/50" />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative text-center py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Main Title */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl shadow-xl flex items-center justify-center transform rotate-12 animate-bounce">
                                <span className="text-3xl">🎠</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 tracking-tight">
                                ToyLand
                            </h1>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-12 animate-bounce delay-300">
                                <span className="text-3xl">🎪</span>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Magic</span> Meets
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Play!</span>
                        </h2>

                        <p className="text-xl text-gray-600 font-semibold max-w-2xl mx-auto leading-relaxed">
                            Discover amazing toys that spark imagination, create memories, and bring endless joy to every child! ✨
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <div className={`relative group transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''
                            }`}>
                            <div className={`absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${searchFocused ? 'opacity-60' : ''
                                }`}></div>

                            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                                <div className="flex items-center p-2">
                                    <div className="flex-1 flex items-center px-4">
                                        <Search className={`w-6 h-6 transition-colors duration-300 ${searchFocused ? 'text-purple-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type="text"
                                            placeholder="What magical toy are you looking for today? 🎁"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onFocus={() => setSearchFocused(true)}
                                            onBlur={() => setSearchFocused(false)}
                                            className="ml-4 flex-1 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none font-semibold text-lg"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center space-x-2"
                                    >
                                        <span>Find Toys</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Categories Section */}
            <section className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-3 md:mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                            <div className="flex items-center justify-center space-x-2">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-500" />
                                <span>Explore Our</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Amazing</span>
                                <span>Categories</span>
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-500" />
                            </div>
                        </h2>
                        <p className="text-gray-600 font-semibold text-base sm:text-lg max-w-2xl mx-auto">
                            Every category is packed with wonder and excitement! 🌟
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((cat, index) => (
                            <div
                                key={cat.name}
                                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                onClick={() => navigate(`/category/${cat.value}`)}
                            >
                                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    {/* Category Image */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                        {/* Emoji Badge */}
                                        <div className="absolute top-3 right-3 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-2xl">{cat.emoji}</span>
                                        </div>
                                    </div>

                                    {/* Category Info */}
                                    <div className="p-4">
                                        <h3 className="font-black text-gray-800 text-center mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300">
                                            {cat.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 text-center font-semibold">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bestsellers Section */}
            <section className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-800 mb-4 flex items-center justify-center space-x-3">
                            <Crown className="w-8 h-8 text-yellow-500" />
                            <span>Our</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Bestsellers</span>
                            <TrendingUp className="w-8 h-8 text-green-500" />
                        </h2>
                        <p className="text-gray-600 font-semibold text-lg">
                            The most loved toys by kids everywhere! 🏆
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {bestsellers.length > 0 ? (
                            bestsellers.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    onMouseEnter={() => setHoveredProduct(product._id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    {/* Product Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={product.image[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all duration-300"></div>

                                        {/* Bestseller Badge */}
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>Bestseller</span>
                                        </div>

                                        {/* Heart Icon */}
                                        <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                                ₹{product.price}
                                            </span>

                                            {/* Rating */}
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                                <span className="text-sm text-gray-500 font-semibold">4.8</span>
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleAddToCart(product._id)
                                            }}
                                            disabled={addingToCart[product._id]}
                                            className={`w-full group relative overflow-hidden rounded-2xl py-3 px-6 font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${hoveredProduct === product._id
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                                                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-pink-500 hover:to-purple-600'
                                                }`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                            <div className="relative flex items-center justify-center space-x-2">
                                                {addingToCart[product._id] ? (
                                                    <>
                                                        <Loader className="w-5 h-5 animate-spin" />
                                                        <span>Adding Magic...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingCart className="w-5 h-5" />
                                                        <span>Add to Cart</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Gift className="w-16 h-16 text-white" />
                                </div>
                                <p className="text-xl font-bold text-gray-600 mb-2">No bestsellers found at the moment</p>
                                <p className="text-gray-500 font-semibold">But don't worry, amazing toys are coming soon! 🎈</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-180deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delay {
                    animation: float-delay 5s ease-in-out infinite 2s;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default HomePage