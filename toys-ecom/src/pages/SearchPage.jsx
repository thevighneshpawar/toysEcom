import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Star, Filter, Grid, List, X, Loader, ShoppingCart, Sparkles } from 'lucide-react'
import { productAPI } from '../api/api'
import { useCart } from '../context/CartProvider'
import { useAuth } from '../context/AuthContext'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart } = useCart()
    const query = searchParams.get('query') || ''

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(query)
    const [sortBy, setSortBy] = useState('')
    const [viewMode, setViewMode] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [addingToCart, setAddingToCart] = useState({})
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        bestseller: false
    })

    useEffect(() => {
        if (query) {
            performSearch(query)
        }
    }, [query])

    const performSearch = async (searchQuery) => {
        setLoading(true)
        try {
            const res = await productAPI.searchProducts(searchQuery)
            if (res.data.success) {
                setProducts(res.data.products || [])
            }
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
        }
        setSearchTerm('')
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleAddToCart = async (productId, e) => {
        e.stopPropagation(); // Prevent navigation to product page

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

    const applyFilters = async () => {
        setLoading(true)
        try {

            const filterData = {
                search: searchTerm,
                ...(filters.category && { category: filters.category }),
                ...(filters.minPrice && { minPrice: filters.minPrice }),
                ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
                ...(sortBy && { sortBy })
            }

            // Only add bestseller if it's true
            if (filters.bestseller) {
                filterData.bestseller = true;
            }
            const res = await productAPI.advancedFilter({
                search: searchTerm,
                ...filterData,
                sortBy
            })
            if (res.data.success) {
                setProducts(res.data.products || [])
            }
        } catch (error) {
            console.error('Filter failed:', error)
        } finally {
            setLoading(false)
            setShowFilters(false) // Close mobile filters after applying
        }
    }

    const clearFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            bestseller: false
        })
        setSortBy('')
    }

    const sortedProducts = useMemo(() => {
        if (!products.length) return [];

        const productsCopy = [...products];

        switch (sortBy) {
            case 'price-low':
                return productsCopy.sort((a, b) => a.price - b.price);
            case 'price-high':
                return productsCopy.sort((a, b) => b.price - a.price);
            case 'name':
                return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
            case 'rating':
                return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            default:
                return productsCopy;
        }
    }, [products, sortBy]);

    const categories = [
        { name: 'Soft Toys', value: 'softtoys', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', description: 'Cuddly and soft plush toys' },
        { name: 'Hard Toys', value: 'hardtoys', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', description: 'Superheroes and adventure figures' },
        { name: 'Kids Toys', value: 'kidstoys', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', description: 'Beautiful dolls and accessories' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="container mx-auto px-4 py-8">
                {/* Search Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                        {query ? `Search Results for "${query}"` : 'Find Your Perfect Toy!'}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover amazing toys that will bring joy and creativity to playtime
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Search className="h-5 w-5 text-purple-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for toys, games, and more..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-4 pl-12 pr-32 rounded-2xl border-2 border-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-300 shadow-lg"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-200 flex items-center gap-2"
                            >
                                <Sparkles size={16} />
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Filter size={20} />
                        <span className="font-medium">Filters</span>
                        {Object.values(filters).some(val => val) || sortBy ? (
                            <span className="bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                !
                            </span>
                        ) : null}
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'} shadow-md transition-colors`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'} shadow-md transition-colors`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <div className={`hidden lg:block lg:w-72 space-y-6 ${showFilters ? '!block' : ''}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Filter size={20} className="text-purple-500" />
                                    Filters
                                </h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-purple-500 hover:text-purple-700 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat.value} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.value}
                                                checked={filters.category === cat.value}
                                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                                className="rounded-full text-purple-500 focus:ring-purple-300"
                                            />
                                            <span className="text-gray-600 group-hover:text-purple-600 transition-colors">{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.minPrice}
                                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bestseller Filter */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.bestseller}
                                        onChange={(e) => handleFilterChange('bestseller', e.target.checked)}
                                        className="rounded text-purple-500 focus:ring-purple-300"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">Bestsellers Only</span>
                                </label>
                            </div>

                            {/* Sort By */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                                >
                                    <option value="">Recommended</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>

                            <button
                                onClick={applyFilters}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader size={16} className="animate-spin" /> Searching...
                                    </span>
                                ) : (
                                    `Found ${sortedProducts.length} amazing toy${sortedProducts.length !== 1 ? 's' : ''}`
                                )}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'} shadow-md transition-colors`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'} shadow-md transition-colors`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p className="mt-4 text-gray-600">Finding the best toys for you...</p>
                            </div>
                        )}

                        {/* Products Grid */}
                        {!loading && (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                                }`}>
                                {sortedProducts.map(product => (
                                    <div
                                        key={product._id}
                                        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${viewMode === 'list' ? 'flex' : ''
                                            }`}
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'} bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden`}>
                                            <img
                                                src={product.image[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {product.bestseller && (
                                                <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                                                    Bestseller
                                                </div>
                                            )}
                                        </div>
                                        <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>
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
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
                                                <button
                                                    onClick={(e) => handleAddToCart(product._id, e)}
                                                    disabled={addingToCart[product._id]}
                                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                                                >
                                                    {addingToCart[product._id] ? (
                                                        <Loader size={16} className="animate-spin" />
                                                    ) : (
                                                        <ShoppingCart size={16} />
                                                    )}
                                                    {viewMode === 'list' && (addingToCart[product._id] ? 'Adding...' : 'Add to Cart')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {!loading && products.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="text-6xl mb-4">🎁</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No toys found!</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                                >
                                    Browse All Toys
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Filter Overlay */}
                {showFilters && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                                    <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-gray-100">
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Mobile Filter Content - Same as desktop but optimized for mobile */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <div className="space-y-2">
                                            {categories.map(cat => (
                                                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={cat}
                                                        checked={filters.category === cat}
                                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                                        className="rounded-full text-purple-500 focus:ring-purple-300"
                                                    />
                                                    <span className="text-gray-600 group-hover:text-purple-600 transition-colors">{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filters.minPrice}
                                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filters.maxPrice}
                                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.bestseller}
                                                onChange={(e) => handleFilterChange('bestseller', e.target.checked)}
                                                className="rounded text-purple-500 focus:ring-purple-300"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">Bestsellers Only</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                                        >
                                            <option value="">Recommended</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="name">Name: A to Z</option>
                                            <option value="rating">Highest Rated</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex gap-3">
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={applyFilters}
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium"
                                    >
                                        Show Results
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage