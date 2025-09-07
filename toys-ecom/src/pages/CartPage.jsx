import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Heart, Gift, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartProvider'

const CartPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { cartItems, loading, updateCartItem, removeFromCart, getCartTotal } = useCart()
    const [removingItems, setRemovingItems] = useState({})
    const [updatingItems, setUpdatingItems] = useState({})

    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    }, [user, navigate])

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return

        setUpdatingItems(prev => ({ ...prev, [productId]: true }))
        try {
            await updateCartItem(productId, newQuantity)
        } catch (error) {
            alert(error.message)
        } finally {
            setUpdatingItems(prev => ({ ...prev, [productId]: false }))
        }
    }

    const handleRemoveItem = async (productId) => {
        setRemovingItems(prev => ({ ...prev, [productId]: true }))
        try {
            await removeFromCart(productId)
        } catch (error) {
            alert(error.message)
            setRemovingItems(prev => ({ ...prev, [productId]: false }))
        }
    }

    const calculateSubtotal = () => {
        return getCartTotal()
    }

    const calculateShipping = () => {
        const subtotal = calculateSubtotal()
        return subtotal > 500 ? 0 : 50
    }

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-pink-200 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl">🧸</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
            {/* Floating decoration elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🎈</div>
                <div className="absolute top-40 right-20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>⭐</div>
                <div className="absolute top-60 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>🎨</div>
                <div className="absolute bottom-40 right-10 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🚀</div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-pink-600 transition-all duration-300 px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Keep Shopping</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShoppingCart size={36} className="text-pink-600" />
                            <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                My Cart
                            </h1>
                            <p className="text-gray-600 text-sm">
                                {cartItems.length} {cartItems.length === 1 ? 'toy' : 'toys'} ready to play! 🎮
                            </p>
                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                            <div className="text-8xl animate-bounce">🛒</div>
                            <div className="absolute -top-4 -right-4 text-3xl animate-spin">💫</div>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Your cart feels lonely!
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Let's fill it with amazing toys and endless fun! 🎈
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                        >
                            <span className="relative z-10">Start the Adventure! 🚀</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.productId}
                                    className={`group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 hover:border-pink-200 transform hover:-translate-y-1 ${removingItems[item.productId] ? 'opacity-50 scale-95' : ''}`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animation: 'slideInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <div className="relative w-28 h-28 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                                            <img
                                                src={item.image[0]}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors duration-300">
                                                    {item.name}
                                                </h3>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1">
                                                    <Heart size={18} className="hover:fill-current" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-full">
                                                    {item.category}
                                                </span>
                                                <span className="text-green-600 text-sm font-medium">✨ In Stock</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                    ₹{item.price}
                                                </div>
                                                <div className="text-sm text-gray-500">each</div>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl overflow-hidden shadow-inner">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                    disabled={loading || updatingItems[item.productId]}
                                                    className="p-3 hover:bg-pink-100 transition-all duration-300 disabled:opacity-50 group"
                                                >
                                                    <Minus size={16} className="text-pink-600 group-hover:scale-125 transition-transform duration-200" />
                                                </button>
                                                <div className="px-6 py-3 font-bold text-lg bg-white min-w-[60px] text-center">
                                                    {updatingItems[item.productId] ? (
                                                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                    ) : (
                                                        item.quantity
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                    disabled={loading || updatingItems[item.productId]}
                                                    className="p-3 hover:bg-purple-100 transition-all duration-300 disabled:opacity-50 group"
                                                >
                                                    <Plus size={16} className="text-purple-600 group-hover:scale-125 transition-transform duration-200" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveItem(item.productId)}
                                                disabled={loading || removingItems[item.productId]}
                                                className="group relative p-3 text-red-400 hover:text-red-600 transition-all duration-300 disabled:opacity-50 hover:bg-red-50 rounded-xl"
                                                title="Remove from cart"
                                            >
                                                {removingItems[item.productId] ? (
                                                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <Trash2 size={20} className="group-hover:scale-110 transition-transform duration-200" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 sticky top-8 border border-white/20">
                                <div className="flex items-center gap-2 mb-6">
                                    <Gift className="text-pink-600" size={24} />
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        Order Summary
                                    </h2>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                                        <span className="text-gray-600 font-medium">Subtotal</span>
                                        <span className="font-bold text-lg">₹{calculateSubtotal()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                                        <span className="text-gray-600 font-medium">Shipping</span>
                                        <span className="font-bold text-lg">
                                            {calculateShipping() === 0 ? (
                                                <span className="text-green-600">FREE! 🎉</span>
                                            ) : (
                                                `₹${calculateShipping()}`
                                            )}
                                        </span>
                                    </div>
                                    {calculateSubtotal() < 500 && (
                                        <div className="text-sm text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border-l-4 border-green-400 shadow-inner">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">🚚</span>
                                                <span className="font-medium">
                                                    Add ₹{500 - calculateSubtotal()} more for free shipping!
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="border-t-2 border-dashed border-pink-200 pt-4">
                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
                                            <span className="text-lg font-bold">Total</span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                ₹{calculateTotal()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="group relative w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <CreditCard size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Checkout Now! 🎁</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>

                                <div className="mt-6 text-center space-y-2">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">🔒</span>
                                        <span>Secure SSL Checkout</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                        <span>💳 All Cards</span>
                                        <span>📱 UPI</span>
                                        <span>💰 Wallets</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default CartPage