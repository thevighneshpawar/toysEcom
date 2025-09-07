// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { ToastProvider } from "./context/ToastProvider";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>

          <BrowserRouter>
            <Navbar />

            <Routes>
              {/* Auth */}
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Products */}
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              {/* Orders */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />

              {/* Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
