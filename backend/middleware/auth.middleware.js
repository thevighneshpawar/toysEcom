import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  const token = req.cookies.accessToken // ✅ take token from cookies

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id // ✅ store userId directly (not in body)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export default authUser
