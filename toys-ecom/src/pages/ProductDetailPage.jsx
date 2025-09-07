import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Truck, Shield,
    RotateCcw, Sparkles, Gift, Crown, Zap, Award, Clock, CheckCircle
} from 'lucide-react'
import { productAPI } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartProvider'

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart, loading: cartLoading } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [addingToCart, setAddingToCart] = useState(false)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [showImageZoom, setShowImageZoom] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productAPI.getProductById(id)
                if (res.data.success) {
                    setProduct(res.data.product)
                }
            } catch (error) {
                console.error('Failed to fetch product:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/signin')
            return
        }

        setAddingToCart(true)
        try {
            const result = await addToCart(product._id, quantity)
        } catch (error) {
            // Error handling in CartProvider
        } finally {
            setAddingToCart(false)
        }
    }

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl animate-pulse delay-500"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Gift className="w-16 h-16 text-pink-300/50 animate-bounce" />
                    </div>
                </div>

                <div className="text-center z-10">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-6"></div>
                        <Sparkles className="w-6 h-6 text-yellow-400 absolute top-2 right-2 animate-pulse" />
                    </div>
                    <p className="text-2xl font-bold text-gray-700 mb-2">Finding your perfect toy...</p>
                    <p className="text-gray-500 font-semibold">Almost there! ✨</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-32 left-32 w-24 h-24 bg-red-300/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-32 right-32 w-32 h-32 bg-purple-300/15 rounded-full blur-2xl animate-pulse delay-700"></div>
                </div>

                <div className="text-center z-10 p-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 transform rotate-12">
                        <Gift className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-4">Oops! Toy not found</h2>
                    <p className="text-gray-600 font-semibold mb-8">This magical toy seems to have disappeared! 🎪</p>
                    <button
                        onClick={() => navigate('/')}
                        className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span>Back to Toyland</span>
                    </button>
                </div>
            </div>
        )
    }

    const categoryColors = {
        'Soft Toys': 'from-pink-400 to-rose-500',
        'Action Figures': 'from-blue-400 to-indigo-500',
        'Educational Toys': 'from-green-400 to-emerald-500',
        'Board Games': 'from-purple-400 to-violet-500',
        'Building Blocks': 'from-orange-400 to-red-500',
        'Dolls & Accessories': 'from-pink-400 to-purple-500'
    }

    const features = [
        {
            icon: Truck,
            title: "Free Magic Delivery",
            subtitle: "On orders over ₹500",
            color: "from-green-400 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50"
        },
        {
            icon: Shield,
            title: "Super Safe & Secure",
            subtitle: "100% secure payment",
            color: "from-blue-400 to-indigo-500",
            bgColor: "from-blue-50 to-indigo-50"
        },
        {
            icon: RotateCcw,
            title: "Easy Peasy Returns",
            subtitle: "30-day happy guarantee",
            color: "from-orange-400 to-red-500",
            bgColor: "from-orange-50 to-red-50"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-40 h-40 bg-pink-300/15 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-60 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-purple-300/15 rounded-full blur-2xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-700"></div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/6 animate-float">
                    <Star className="w-6 h-6 text-yellow-300/40" />
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float-delay">
                    <Sparkles className="w-5 h-5 text-pink-300/50" />
                </div>
                <div className="absolute bottom-1/3 left-1/5 animate-float">
                    <Heart className="w-7 h-7 text-red-300/40" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">

                {/* Enhanced Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-8 transition-all duration-300 p-3 rounded-2xl hover:bg-white/50 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-bold">Back to exploring</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Enhanced Product Images */}
                    <div className="space-y-6">
                        {/* Main Image with Enhanced Design */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                                <img
                                    src={product.image[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                                    onClick={() => setShowImageZoom(true)}
                                />

                                {/* Image overlay badges */}
                                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                                        <Crown className="w-4 h-4" />
                                        <span>Bestseller</span>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>In Stock</span>
                                    </div>
                                </div>

                                {/* Wishlist button on image */}
                                <button
                                    onClick={toggleWishlist}
                                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                                >
                                    <Heart className={`w-6 h-6 transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-red-400'
                                        }`} />
                                </button>

                                {/* Zoom indicator */}
                                <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Click to zoom
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Thumbnail Images */}
                        {product.image.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.image.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`group aspect-square rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-110 ${selectedImage === index
                                                ? 'ring-4 ring-purple-400 shadow-xl scale-105'
                                                : 'ring-2 ring-gray-200 hover:ring-purple-300 shadow-lg'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Enhanced Product Info */}
                    <div className="space-y-8">

                        {/* Title Section with Enhanced Design */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating and Reviews */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 transition-colors duration-300 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-bold text-gray-600">(4.8)</span>
                                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    142 Happy Reviews ✨
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Price Section */}
                        <div className="flex items-center space-x-4">
                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                ₹{product.price}
                            </span>
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-2xl font-bold text-lg flex items-center space-x-1">
                                <Zap className="w-5 h-5" />
                                <span>Great Deal!</span>
                            </div>
                        </div>

                        {/* Enhanced Description */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
                            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center space-x-2">
                                <Gift className="w-6 h-6 text-purple-500" />
                                <span>About This Amazing Toy</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed font-semibold text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Enhanced Categories */}
                        <div className="flex items-center flex-wrap gap-3">
                            <span className="text-lg font-bold text-gray-700">Categories:</span>
                            <div className={`px-4 py-2 bg-gradient-to-r ${categoryColors[product.category] || 'from-gray-400 to-gray-500'} text-white rounded-2xl font-bold shadow-lg flex items-center space-x-1`}>
                                <Award className="w-4 h-4" />
                                <span>{product.category}</span>
                            </div>
                            {product.subCategory && (
                                <div className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-2xl font-bold shadow-lg">
                                    {product.subCategory}
                                </div>
                            )}
                        </div>

                        {/* Enhanced Quantity Selector */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-gray-700 flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-green-500" />
                                    <span>Choose Quantity:</span>
                                </span>
                                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                    Only a few left! 🔥
                                </div>
                            </div>
                            <div className="flex items-center justify-center space-x-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-14 h-14 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
                                >
                                    <Minus className="w-6 h-6" />
                                </button>

                                <div className="bg-white rounded-2xl shadow-lg px-8 py-4 border-4 border-purple-200">
                                    <span className="text-3xl font-black text-gray-800">{quantity}</span>
                                </div>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart}
                                className="flex-1 group relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white font-black text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                <div className="relative flex items-center justify-center space-x-3">
                                    {addingToCart ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Adding Magic...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-6 h-6" />
                                            <span>Add to Cart</span>
                                            <Sparkles className="w-5 h-5" />
                                        </>
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={toggleWishlist}
                                className={`p-4 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 ${isWishlisted
                                        ? 'bg-gradient-to-r from-red-400 to-pink-500 border-red-300 text-white'
                                        : 'bg-white/60 backdrop-blur-sm border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                                    }`}
                            >
                                <Heart className={`w-8 h-8 transition-all duration-300 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Enhanced Features Section */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
                            <h3 className="text-xl font-black text-gray-800 mb-6 text-center flex items-center justify-center space-x-2">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                <span>Why You'll Love This Toy</span>
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className={`group p-4 bg-gradient-to-br ${feature.bgColor} rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-black text-gray-800">{feature.title}</div>
                                                <div className="text-sm text-gray-600 font-semibold">{feature.subtitle}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(180deg); }
                }
                
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(-180deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delay {
                    animation: float-delay 5s ease-in-out infinite 2s;
                }
            `}</style>
        </div>
    )
}

export default ProductDetailPage