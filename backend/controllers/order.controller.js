import orderModel from '../models/order.model.js'
import userModel from '../models/user.model.js'
import razorpay from 'razorpay'

const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const currency = 'INR'

// placing order with cod method

const placeOrder = async (req, res) => {
  try {
    const { userId } = req
    const { amount, items, address } = req.body
    // console.log(userId);

    const orderData = {
      userId,
      items,
      address,
      amount: Number(amount),
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: 'Order Placed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// placing order with Razorpay

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body
    // console.log(userId);

    const orderData = {
      userId,
      items,
      address,
      amount: Number(amount),
      paymentMethod: 'Razorpay',
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)

    await newOrder.save()

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: newOrder._id.toString()
    }

    await razorpayinstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error)
        return res.json({ success: false, message: error })
      }

      res.json({ success: true, order })
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body

    const orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id)

    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })

      res.json({ success: true, message: 'payment successful' })
    } else {
      res.josn({ success: false, message: 'payment fail' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// All orders data for admin panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})

    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// All orders data for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req

    const orders = await orderModel.find({ userId })

    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// update order status from admin panel

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })

    res.json({ success: true, message: 'status updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay
}
