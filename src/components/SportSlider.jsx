import React, { useRef } from "react";
import "./SportSlider.css";

const sports = [
  { title: "Running", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg" },
  { title: "Football", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg" },
  { title: "Basketball", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg" },
  { title: "Gym", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg" },
  { title: "Tennis", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/7ce96f81-bf80-45b9-918e-f2534f14015d/nike-just-do-it.jpg" },
  { title: "Dance", img: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_435,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg" },
];

const SportSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <section className="sport-page">
        <div className="sport-slider-container ">
          <div className="thirdkits-header">
            <h2 className="fw-bold fs-3 mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Shop By Sport</h2>
            <div className="actions">
              <button className="arrow" onClick={() => scroll("left")}>←</button>
              <button className="arrow" onClick={() => scroll("right")}>→</button>
            </div>
          </div>

          {/* Scrollable wrapper with ref */}
          <div className="slider-wrapper pb-4" ref={sliderRef}>
            <div className="slider">
              {sports.map((sport, i) => (
                <div key={i} className="card">
                  <img src={sport.img} alt={sport.title} />
                  <div className="tag">{sport.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SportSlider; 
