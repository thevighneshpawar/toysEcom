import productModel from '../models/product.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

// add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(
      item => item != undefined
    )

    let imagesUrl = await Promise.all(
      images.map(async item => {
        let result = await uploadOnCloudinary(item.path)
        return result.url
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    }

    // console.log(productData);

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: 'Product added' })
  } catch (error) {
    console.log(error)

    res.json({ success: false, message: error.message })
  }
}

//list product

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})

    res.json({ success: true, products })
  } catch (error) {
    console.log(error)

    res.json({ success: false, message: error.message })
  }
}

// remove product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: 'Product removed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// single product info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await productModel.findById(productId)

    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// search filter
const filterProducts = async (req, res) => {
  try {
    const { category, subCategory, bestseller, search } = req.query

    let filter = {}

    if (category) {
      filter.category = category
    }

    if (subCategory) {
      filter.subCategory = subCategory
    }

    if (bestseller) {
      filter.bestseller = bestseller === 'true'
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } } // case-insensitive
        // { description: { $regex: search, $options: 'i' } }
      ]
    }

    const products = await productModel
      .find(filter)
      .select('name price image category subCategory bestseller')

    res.json({
      success: true,
      count: products.length,
      products
    })
  } catch (err) {
    console.error('Error filtering/searching products:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  filterProducts
}
