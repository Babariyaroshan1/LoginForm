import React from "react";
import "./Home.css"; 
import ShopByCategory from "./ShopByCategory";
import FreshFoam from "./FreshFoam";
import Footer from "./Footer";
  
const Home = () => {
  return (
    <div className="">
      <div id="carouselExampleCaptions" data-bs-ride="carousel" className="carousel slide" data-bs-interval="3000" >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://img.freepik.com/free-photo/workplace-office-with-laptop-coffee-dark-room-night_169016-47422.jpg?t=st=1758195760~exp=1758199360~hmac=cf9221f7e8004f3971a53f39f699712c659f7de121288471c5dafeec3c8da4f4&w=1480" className="d-block slider-img" alt="..." />
            <div className="carousel-caption custom-caption">
              <h1>Step Into the Future</h1>
              <p>Experience next-level virtual reality gaming like never before.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://img.freepik.com/free-photo/black-laptop-screen-dark-room-night_169016-58233.jpg?t=st=1758192311~exp=1758195911~hmac=af9326d4d3f0bd5a052f336fbfe14de290077cfb0c5711f84f92b6c51540be62&w=1480" className="d-block slider-img" alt="..." />
            <div className="carousel-caption custom-caption d-none d-md-block">
              <h1>Creative Web Solutions</h1>
              <p>Modern, responsive, and user-friendly designs built for your success.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://img.freepik.com/free-photo/top-view-laptop-table-glowing-screen-dark_169016-53642.jpg?t=st=1758192395~exp=1758195995~hmac=7e9e72d7cfa2fa5860676533d4f1be01bc35303b7862a810e6f0a91a71610043&w=1480" className="d-block slider-img" alt="..." />
            <div className="carousel-caption custom-caption d-none d-md-block">
              <h1>Smart Development</h1>
              <p>From coding to testing, we bring innovative solutions to life.</p>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section id="shop-by-category" className="mb-4">
        <ShopByCategory />
      </section>

      <section id="freshfoam" className="mb-4">
        <FreshFoam />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
