import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Edit, Save, X, Package, ShoppingCart } from 'lucide-react'
import { userAPI } from '../api/api'
import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    })

    useEffect(() => {
        if (user) {
            fetchProfile()
        } else {
            navigate('/signin')
        }
    }, [user, navigate])

    const fetchProfile = async () => {
        setLoading(true)
        try {
            const res = await userAPI.getProfile()
            if (res.data.success) {
                const userData = res.data.user
                setProfile(userData)
                setFormData({
                    name: userData.name || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    city: userData.city || '',
                    state: userData.state || '',
                    pincode: userData.pincode || ''
                })
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setProfile(prev => ({ ...prev, ...formData }))
            setEditing(false)
            alert('Profile updated successfully!')
        } catch (error) {
            console.error('Failed to update profile:', error)
            alert('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: profile?.name || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            address: profile?.address || '',
            city: profile?.city || '',
            state: profile?.state || '',
            pincode: profile?.pincode || ''
        })
        setEditing(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <User size={32} />
                        My Profile
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                                {!editing ? (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                                    >
                                        <Edit size={16} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                        >
                                            <Save size={16} />
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                        >
                                            <X size={16} />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{profile?.name || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    {editing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    ) : (
                                        <p className="text-gray-800 flex items-center gap-2">
                                            <Mail size={16} />
                                            {profile?.email || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    {editing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    ) : (
                                        <p className="text-gray-800 flex items-center gap-2">
                                            <Phone size={16} />
                                            {profile?.phone || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    {editing ? (
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    ) : (
                                        <p className="text-gray-800 flex items-start gap-2">
                                            <MapPin size={16} className="mt-1" />
                                            {profile?.address || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                            />
                                        ) : (
                                            <p className="text-gray-800">{profile?.city || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State
                                        </label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                            />
                                        ) : (
                                            <p className="text-gray-800">{profile?.state || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pincode
                                        </label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                            />
                                        ) : (
                                            <p className="text-gray-800">{profile?.pincode || 'Not provided'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition"
                                >
                                    <Package size={20} className="text-blue-500" />
                                    <div>
                                        <div className="font-medium text-gray-800">My Orders</div>
                                        <div className="text-sm text-gray-600">View order history</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition"
                                >
                                    <ShoppingCart size={20} className="text-pink-500" />
                                    <div>
                                        <div className="font-medium text-gray-800">Shopping Cart</div>
                                        <div className="text-sm text-gray-600">View cart items</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to logout?')) {
                                            logout()
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage