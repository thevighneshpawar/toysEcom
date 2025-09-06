// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../api/api";

const RegisterPage = () => {
    const { login } = useAuth(); // after successful register, we can auto-login
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // call your backend register API
            const data = await userAPI.register(form);

            console.log(data);

            if (!data.data.success) {
                setError(data.msg || "Registration failed");
            }

            // auto-login after registration
            login(data.data.user);
            navigate('/home')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
                    Create an Account 🎁
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-colors font-semibold disabled:opacity-70"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-purple-600 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
