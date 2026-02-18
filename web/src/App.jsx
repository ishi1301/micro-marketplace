import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/favourites";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {isAuthPage ? (
        <header className="auth-header">
          <div className="auth-header-inner">
            <span className="auth-brand-icon">🛒</span>
            <span className="auth-brand-text">MyMarket</span>
          </div>
        </header>
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

