import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("relevance");

  const limit = 12;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    API.get(
      `/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    )
      .then((res) => {
        if (cancelled) return;
        setProducts(res.data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.error || err?.message || "Failed to load products");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, page]);

  const addFavorite = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await API.post(
        `/favourites/${id}`,
        {},
        {
          headers: { Authorization: token }
        }
      );
      alert("Added to favorites ❤️");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Failed to add favorite");
    }
  };

  const canPrev = page > 1;
  const canNext = products.length === limit;

  const sortedProducts = (() => {
    if (sort === "price-asc") {
      return [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sort === "price-desc") {
      return [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    if (sort === "name-asc") {
      return [...products].sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""))
      );
    }
    return products;
  })();

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">
          <h2>Marketplace</h2>
          <p className="subtitle">Find great deals — fast, clean, and modern.</p>
        </div>

        <div className="filters">
          <div className="search" role="search">
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="empty">
          <strong>Couldn’t load products.</strong>
          <div className="muted" style={{ marginTop: 6 }}>{error}</div>
        </div>
      ) : null}

      <div className="grid" aria-busy={loading ? "true" : "false"}>
        {sortedProducts.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.title} loading="lazy" />

            <div className="card-body">
              <h3>{p.title}</h3>
              <p className="price">₹ {p.price}</p>

              <div className="actions">
                <Link to={`/products/${p._id}`}>
                  <button className="btn-secondary">View details</button>
                </Link>

                <button onClick={() => addFavorite(p._id)}>❤️ Favorite</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && !error && products.length === 0 ? (
        <div className="empty">
          <strong>No products found.</strong>
          <div className="muted" style={{ marginTop: 6 }}>
            Try a different search term.
          </div>
        </div>
      ) : null}

      <div className="pager">
        <button
          className="btn-secondary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!canPrev || loading}
        >
          Prev
        </button>
        <span className="badge">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!canNext || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
