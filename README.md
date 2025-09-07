# ToyLand E-commerce Website 🎠

A modern, professional toys e-commerce website built with React and Node.js.

## Features

### Frontend
- **Modern Design**: Beautiful, responsive UI with toys-themed design
- **Product Browsing**: Browse products by categories
- **Search & Filter**: Advanced search and filtering capabilities
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Sign up, sign in, and profile management
- **Order Management**: Place orders and track order history
- **Responsive Design**: Works perfectly on all devices

### Backend
- **RESTful API**: Clean API endpoints for all operations
- **User Authentication**: JWT-based authentication with refresh tokens
- **Cart Management**: Persistent cart functionality
- **Order Processing**: Complete order management system
- **Product Management**: CRUD operations for products
- **File Upload**: Image upload with Cloudinary integration

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Razorpay (Payment Integration)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toys-ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../toys-ecom
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Create a `.env` file in the toys-ecom directory:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   ```

5. **Start the development servers**
   
   Backend:
   ```bash
   cd backend
   npm start
   ```
   
   Frontend:
   ```bash
   cd toys-ecom
   npm run dev
   ```

## Project Structure

```
toys-ecommerce/
├── backend/
│   ├── controllers/     # API controllers
│   ├── middleware/      # Authentication & validation middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Server entry point
├── toys-ecom/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── api/         # API service functions
│   │   └── App.jsx      # Main app component
│   └── public/          # Static assets
└── admin/               # Admin panel (separate React app)
```

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/get-profile` - Get user profile
- `POST /api/user/refresh` - Refresh access token

### Products
- `GET /api/product` - Get products with filters
- `GET /api/product/:id` - Get single product
- `POST /api/product/add` - Add product (Admin only)
- `POST /api/product/remove` - Remove product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart` - Update cart item

### Orders
- `POST /api/order/place` - Place order
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/razorpay` - Create Razorpay order

## Features Overview

### 🎯 Product Management
- Browse products by categories
- Advanced search and filtering
- Product details with image gallery
- Bestseller products section

### 🛒 Shopping Experience
- Add to cart functionality
- Cart management (update quantities, remove items)
- Secure checkout process
- Multiple payment options (COD, Razorpay)

### 👤 User Management
- User registration and authentication
- Profile management
- Order history tracking
- Secure password handling

### 📱 Responsive Design
- Mobile-first approach
- Beautiful animations and transitions
- Consistent design system
- Accessibility features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@toyland.com or create an issue in the repository.

---

Made with ❤️ for kids and toy lovers everywhere! 🎠