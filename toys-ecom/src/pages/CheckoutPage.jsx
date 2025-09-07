import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, MapPin, ArrowLeft, CheckCircle, Shield, Truck, RotateCcw, Gift, Sparkles, Heart, Star } from 'lucide-react'
import { cartAPI, orderAPI } from '../api/api'
import { useAuth } from '../context/AuthContext'

const CheckoutPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'cod'
    })

    useEffect(() => {
        if (user) {
            fetchCartItems()
            setFormData(prev => ({
                ...prev,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ').slice(1).join(' ') || '',
                email: user.email || ''
            }))
        } else {
            navigate('/signin')
        }
    }, [user, navigate])

    const fetchCartItems = async () => {
        setLoading(true)
        try {
            const res = await cartAPI.getCart()
            if (res.data.success) {
                setCartItems(res.data.cart?.items || [])
            }
        } catch (error) {
            console.error('Failed to fetch cart:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const calculateShipping = () => {
        const subtotal = calculateSubtotal()
        return subtotal > 500 ? 0 : 50
    }

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping()
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
            !formData.address || !formData.city || !formData.state || !formData.pincode) {
            alert('Please fill in all required fields')
            return
        }

        setPlacingOrder(true)
        try {
            const orderData = {
                items: cartItems,
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                paymentMethod: formData.paymentMethod,
                totalAmount: calculateTotal()
            }

            const res = await orderAPI.placeOrder(orderData)
            if (res.data.success) {
                alert('Order placed successfully!')
                navigate('/orders')
            }
        } catch (error) {
            console.error('Failed to place order:', error)
            alert('Failed to place order. Please try again.')
        } finally {
            setPlacingOrder(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-pink-200 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl">🎁</div>
                    </div>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-8xl mb-6 animate-bounce">🛒</div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Oops! Your cart is empty
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">Let's find some amazing toys for you! 🧸</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Start Shopping 🚀
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
            {/* Floating decoration elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-3xl animate-bounce" style={{ animationDelay: '0s' }}>🎪</div>
                <div className="absolute top-32 right-20 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎨</div>
                <div className="absolute top-80 left-1/4 text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>🚀</div>
                <div className="absolute bottom-60 right-16 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>🌟</div>
                <div className="absolute bottom-40 left-20 text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎁</div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/cart')}
                        className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-pink-600 transition-all duration-300 px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Cart</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <CreditCard size={36} className="text-pink-600" />
                            <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Almost There!
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Complete your magical toy adventure 🎪
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Shipping Form - Takes 2 columns on xl screens */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
                                    <MapPin size={24} className="text-pink-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        Delivery Address
                                    </h2>
                                    <p className="text-gray-600 text-sm">Where should we send your goodies? 📦</p>
                                </div>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Star size={16} className="text-pink-500" />
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50"
                                            placeholder="Your first name"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Star size={16} className="text-purple-500" />
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                                            placeholder="Your last name"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <Heart size={16} className="text-pink-500" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="text-lg">📞</span>
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                                        placeholder="+91 12345 67890"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="text-lg">🏠</span>
                                        Full Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50 resize-none"
                                        placeholder="Your complete address with landmarks"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="text-lg">🏙️</span>
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50"
                                            placeholder="Your city"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="text-lg">🗺️</span>
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                                            placeholder="Your state"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="text-lg">📮</span>
                                            Pincode *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50"
                                            placeholder="123456"
                                        />
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="pt-6 border-t-2 border-dashed border-pink-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                                            <CreditCard size={24} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                                Payment Method
                                            </h3>
                                            <p className="text-gray-600 text-sm">Choose how you'd like to pay 💳</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="group flex items-center gap-4 p-4 border-2 border-green-200 rounded-2xl cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === 'cod'}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-green-500 focus:ring-green-300"
                                            />
                                            <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
                                                <span className="text-2xl">💰</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800">Cash on Delivery</div>
                                                <div className="text-sm text-gray-600">Pay when your toys arrive at your door! 🚪</div>
                                            </div>
                                            <div className="px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                                                Popular ⭐
                                            </div>
                                        </label>
                                        <label className="group flex items-center gap-4 p-4 border-2 border-blue-200 rounded-2xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="razorpay"
                                                checked={formData.paymentMethod === 'razorpay'}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-500 focus:ring-blue-300"
                                            />
                                            <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                                                <span className="text-2xl">💳</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800">Online Payment</div>
                                                <div className="text-sm text-gray-600">Pay securely with cards, UPI, or wallets 🔒</div>
                                            </div>
                                            <div className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded-full">
                                                Instant ⚡
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary & Actions - Takes 1 column on xl screens */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20 sticky top-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Gift className="text-pink-600" size={24} />
                                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Order
                                </h2>
                            </div>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <div key={item.productId} className="flex gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                                        <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                            <img
                                                src={item.image[0]}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-600 mb-1">Qty: {item.quantity}</p>
                                            <p className="text-pink-600 font-bold text-sm">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t-2 border-dashed border-pink-200">
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                                    <span className="text-gray-600 font-medium">Subtotal</span>
                                    <span className="font-bold">₹{calculateSubtotal()}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                                    <span className="text-gray-600 font-medium">Shipping</span>
                                    <span className="font-bold">
                                        {calculateShipping() === 0 ? (
                                            <span className="text-green-600">FREE! 🎉</span>
                                        ) : (
                                            `₹${calculateShipping()}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-200">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        ₹{calculateTotal()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security Features */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="text-green-500" size={24} />
                                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    Safe & Secure
                                </h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                                    <span className="text-gray-700">SSL encrypted checkout 🔒</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <RotateCcw className="text-blue-500 flex-shrink-0" size={16} />
                                    <span className="text-gray-700">30-day return policy 🔄</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                    <Truck className="text-purple-500 flex-shrink-0" size={16} />
                                    <span className="text-gray-700">Free shipping on orders over ₹500 🚚</span>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            className="group relative w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100"
                        >
                            {placingOrder ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Magic... ✨</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    <Gift size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Complete Order! 🎉</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>

                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                <span className="text-green-500">🔒</span>
                                <span>Your data is safe with us</span>
                            </div>
                            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                <span>💳 All Cards</span>
                                <span>📱 UPI</span>
                                <span>💰 Wallets</span>
                                <span>💵 COD</span>
                            </div>
                        </div>
                    </div>
                </div>
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
                
                .group:hover input {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    )
}

export default CheckoutPage