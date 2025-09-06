// src/pages/SigninPage.jsx
import { useState } from "react";
import { userAPI } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // custom hook for user, login, logout
import { ToyBrick, Mail, Lock } from "lucide-react";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await userAPI.Login({ email, password });

            if (res.data?.success) {
                login(res.data.user); // save user to context
                navigate("/"); // redirect to home
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 shadow-md">
                        <ToyBrick className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="mt-3 text-2xl font-bold text-gray-800">
                        Welcome Back!
                    </h1>
                    <p className="text-sm text-gray-500">Sign in to your toy store</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="mt-1 flex items-center rounded-xl border border-gray-300 px-3 shadow-sm focus-within:border-pink-400 focus-within:ring focus-within:ring-pink-200">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                className="ml-2 w-full border-0 py-2 text-gray-800 focus:outline-none"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 flex items-center rounded-xl border border-gray-300 px-3 shadow-sm focus-within:border-pink-400 focus-within:ring focus-within:ring-pink-200">
                            <Lock className="h-4 w-4 text-gray-400" />
                            <input
                                type="password"
                                className="ml-2 w-full border-0 py-2 text-gray-800 focus:outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Extra links */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-pink-500 hover:text-pink-600"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SigninPage
