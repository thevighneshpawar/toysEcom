import express from 'express'
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  filterProducts
} from '../controllers/product.controller.js'
import upload from '../middleware/multer.middleware.js'
import adminAuth from '../middleware/adminAuth.middleware.js'

const productRouter = express.Router()

productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
)
productRouter.post('/remove', adminAuth, removeProduct)
productRouter.get('/:productId', singleProduct)
productRouter.get('/list', listProducts)
// Instead of a separate /filter, use this:
productRouter.get('/', filterProducts)

export default productRouter
