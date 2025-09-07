import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    shippingAddress: {
      type: Object,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: 'pending'
    },

    paymentMethod: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      default: 'pending'
    },

    payment: {
      type: Boolean,
      required: true,
      default: false
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    updatedAt: {
      type: Date,
      default: Date.now
    },

    date: {
      type: Number,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel
