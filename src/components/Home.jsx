import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ShopByCategory from "./ShopByCategory";
import Poster from "./Poster";
import Footer from "./Footer";
import Featured from "./Featured";
import SportSlider from "./SportSlider";
import ThirdKitsSlider from "./ThirdKitsSlider";

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="hero-supertext">
          <div className=" text-center hero-shoptextuper">
            <span>New Styles On Sale: Up To 40% Off
              <br />
              <a href="" className="text-dark fw-bold hero-shoptext">Shop All Our New Markdowns</a> </span>
          </div>
        </div>
        <div className="home-page">
          <div className="hero-section"></div>

          <div className="text-center">
            <p className="subtitle mt-5">Only one way to find out.</p>
            <h1 className="title">JUST DO IT.</h1>
            <Link to="#shop-by-category" className="btn shop-btn1">
              Shop
            </Link>
          </div>
        </div>

        <section id="shop-by-category" >
          <ShopByCategory />
        </section>
      </section>

      <section id="Poster" >
        <Poster />
      </section>

      <section id="Featured" >
        <Featured />
      </section>

      <section id="ThirdKitsSlider" >
        <ThirdKitsSlider />
      </section>

      <section id="services" >
        <SportSlider />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </>
  );
};

export default Home;
