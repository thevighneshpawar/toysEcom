import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../api/api'
import { useAuth } from './AuthContext'
import { useToast } from './ToastProvider'

const CartContext = createContext(null)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { addToast } = useToast()

  // Fetch cart items when user logs in
  useEffect(() => {
    if (user) {
      fetchCartItems()
    } else {
      setCartItems([])
      setCartCount(0)
    }
  }, [user])

  const fetchCartItems = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const res = await cartAPI.getCart()
      if (res.data.success) {
        const items = res.data.cart?.items || []
        setCartItems(items)
        setCartCount(items.reduce((total, item) => total + item.quantity, 0))
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      throw new Error('Please login to add items to cart')
    }

    setLoading(true)
    try {
      await cartAPI.addToCart({ productId, quantity })
      await fetchCartItems() // Refresh cart
      addToast('Added to cart successfully!', 'success')
      return { success: true, message: 'Added to cart successfully!' }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      addToast(error.response?.data?.message || 'Failed to add to cart', 'error')
      throw new Error(error.response?.data?.message || 'Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }

  const updateCartItem = async (productId, quantity) => {
    if (!user) return

    setLoading(true)
    try {
      await cartAPI.updateCart({ productId, quantity })
      await fetchCartItems() // Refresh cart
      return { success: true, message: 'Cart updated successfully!' }
    } catch (error) {
      console.error('Failed to update cart:', error)
      throw new Error(error.response?.data?.message || 'Failed to update cart')
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    if (!user) return

    setLoading(true)
    try {
      await cartAPI.updateCart({ productId, quantity: 0 })
      await fetchCartItems() // Refresh cart
      return { success: true, message: 'Item removed from cart!' }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      throw new Error(error.response?.data?.message || 'Failed to remove from cart')
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setCartItems([])
    setCartCount(0)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCartItems,
        getCartTotal,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}