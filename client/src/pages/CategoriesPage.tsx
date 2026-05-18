import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const categories = [
    { name: "Technology", slug: "technology", count: 24 },
    { name: "Design", slug: "design", count: 18 },
    { name: "Business", slug: "business", count: 12 },
    { name: "Lifestyle", slug: "lifestyle", count: 15 },
    { name: "Health", slug: "health", count: 9 },
    { name: "Travel", slug: "travel", count: 11 },
    { name: "Programming", slug: "programming", count: 30 },
    { name: "Productivity", slug: "productivity", count: 14 },
  ];

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container py-5" style={{ maxWidth: "820px" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>
          Categories
        </h1>
        <p className="text-muted mb-0">
          Explore articles organized by topic and depth.
        </p>
      </div>

      {/* Search (clean, no borders everywhere) */}
      <div className="mb-5">
        <input
          type="text"
          className="form-control form-control-lg border-0 shadow-sm px-3"
          placeholder="Search categories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            borderRadius: "12px",
            background: "#f6f7f9",
          }}
        />
      </div>

      {/* List */}
      <div className="d-flex flex-column gap-3">
        {filtered.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => navigate(`/categories/${cat.slug}`)}
            className="category-row"
          >
            <div>
              <h5 className="mb-1 fw-semibold">{cat.name}</h5>
              <p className="text-muted mb-0 small">
                Browse curated posts in {cat.name.toLowerCase()}
              </p>
            </div>

            <div className="text-muted small">{cat.count} posts →</div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-muted text-center py-5">
            No matching categories found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;