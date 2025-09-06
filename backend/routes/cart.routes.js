import express from 'express'
import {
  addtocart,
  getusercart,
  updatecart
} from '../controllers/cart.controller.js'
import authuser from '../middleware/auth.middleware.js'

const cartRouter = express.Router()

cartRouter.get('/', authuser, getusercart)
cartRouter.post('/', authuser, addtocart)
cartRouter.patch('/', authuser, updatecart)

export default cartRouter
