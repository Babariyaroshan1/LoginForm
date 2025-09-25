import React from "react";
const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      title: "The RC Short",
      image:
        "https://img.freepik.com/free-photo/teenager-with-basketball-ball_23-2148800922.jpg?semt=ais_hybrid&w=740",
      link: "#",
    },
    {
      id: 2,
      title: "Graphic shop",
      image:
        "https://img.freepik.com/free-photo/man-jumping-while-doing-parkour_52683-108613.jpg?semt=ais_hybrid&w=740&q=80",
      link: "#",
    },
    {
      id: 3,
      title: "Matching sets",
      image:
        "https://img.freepik.com/free-photo/full-shot-fit-man-jumping-outdoors_23-2150189471.jpg?semt=ais_hybrid&w=740&q=80",
      link: "#",
    },
  ];

  return (
    <>
      <section className="Shop-page"  >
        <div className="container-xxl py-5 mt-5 ">
          <h5  className="fw-bold fs-3 mb-4"  style={{ fontFamily: "'Oswald', sans-serif" }}>  Shop by category</h5>
          <div className="row justify-content-center">
            {categories.map((cat) => (
              <div key={cat.id} className="col-md-4 col-sm-6 mb-4 text-center" style={{ textDecoration: "underline" }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="img-fluid"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                  }}
                />
                <a
                  href={cat.link}
                  className="d-block mt-2 fw-bold text-dark">
                  {cat.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopByCategory;
