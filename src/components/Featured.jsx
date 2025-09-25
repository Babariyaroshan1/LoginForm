import React from "react";
import "./Featured.css";

const featuredItems = [
  {
    title2: "Training Essentials",
    // subtitle: "Ready",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1047,c_limit/9441c43b-d0ad-45bc-80b3-7b012e0690b6/nike-just-do-it.png", 
    link: "#"
  },
  {
    title2: "Look of Football",
    // subtitle: "Total 90",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1047,c_limit/697628d5-1eb4-4878-bb60-539a2adf791a/nike-just-do-it.png",
    link: "#"
  },
  {
    title2: "Running Gear",
    // subtitle: "Stay Fast",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1039,c_limit/ea15f0e2-b088-4320-b2a1-32f8b34e6066/nike-just-do-it.png",
    link: "#"
  },
  {
    title2: "Sneaker of The Week",
    // subtitle: "Court Ready",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1039,c_limit/e4ce975a-cd79-4b7b-927f-0212432914ee/nike-just-do-it.png",
    link: "#"
  }
];

const Featured = () => {
  return (
    <div className="featured-container">
      <h2 className="featured-title" style={{ fontFamily: "'Oswald', sans-serif" }}>Featured</h2>
      <div className="featured-grid">
        {featuredItems.map((item, i) => (
          <div
            key={i}
            className="featured-card"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="overlay">
              {/* {item.subtitle && <p className="subtitle">{item.subtitle}</p>} */}
              <h3 className="title2 text-white">{item.title2}</h3>
              <a href={item.link} className="shop-btn">Shop</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
