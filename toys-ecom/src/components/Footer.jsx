import { Link } from "react-router-dom"
import { Heart, Mail, Phone, MapPin, Star, Gift, Truck, Shield, Clock, Sparkles } from "lucide-react"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const categoryLinks = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Soft Toys', path: '/category/Soft Toys', icon: '🧸' },
        { name: 'Action Figures', path: '/category/Action Figures', icon: '🦸' },
        { name: 'Educational Toys', path: '/category/Educational Toys', icon: '📚' },
    ]

    const serviceLinks = [
        { name: 'My Orders', path: '/orders', icon: '📦' },
        { name: 'My Profile', path: '/profile', icon: '👤' },
        { name: 'Shopping Cart', path: '/cart', icon: '🛒' },
        { name: 'Return Policy', path: '#', icon: '🔄' },
    ]

    const features = [
        { icon: Truck, text: 'Free shipping on orders over ₹500', color: 'from-green-400 to-emerald-500' },
        { icon: Shield, text: '30-day return policy', color: 'from-blue-400 to-indigo-500' },
        { icon: Clock, text: '24/7 Customer Support', color: 'from-purple-400 to-pink-500' },
        { icon: Gift, text: 'Gift wrapping available', color: 'from-orange-400 to-red-500' },
    ]

    return (
        <footer className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white  overflow-hidden">

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-32 right-20 w-32 h-32 bg-pink-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 bg-purple-300/10 rounded-full blur-2xl animate-pulse delay-700"></div>

                {/* Floating stars */}
                <div className="absolute top-20 left-1/3 animate-float">
                    <Star className="w-4 h-4 text-yellow-300/60" />
                </div>
                <div className="absolute top-40 right-1/3 animate-float-delay">
                    <Sparkles className="w-5 h-5 text-pink-300/60" />
                </div>
                <div className="absolute bottom-32 left-1/2 animate-float">
                    <Heart className="w-4 h-4 text-red-300/60" />
                </div>
            </div>

            {/* Features Section */}
            <div className="relative border-b border-white/10 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group flex items-center space-x-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
                                    <span className="text-3xl">🎠</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                                    ToyLand
                                </h3>
                                <p className="text-sm text-gray-300 font-semibold -mt-1">Magical Fun Awaits! ✨</p>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed font-medium">
                            Bringing joy and happiness to children everywhere with our amazing collection of toys.
                            Where every toy tells a story! 🌟
                        </p>

                        <div className="space-y-3">
                            <div className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                                    support@toyland.com
                                </span>
                            </div>
                            <div className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                                    +91 999999999999
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-black text-white mb-6 flex items-center space-x-2">
                            <span>🚀</span>
                            <span>Quick Links</span>
                        </h4>
                        <div className="space-y-3">
                            {categoryLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="group flex items-center space-x-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </span>
                                    <span className="font-semibold">{link.name}</span>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300 ml-auto"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-xl font-black text-white mb-6 flex items-center space-x-2">
                            <span>💫</span>
                            <span>Customer Service</span>
                        </h4>
                        <div className="space-y-3">
                            {serviceLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="group flex items-center space-x-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </span>
                                    <span className="font-semibold">{link.name}</span>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300 ml-auto"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-black text-white mb-6 flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Visit Our Store</span>
                        </h4>

                        <div className="space-y-4">
                            <div className="group p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Our Magic Store</p>
                                        <p className="text-gray-300 text-sm font-medium leading-relaxed">
                                            123 Toy Street, Play City, PC 123456
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-green-300">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold">Store Hours: 9 AM - 9 PM</span>
                                </div>
                                <div className="flex items-center space-x-2 text-blue-300">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold">Weekend Special Events! 🎪</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-white/20 py-6 bg-black/20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <span className="font-semibold">© {currentYear} ToyLand</span>
                            <span className="text-2xl animate-bounce">🎠</span>
                            <span className="font-semibold">Made with</span>
                            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="font-semibold">for kids everywhere</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-white/20">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-semibold text-gray-200">Trusted by 10,000+ families</span>
                                <Star className="w-4 h-4 text-yellow-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                }
                
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(-180deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delay {
                    animation: float-delay 4s ease-in-out infinite 2s;
                }
            `}</style>
        </footer>
    )
}

export default Footer