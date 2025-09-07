import userModel from '../models/user.model.js'
import productModel from '../models/product.model.js'

// add to cart
const addToCart = async (req, res) => {
  try {
    const { userId } = req
    const { productId, quantity } = req.body

    const userData = await userModel.findById(userId)
    const product = await productModel.findById(productId)

    if (!product) {
      return res.json({ success: false, message: 'Product not found' })
    }

    let cart = userData.cart || []
    const existingItemIndex = cart.findIndex(
      item => item.productId.toString() === productId
    )

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity || 1
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity || 1
      })
    }

    await userModel.findByIdAndUpdate(userId, { cart })

    res.json({
      success: true,
      message: 'Added to cart'
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// update cart
const updateCart = async (req, res) => {
  try {
    const { userId } = req
    const { productId, quantity } = req.body
    console.log(req)

    const userData = await userModel.findById(userId)
    let cart = userData.cart || []

    if (quantity === 0) {
      cart = cart.filter(item => item.productId.toString() !== productId)
    } else {
      const itemIndex = cart.findIndex(
        item => item.productId.toString() === productId
      )
      if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity
      }
    }

    await userModel.findByIdAndUpdate(userId, { cart })

    res.json({
      success: true,
      message: 'Cart updated'
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// get cart
const getCart = async (req, res) => {
  try {
    const { userId } = req

    const userData = await userModel.findById(userId)
    const cart = userData.cart || []

    res.json({
      success: true,
      cart: { items: cart }
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

export { addToCart, updateCart, getCart }
