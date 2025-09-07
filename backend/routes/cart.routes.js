import express from 'express'
import {
  addToCart,
  getCart,
  updateCart
} from '../controllers/cart.controller.js'
import authuser from '../middleware/auth.middleware.js'

const cartRouter = express.Router()

cartRouter.get('/', authuser, getCart)
cartRouter.post('/', authuser, addToCart)
cartRouter.patch('/', authuser, updateCart)

export default cartRouter
