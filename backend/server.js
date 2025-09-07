import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import cookieParser from 'cookie-parser'

// App config

const app = express()
const port = process.env.PORT || 4000
connectDB()

// MIDDLEWARES

app.use(express.json())

app.use(express.static('public'))
app.use(cookieParser())

const allowedOrigins = [
  'https://ecommerce-frontend-jet-one.vercel.app',
  'https://ecommerce-mern-iota-opal.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
}

app.use(cors(corsOptions))

// Handle preflight requests
app.options('*', cors(corsOptions))

//api Endpoints

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order/', orderRouter)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
