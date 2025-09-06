import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken // ✅ take token from cookies
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // here we sign admin token differently => store role/email in payload
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized as admin' })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message: error.message })
  }
}

export default adminAuth
