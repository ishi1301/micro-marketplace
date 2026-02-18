import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err?.response?.data?.error || err?.message || "Failed to load product"));
  }, [id]);

  if (error) {
    return (
      <div className="container">
        <div className="empty">
          <strong>Couldn’t load product.</strong>
          <div className="muted" style={{ marginTop: 6 }}>{error}</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/products">
              <button className="btn-secondary">← Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty">
          <strong>Loading…</strong>
          <div className="muted" style={{ marginTop: 6 }}>
            Fetching product details.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 14 }}>
        <Link to="/products">
          <button className="btn-secondary">← Back to products</button>
        </Link>
      </div>

      <div className="card">
        <img src={product.image} alt={product.title} />
        <div className="card-body">
          <h2>{product.title}</h2>
          <p className="price">₹ {product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
