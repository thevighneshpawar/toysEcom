import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, ArrowLeft, Eye, Calendar, MapPin, CreditCard, Truck, Clock, CheckCircle, XCircle, Sparkles, Gift, RefreshCw, Star } from 'lucide-react'
import { orderAPI } from '../api/api'
import { useAuth } from '../context/AuthContext'

const OrdersPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchOrders()
        } else {
            navigate('/signin')
        }
    }, [user, navigate])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await orderAPI.getUserOrders()
            if (res.data.success) {
                setOrders(res.data.orders || [])
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending':
                return {
                    bg: 'bg-gradient-to-r from-yellow-100 to-orange-100',
                    text: 'text-yellow-800',
                    icon: <Clock size={16} className="text-yellow-600" />,
                    emoji: '⏳'
                }
            case 'confirmed':
                return {
                    bg: 'bg-gradient-to-r from-blue-100 to-indigo-100',
                    text: 'text-blue-800',
                    icon: <CheckCircle size={16} className="text-blue-600" />,
                    emoji: '✅'
                }
            case 'shipped':
                return {
                    bg: 'bg-gradient-to-r from-purple-100 to-pink-100',
                    text: 'text-purple-800',
                    icon: <Truck size={16} className="text-purple-600" />,
                    emoji: '🚚'
                }
            case 'delivered':
                return {
                    bg: 'bg-gradient-to-r from-green-100 to-emerald-100',
                    text: 'text-green-800',
                    icon: <Gift size={16} className="text-green-600" />,
                    emoji: '🎉'
                }
            case 'cancelled':
                return {
                    bg: 'bg-gradient-to-r from-red-100 to-pink-100',
                    text: 'text-red-800',
                    icon: <XCircle size={16} className="text-red-600" />,
                    emoji: '❌'
                }
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-100 to-slate-100',
                    text: 'text-gray-800',
                    icon: <Package size={16} className="text-gray-600" />,
                    emoji: '📦'
                }
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getOrderEmoji = (items) => {
        if (items.length === 1) return '🧸'
        if (items.length === 2) return '🎮'
        if (items.length >= 3) return '🎁'
        return '📦'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-pink-200 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl">📦</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
            {/* Floating decoration elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-3xl animate-bounce" style={{ animationDelay: '0s' }}>📦</div>
                <div className="absolute top-40 right-20 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🚚</div>
                <div className="absolute top-60 left-1/4 text-3xl animate-bounce" style={{ animationDelay: '2s' }}>🎁</div>
                <div className="absolute bottom-40 right-10 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
                <div className="absolute bottom-60 left-20 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>🏆</div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-pink-600 transition-all duration-300 px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Home</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Package size={36} className="text-pink-600" />
                            <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                My Adventures
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Track your magical toy deliveries! 🎪
                            </p>
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    /* No Orders */
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-8">
                            <div className="text-8xl animate-bounce">📦</div>
                            <div className="absolute -top-4 -right-4 text-3xl animate-spin">✨</div>
                            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🎈</div>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            No adventures yet!
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Start your toy collecting journey today! 🚀
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                        >
                            <span className="relative z-10">Begin Adventure! 🎮</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    </div>
                ) : (
                    /* Orders List */
                    <div className="space-y-6">
                        {orders.map((order, index) => {
                            const statusStyles = getStatusStyles(order.status)
                            return (
                                <div
                                    key={order._id}
                                    className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 hover:border-pink-200 transform hover:-translate-y-1"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animation: 'slideInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    {/* Order Header */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
                                                <div className="text-2xl">{getOrderEmoji(order.items)}</div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                    Order #{order._id.slice(-8).toUpperCase()}
                                                </h3>
                                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                                    <Calendar size={16} className="text-pink-500" />
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${statusStyles.bg} ${statusStyles.text} font-bold shadow-inner`}>
                                                {statusStyles.icon}
                                                <span>{statusStyles.emoji} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                    ₹{order.totalAmount}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-3 mb-6">
                                        {order.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 hover:border-pink-200 transition-all duration-300">
                                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                                    <img
                                                        src={item.image[0]}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                                                        {item.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs font-bold rounded-full">
                                                            {item.category}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={12} className="text-yellow-400 fill-current" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600 font-medium">
                                                            Qty: <span className="bg-white px-2 py-1 rounded-lg">{item.quantity}</span>
                                                        </span>
                                                        <span className="font-bold text-pink-600 text-lg">₹{item.price * item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Details */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t-2 border-dashed border-pink-200">
                                        {/* Shipping Address */}
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                                                    <MapPin size={18} className="text-blue-600" />
                                                </div>
                                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    Delivery Address 🏠
                                                </span>
                                            </h4>
                                            <div className="text-sm text-gray-700 space-y-1 bg-white/50 p-3 rounded-xl">
                                                <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                                <p>{order.shippingAddress.address}</p>
                                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                                <p className="mt-2 flex items-center gap-2">
                                                    <span className="text-lg">📞</span>
                                                    {order.shippingAddress.phone}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                                                    <CreditCard size={18} className="text-green-600" />
                                                </div>
                                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                    Payment Details 💳
                                                </span>
                                            </h4>
                                            <div className="text-sm text-gray-700 space-y-2 bg-white/50 p-3 rounded-xl">
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium">Method:</span>
                                                    <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-xs font-bold">
                                                        {order.paymentMethod === 'cod' ? '💰 Cash on Delivery' : '💳 Online Payment'}
                                                    </span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="font-medium">Status:</span>
                                                    <span className="text-green-600 font-bold">{order.paymentStatus || 'Pending'} ✅</span>
                                                </p>
                                                <p className="flex items-center justify-between pt-2 border-t border-green-200">
                                                    <span className="font-bold">Total Paid:</span>
                                                    <span className="text-lg font-bold text-green-600">₹{order.totalAmount}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex flex-wrap justify-end gap-3 mt-6 pt-6 border-t-2 border-dashed border-pink-200">
                                        <button
                                            onClick={() => navigate(`/product/${order.items[0]?.productId}`)}
                                            className="group flex items-center gap-2 px-4 py-2 border-2 border-pink-200 text-pink-700 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 font-medium"
                                        >
                                            <Eye size={16} className="group-hover:scale-110 transition-transform duration-200" />
                                            View Product 👁️
                                        </button>
                                        {order.status === 'delivered' && (
                                            <button className="group flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold hover:scale-105 shadow-lg hover:shadow-xl">
                                                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                                Order Again! 🔄
                                            </button>
                                        )}
                                        {order.status === 'shipped' && (
                                            <button className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold hover:scale-105 shadow-lg hover:shadow-xl">
                                                <Truck size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                Track Order 📍
                                            </button>
                                        )}
                                    </div>

                                    {/* Celebration for delivered orders */}
                                    {order.status === 'delivered' && (
                                        <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-2 border-green-300">
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">🎉 🎊 🥳</div>
                                                <p className="text-green-800 font-bold">
                                                    Woohoo! Your toys have arrived safely! Hope you're having amazing adventures!
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
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

export default OrdersPage