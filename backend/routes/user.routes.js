import express from 'express'
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserDetails,
  refreshAccessToken
} from '../controllers/user.controller.js'
import authuser from '../middleware/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/refresh', refreshAccessToken)
userRouter.get('/get-profile', authuser, getUserDetails)

export default userRouter
