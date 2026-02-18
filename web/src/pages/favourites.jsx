import { useEffect, useState } from "react";
import API from "../api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/favourites", {
      headers: { Authorization: token }
    })
      .then((res) => setFavorites(res.data))
      .catch((err) =>
        setError(
          err?.response?.data?.error || err?.message || "Failed to load favourites"
        )
      );
  }, []);

  return (
    <div className="container">
      <h2>❤️ My Favorites</h2>

      {error && (
        <div className="empty" style={{ marginTop: 12 }}>
          <strong>Couldn’t load favourites.</strong>
          <div className="muted" style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      {favorites.length === 0 && !error && <p>No favorites yet</p>}

      <div className="grid" style={{ marginTop: 14 }}>
        {favorites.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.title} />
            <div className="card-body">
              <h3>{p.title}</h3>
              <p className="price">₹ {p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
