import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{
      background: "#333",
      padding: "10px 20px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>🛒 MyMarket</h3>

      <div>
        <Link to="/products" style={{ color: "white", marginRight: 10 }}>Products</Link>
        <Link to="/favourites" style={{ color: "white", marginRight: 10 }}>Favorites</Link>

        {token && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}
