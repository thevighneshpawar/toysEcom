import userModel from '../models/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, msg: 'User does not Exists' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = createToken(user._id)

      res.json({ success: true, token })
    } else {
      return res.json({ success: false, msg: 'Password does not match' })
    }
  } catch (error) {
    console.log(error)

    return res.json({ success: false, msg: error.message })
  }
}

//route for user registeration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await userModel.findOne({ email })

    if (exists) {
      return res.json({ success: false, msg: 'User Already Exists' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: 'Plz enter a valid email' })
    }

    if (password.length < 8) {
      return res.json({ success: false, msg: 'please enter strong password' })
    }

    // hash
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedpass
    })

    const user = await newUser.save()

    const token = createToken(user._id)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      msg: error.message
    })
  }
}

const getuserdetails = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await userModel.findById(userId)
    res.json({ success: true, name: user.name, email: user.email })
  } catch (error) {
    res.json({
      success: false,
      msg: error.message
    })
  }
}

const changePassword = async (req, res) => {
  try {
    const { oldpass, newpass } = req.body
    const user = await userModel.findById(userId)

    if (!user) {
      return res.json({ success: false, msg: 'User does not Exists' })
    }

    const isMatch = await bcrypt.compare(oldpass, user.password)

    if (isMatch) {
      res.json({ success: true, message: 'password Updated' })
    } else {
      return res.json({ success: false, msg: 'Password does not match' })
    }
  } catch (error) {
    console.log(error)

    return res.json({ success: false, msg: error.message })
  }
}

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

export { loginUser, registerUser, adminLogin, getuserdetails }
