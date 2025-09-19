import React from "react";

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      title: "The RC Short",
      image:
        "https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dwd9a83383/images/page-designer/2025/BTS/Comp_I/NB-3811_Comp_I1_Image_RCShorts.jpg?sw=538&sfrm=jpg", 
      link: "The RC Short",
    },
    {
      id: 2,
      title: "Graphic shop",
      image:
        "https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dw8b2840fd/images/page-designer/2025/BTS/Comp_I/NB-3811_Comp_I1_Image_WomenRunning.jpg?sw=538&sfrm=jpg",
      link: "Graphic shop",
    },
    {
      id: 3,
      title: "Matching sets",
      image:
        "https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dwb2f5fb89/images/page-designer/2025/BTS/Comp_I/NB-3811_Comp_I1_Image_MatchingSets.jpg?sw=538&sfrm=jpg", 
      link: "Matching sets",
    },
  ];

  return (
    <div className="container-xxl my-5">
      <h5 className="fw-bold  mb-4">Shop by category</h5>
      <div className="row justify-content-center">
        {categories.map((cat) => (
          <div key={cat.id} className="col-md-4 col-sm-6 mb-4 text-center" style={{textDecoration :"underline"}}>
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
              className="d-block mt-2 fw-bold text-dark text-decoration-none"
            >
              {cat.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
