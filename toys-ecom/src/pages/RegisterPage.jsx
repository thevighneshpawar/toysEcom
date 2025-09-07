// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Gift, Sparkles, Star, Heart, Rocket } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../api/api";

const RegisterPage = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focusedField, setFocusedField] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Calculate password strength for visual feedback
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 6) strength += 1;
            if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength += 1;
            if (value.match(/[0-9]/)) strength += 1;
            if (value.match(/[^a-zA-Z0-9]/)) strength += 1;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await userAPI.register(form);

            if (!data.data.success) {
                setError(data.msg || "Registration failed");
                return;
            }

            // Auto-login after registration
            login(data.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return 'from-red-400 to-red-500';
        if (passwordStrength === 2) return 'from-yellow-400 to-orange-500';
        if (passwordStrength === 3) return 'from-blue-400 to-indigo-500';
        return 'from-green-400 to-emerald-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return 'Weak';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    };

    return (
        <div className="min-h-screen py-8 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center relative overflow-hidden">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-32 right-32 w-40 h-40 bg-yellow-300/20 rounded-full blur-xl animate-bounce"></div>
                <div className="absolute bottom-32 left-32 w-32 h-32 bg-pink-300/30 rounded-full blur-lg animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300/15 rounded-full blur-2xl animate-bounce delay-700"></div>

                {/* Floating decorative elements */}
                <div className="absolute top-1/4 left-1/4 animate-float">
                    <Gift className="w-8 h-8 text-yellow-300/50" />
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float-delay">
                    <Star className="w-6 h-6 text-pink-300/50" />
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-float">
                    <Heart className="w-7 h-7 text-red-300/50" />
                </div>
                <div className="absolute top-2/3 right-1/3 animate-float-delay">
                    <Sparkles className="w-6 h-6 text-purple-300/50" />
                </div>
                <div className="absolute bottom-1/4 right-1/4 animate-float">
                    <Rocket className="w-7 h-7 text-blue-300/50" />
                </div>
            </div>

            {/* Main Registration Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <Gift className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-md">
                                <Star className="w-3 h-3 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">
                            Join the Fun!
                        </h1>
                        <p className="text-gray-600 font-semibold text-lg">
                            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500 font-black">magical</span> account 🌟
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Ready to explore amazing toys? Let's get started! 🎈
                            <p className="text-2xl text-green-400">if u are testing then go to sigin page u will get test credentails there</p>
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl animate-shake">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">!</span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-red-700 font-semibold">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                What's your awesome name?
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'name' ? 'transform scale-105' : ''
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-60' : ''
                                    }`}></div>
                                <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex items-center px-4 py-3">
                                        <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-emerald-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Captain Awesome (your real name works too!)"
                                            className="ml-3 flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-semibold"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                Your super-secret email address
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'transform scale-105' : ''
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-60' : ''
                                    }`}></div>
                                <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex items-center px-4 py-3">
                                        <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="hero@toyland.com"
                                            className="ml-3 flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-semibold"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                Create a super-strong password
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'transform scale-105' : ''
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-60' : ''
                                    }`}></div>
                                <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex items-center px-4 py-3">
                                        <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-purple-500' : 'text-gray-400'
                                            }`} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="make-it-strong-and-fun!"
                                            className="ml-3 flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none font-semibold"
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

                            {/* Password Strength Indicator */}
                            {form.password && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-semibold text-gray-600">Password Strength:</span>
                                        <span className={`text-xs font-bold ${passwordStrength <= 1 ? 'text-red-500' :
                                            passwordStrength === 2 ? 'text-yellow-500' :
                                                passwordStrength === 3 ? 'text-blue-500' : 'text-green-500'
                                            }`}>
                                            {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500 rounded-full`}
                                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 p-4 text-white font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            <div className="relative flex items-center justify-center space-x-3">
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Magic...</span>
                                    </>
                                ) : (
                                    <>
                                        <Rocket className="w-6 h-6" />
                                        <span>Start My Adventure!</span>
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 font-semibold">
                            Already part of our toy family?{" "}
                            <Link
                                to="/signin"
                                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-blue-500 hover:to-emerald-500 transition-all duration-300 relative group"
                            >
                                Welcome Back!
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </p>
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
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                
                .animate-float-delay {
                    animation: float-delay 4s ease-in-out infinite 1.5s;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;