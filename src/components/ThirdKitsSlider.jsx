import React, { useRef } from "react";
import "./ThirdKitsSlider.css";

const products = [
  {
    title: "Inter Milan 2025/26 Stadium Third",
    subtitle: "Men's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/9797f550-95f0-4cae-8efe-ad2bd34a9aec/chelsea-fc-2025-26-match-third-dri-fit-adv-total-90-football-authentic-shirt-sD5ShB.png"
  },
  {
    title: "Inter Milan 2025/26 Match Third",
    subtitle: "Men's Nike Dri-FIT ADV Total 90 Football Authentic Shirt",
    price: "₹ 7 995.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/7c028874-2ae7-4ced-8fbc-14233479eea1/psg-strike-third-dri-fit-total-90-football-knit-top-PxHxHt.png"
  },
  {
    title: "Chelsea 2025/26 Third Kit",
    subtitle: "Men's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/8bb8a33a-83f0-4c0f-bfc1-602bc82d0f71/paris-saint-germain-2025-26-stadium-third-dri-fit-total-90-football-replica-shirt-dPjXDb.png"
  },
  {
    title: "Paris Saint-Germain 2025/26 Stadium Third",
    subtitle: "Women's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/a4854b68-a361-4778-a669-75f2398b9b30/paris-saint-germain-2025-26-stadium-third-dri-fit-total-90-football-replica-shirt-Cf7gjX.png"
  },
  {
    title: "Paris Saint-Germain 2025/26 Stadium Third",
    subtitle: "Women's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/b378db12-c1d8-45b4-a5e9-d556f7c13f51/inter-milan-2025-26-stadium-third-dri-fit-total-90-football-replica-shirt-00psDz.png"
  },
  {
    title: "Paris Saint-Germain 2025/26 Stadium Third",
    subtitle: "Women's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/6490a5e6-5e36-45fe-b4ad-479649e8b182/tottenham-hotspur-2025-26-stadium-third-dri-fit-total-90-football-replica-shirt-lQqrzQ.png"
  },
  {
    title: "Paris Saint-Germain 2025/26 Stadium Third",
    subtitle: "Women's Nike Dri-FIT Total 90 Football Replica Shirt",
    price: "₹ 4 695.00",
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/585dfa6c-c3f6-49cc-9fbe-52eed67b5c28/paris-saint-germain-2024-25-stadium-third-jordan-dri-fit-football-replica-shirt-jGkgS4.png"
  }
];

const ThirdKitsSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (direction === "left") {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="thirdkits-container">
      <div className="thirdkits-header">
        <h2 className="fw-bold fs-3 mb-4"  style={{ fontFamily: "'Oswald', sans-serif" }}>Shop Third Kits</h2>
        <div className="actions">
          <button className="view-all">View All</button>
          <button className="arrow" onClick={() => scroll("left")}>←</button>
          <button className="arrow" onClick={() => scroll("right")}>→</button>
        </div>
      </div>

      {/* Slider */}
      <div className="thirdkits-slider" ref={sliderRef}>
        {products.map((item, i) => (
          <div key={i} className="thirdkits-card">
            <img src={item.img} alt={item.title} />
            <div className="info">
              <h4>{item.title}</h4>
              <p className="subtitlethird">{item.subtitle}</p>
              <p className="price">MRP : {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdKitsSlider;
