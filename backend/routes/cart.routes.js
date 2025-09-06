import express from 'express'
import {addtocart,getusercart,updatecart } from '../controllers/cart.controller.js'
import authuser from '../middleware/auth.middleware.js';


const cartRouter = express.Router();

cartRouter.post('/get',authuser,getusercart)
cartRouter.post('/add',authuser,addtocart)
cartRouter.post('/update',authuser,updatecart)

export default cartRouter