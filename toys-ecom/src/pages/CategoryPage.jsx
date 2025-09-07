import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Grid, List, ArrowLeft, ShoppingCart, Loader } from 'lucide-react'
import { productAPI } from '../api/api'
import { useCart } from '../context/CartProvider'
import { useAuth } from '../context/AuthContext'

const CategoryPage = () => {
    const { categoryName } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState('grid')
    const [sortBy, setSortBy] = useState('')
    const [addingToCart, setAddingToCart] = useState({})

    useEffect(() => {
        fetchCategoryProducts()
    }, [categoryName])

    const fetchCategoryProducts = async () => {
        setLoading(true)
        try {
            const res = await productAPI.getByCategory(categoryName)
            if (res.data.success) {
                setProducts(res.data.products || [])
            }
        } catch (error) {
            console.error('Failed to fetch category products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSort = (sortType) => {
        setSortBy(sortType)
        let sortedProducts = [...products]

        switch (sortType) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price)
                break
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                sortedProducts = [...products]
        }

        setProducts(sortedProducts)
    }

    const handleAddToCart = async (productId) => {
        if (!user) {
            navigate('/signin')
            return
        }

        setAddingToCart(prev => ({ ...prev, [productId]: true }))
        try {
            const result = await addToCart(productId, 1)
            // Toast notification will be shown by CartProvider
        } catch (error) {
            // Toast notification will be shown by CartProvider
        } finally {
            setAddingToCart(prev => ({ ...prev, [productId]: false }))
        }
    }

    const categories = [
        { name: 'Soft Toys', value: 'softtoys', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Cuddly and soft plush toys' },
        { name: 'Hard Toys', value: 'hardtoys', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', description: 'Superheroes and adventure figures' },
        { name: 'Kids Toys', value: 'kidstoys', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', description: 'Beautiful dolls and accessories' }
    ]

    const currentCategory = categories.find(cat => cat.name === categoryName)

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                {/* Category Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {categoryName} Collection
                    </h1>
                    {currentCategory && (
                        <p className="text-lg text-gray-600 max-w-2xl">
                            {currentCategory.description}
                        </p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            {loading ? 'Loading...' : `${products.length} products found`}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Sort by</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        {products.map(product => (
                            <div
                                key={product._id}
                                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden group ${viewMode === 'list' ? 'flex' : ''
                                    }`}
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <div className={`${viewMode === 'list' ? 'w-48' : 'aspect-square'} bg-gray-100 relative overflow-hidden`}>
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.bestseller && (
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                Bestseller
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
                                        {product.subCategory && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                {product.subCategory}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAddToCart(product._id)
                                        }}
                                        disabled={addingToCart[product._id]}
                                        className="w-full mt-3 flex items-center justify-center gap-2 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
                                    >
                                        {addingToCart[product._id] ? (
                                            <Loader size={16} className="animate-spin" />
                                        ) : (
                                            <ShoppingCart size={16} />
                                        )}
                                        {addingToCart[product._id] ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Products */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎁</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No products in this category</h3>
                        <p className="text-gray-600 mb-4">Check back later for new arrivals!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                        >
                            Browse All Products
                        </button>
                    </div>
                )}

                {/* Related Categories */}
                {!loading && products.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Other Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.filter(cat => cat.name !== categoryName).map(category => (
                                <div
                                    key={category.name}
                                    className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
                                    onClick={() => navigate(`/category/${category.value}`)}
                                >
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-3 text-center">
                                        <h3 className="font-medium text-gray-700 text-sm">{category.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryPage