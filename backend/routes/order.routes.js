import express from "express"
import {
    placeOrder,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay
} from "../controllers/order.controller.js"
import adminAuth from "../middleware/adminAuth.middleware.js";
import authuser from "../middleware/auth.middleware.js"

const orderRouter = express.Router()

// admin Routes

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/razorpay',authuser,placeOrderRazorpay)
orderRouter.post('/verifyRazorpay',authuser,verifyRazorpay)

// user Feature

orderRouter.post('/userorders',authuser,userOrders)

export default orderRouter;
