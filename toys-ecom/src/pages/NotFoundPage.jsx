import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-pink-500 mb-4">404</div>
                    <div className="text-6xl mb-6">🎠</div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for seems to have wandered off to the toy box! 
                    Let's get you back to the fun.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-medium"
                    >
                        <Home size={20} />
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                {/* Fun Message */}
                <div className="mt-12 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                    <p className="text-gray-600 italic">
                        "Every toy has a story, but this page seems to have lost its way. 
                        Don't worry, there are plenty of other adventures waiting for you!"
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage