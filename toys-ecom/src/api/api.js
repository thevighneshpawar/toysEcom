// src/api.js
import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true // send cookies (for access/refresh token)
})

// ---------------- USER APIs ----------------
export const userAPI = {
  Login: data => api.post('/user/login', data),
  register: data => api.post('/user/register', data),
  getProfile: () => api.get('/user/get-profile'),
  refreshToken: () => api.post('/user/refresh')
}

// ---------------- CART APIs ----------------
export const cartAPI = {
  getCart: () => api.get('/cart'),
  updateCart: data => api.patch('/cart', data),
  addToCart: data => api.post('/cart', data)
}

// ---------------- ORDER APIs ----------------
export const orderAPI = {
  placeOrder: data => api.post('/order/place', data),
  placeOrderRazorpay: data => api.post('/order/razorpay', data),
  getUserOrders: () => api.post('/order/userorders')
}

export const productAPI = {
  getProductById: productId => api.get(`/product/${productId}`),

  // Search products by name
  searchProducts: searchTerm =>
    api.get(`/product?search=${encodeURIComponent(searchTerm)}`),

  // Filter by category
  getByCategory: category =>
    api.get(`/product?category=${encodeURIComponent(category)}`),

  // Filter by subcategory
  getBySubCategory: subCategory =>
    api.get(`/product?subCategory=${encodeURIComponent(subCategory)}`),

  // Get bestsellers
  getBestsellers: () => api.get('/product?bestseller=true'),

  // Advanced filter (multiple parameters)
  advancedFilter: ({
    category,
    subCategory,
    bestseller,
    search,
    minPrice,
    maxPrice,
    sortBy
  }) => {
    const params = new URLSearchParams()

    if (category) params.append('category', category)
    if (subCategory) params.append('subCategory', subCategory)
    if (bestseller !== undefined)
      params.append('bestseller', bestseller.toString())
    if (search) params.append('search', search)
    if (minPrice) params.append('minPrice', minPrice.toString())
    if (maxPrice) params.append('maxPrice', maxPrice.toString())
    if (sortBy) params.append('sortBy', sortBy)

    return api.get(`/product?${params.toString()}`)
  }
}

//-------refresh for failed ones ==========//

//Interceptor for handling 401 errors
let isRefreshing = false

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      // Prevent retrying refresh itself
      if (
        originalRequest.url?.includes('/refresh') ||
        originalRequest.url?.includes('/get-profile')
      ) {
        return Promise.reject(error)
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await userAPI.refreshToken()

        // Retry the original request (cookies updated automatically)
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, redirect to signin
        window.location.href = '/signin'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
