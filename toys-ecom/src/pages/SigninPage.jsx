// src/pages/SigninPage.jsx
import { useState } from "react";
import { userAPI } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToyBrick, Mail, Lock, Eye, EyeOff, Sparkles, Heart } from "lucide-react";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await userAPI.Login({ email, password });

            if (res.data?.success) {
                login(res.data.user);
                navigate("/");
            } else {
                setError(res.data?.message || "Invalid credentials");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Sign-in failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br py-8 from-blue-400 via-purple-500 to-pink-500 p-4 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300/40 rounded-full blur-md animate-pulse delay-1000"></div>
                <div className="absolute bottom-10 right-10 w-36 h-36 bg-blue-300/25 rounded-full blur-xl animate-bounce delay-500"></div>

                {/* Floating toy elements */}
                <div className="absolute top-1/4 left-1/4 animate-float">
                    <Heart className="w-6 h-6 text-pink-300/60" />
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float-delay">
                    <Sparkles className="w-5 h-5 text-yellow-300/60" />
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-float">
                    <ToyBrick className="w-7 h-7 text-blue-300/60" />
                </div>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">

                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <ToyBrick className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                        </div>

                        <h1 className="mt-6 text-3xl font-black text-gray-800 tracking-tight">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-600 font-medium">
                            Ready for more <span className="text-pink-500 font-bold">fun</span>? Let's play! 🎈
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl animate-shake">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">!</span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                Email Address
                                <p className="text-sm">email:test@gmail.com</p>
                            </label>
                            <div className={`relative group transition-all duration-300 ${isEmailFocused ? 'transform scale-105' : ''
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${isEmailFocused ? 'opacity-60' : ''
                                    }`}></div>
                                <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex items-center px-4 py-3">
                                        <Mail className={`w-5 h-5 transition-colors duration-300 ${isEmailFocused ? 'text-pink-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type="email"
                                            className="ml-3 flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                                            placeholder="your-awesome-email@fun.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setIsEmailFocused(true)}
                                            onBlur={() => setIsEmailFocused(false)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                Password
                                <p className="text-sm">password:test@gmail.com</p>
                            </label>
                            <div className={`relative group transition-all duration-300 ${isPasswordFocused ? 'transform scale-105' : ''
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${isPasswordFocused ? 'opacity-60' : ''
                                    }`}></div>
                                <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex items-center px-4 py-3">
                                        <Lock className={`w-5 h-5 transition-colors duration-300 ${isPasswordFocused ? 'text-purple-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="ml-3 flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                                            placeholder="super-secret-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-3 text-white font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            <div className="relative flex items-center justify-center space-x-2">
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Getting Ready...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Let's Go Play!</span>
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 font-medium">
                            New to our toy world?{" "}
                            <Link
                                to="/register"
                                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 relative group"
                            >
                                Join the Fun!
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-180deg); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-float-delay {
                    animation: float-delay 3s ease-in-out infinite 1s;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default SigninPage;