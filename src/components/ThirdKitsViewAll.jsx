import React, { useEffect, useState } from "react";
import "./ThirdKitsViewAll.css"; // 👈 CSS file import

// 🔽 Dropdown Section Component
const DropdownSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="dropdown-section">
      <h4 onClick={() => setOpen(!open)}>
        {title} <span className="arroww">{open ? "▲" : "▼"}</span>
      </h4>
      {open && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

const ThirdKitsViewAll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="thirdkits-grid-container">
      {/* Sidebar with dropdowns */}
      <aside className="sidebar">
        <h3>Football Third ({sortedProducts.length})</h3>
        <ul>
          <li>Tops & T-Shirts</li>
          <li>Shorts</li>
        </ul>

        <DropdownSection id="menu" title="Gender">
          <input type="checkbox" id="men" />
          <label htmlFor="men">Men</label>
          <br />
          <input type="checkbox" id="women" />
          <label htmlFor="women">Women</label>
        </DropdownSection>

        <DropdownSection id="menu" title="Colour">
          <input type="checkbox" id="black" />
          <label htmlFor="black">Black</label>
          <br />
          <input type="checkbox" id="blue" />
          <label htmlFor="blue">Blue</label>
          <br />
          <input type="checkbox" id="yellow" />
          <label htmlFor="yellow">Yellow</label>
        </DropdownSection>

        <DropdownSection id="menu" title="Brand">
          <input type="checkbox" id="nike" />
          <label htmlFor="nike">Nike</label>
        </DropdownSection>

        <DropdownSection id="menu" title="Sports">
          <input type="checkbox" id="football" />
          <label htmlFor="football">Football</label>
        </DropdownSection>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="filters-bar">
          <span>{sortedProducts.length} Products</span>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="view-all-container">
          <h2 className="page-title">All Third Kits</h2>
          <div className="products-grid">
            {sortedProducts.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.images?.[0]} alt={item.title} />
                <div className="info">
                  <h4>{item.title}</h4>
                  <p className="description">
                    {item.description?.slice(0, 60)}...
                  </p>
                  <p className="price">₹ {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThirdKitsViewAll;
