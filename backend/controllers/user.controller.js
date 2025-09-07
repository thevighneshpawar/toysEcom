import userModel from '../models/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// ----------------- TOKEN HELPERS -----------------
const createAccessToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = id => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

// ----------------- REGISTER -----------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, msg: 'User already exists' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: 'Please enter a valid email' })
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        msg: 'Password must be at least 8 characters'
      })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPass
    })

    const user = await newUser.save()

    // tokens
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    // cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ success: true, msg: 'Registered successfully' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, msg: error.message })
  }
}

// ----------------- LOGIN -----------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, msg: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, msg: 'Invalid credentials' })
    }

    // tokens
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    // cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ success: true, msg: 'Login successful' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, msg: error.message })
  }
}

// ----------------- REFRESH TOKEN -----------------
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, msg: 'No refresh token provided' })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, msg: 'Invalid refresh token' })

      const newAccessToken = createAccessToken(decoded.id)

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 15 * 60 * 1000
      })

      return res.json({ success: true, msg: 'Access token refreshed' })
    })
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message })
  }
}

// ----------------- GET USER DETAILS -----------------
const getUserDetails = async (req, res) => {
  try {
    // better: get from auth middleware
    const user = await userModel.findById(req.userId).select('-password')
    if (!user) return res.json({ success: false, msg: 'User not found' })

    res.json({ success: true, user })
  } catch (error) {
    res.json({ success: false, msg: error.message })
  }
}

// ----------------- CHANGE PASSWORD -----------------
const changePassword = async (req, res) => {
  try {
    const { userId, oldpass, newpass } = req.body

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, msg: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(oldpass, user.password)
    if (!isMatch) {
      return res.json({ success: false, msg: 'Old password is incorrect' })
    }

    if (newpass.length < 8) {
      return res.json({
        success: false,
        msg: 'Password must be at least 8 characters'
      })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newpass, salt)
    await user.save()

    res.json({ success: true, msg: 'Password updated successfully' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, msg: error.message })
  }
}

// ----------------- ADMIN LOGIN -----------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credits' })
    }
  } catch (error) {
    res.json({ success: false, msg: error.message })
  }
}

// ----------------- LOGOUT -----------------
const logoutUser = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })

  res.json({ success: true, msg: 'Logged out successfully' })
}

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserDetails,
  changePassword,
  adminLogin,
  logoutUser
}
