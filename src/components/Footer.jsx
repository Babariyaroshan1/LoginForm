import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaYoutube, FaPinterest, FaTiktok } from "react-icons/fa6";
import "./Footer.css";

function FooterPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setStatus("subscribed");
    }
  };

  return (
    <>
      <footer className=" text-light footer-page-firsttext" >
        <div className="bg-dark text-white text-center py-3 d-flex justify-content-center align-items-center">
          <span className="me-3">Be the first to know about new arrivals</span>
          <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
            Sign up
          </button>
        </div>

        <div className="container py-5  ">
          <div className="row">
            <div className="col-6 col-md-2 mb-3 ">
              <h5 className="fw-bold mb-3 head-link">Help</h5>
              <ul className="list-unstyled small ">
                <li><Link className="navbar-brand fs-6 footer-link " to="/Home">Home</Link></li>
                <li><Link className="navbar-brand fs-6 footer-link " to="#">About Us</Link></li>
                <li><Link className="navbar-brand fs-6 footer-link " to="#">Service</Link></li>
                <li><Link className="navbar-brand fs-6 footer-link " to="#">Career</Link></li>
                <li><Link className="navbar-brand fs-6 footer-link " to="#">Blog</Link></li>
                <li><Link className="navbar-brand fs-6 footer-link " to="#">Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3 head-link">Shop</h5>
              <ul className="list-unstyled small">
                <li><Link className="footer-link ">Find a store</Link></li>
                <li><Link className="footer-link ">Gift cards</Link></li>
                <li><Link className="footer-link ">Shipping information</Link></li>
                <li><Link className="footer-link ">Sale exclusions</Link></li>
                <li><Link className="footer-link ">Custom uniforms</Link></li>
                <li><Link className="footer-link ">Reconsidered</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3 head-link">About Us</h5>
              <ul className="list-unstyled small">
                <li><Link className="footer-link ">Our Purpose</Link></li>
                <li><Link className="footer-link ">Responsible leadership</Link></li>
                <li><Link className="footer-link ">New Balance Foundation</Link></li>
                <li><Link className="footer-link ">Careers</Link></li>
                <li><Link className="footer-link ">The TRACK at New Balance</Link></li>
                <li><Link className="footer-link ">Press box</Link></li>
                <li><Link className="footer-link ">Medical Plan Information</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3 head-link">For You</h5>
              <ul className="list-unstyled small">
                <li><Link className="footer-link ">Special discounts</Link></li>
                <li><Link className="footer-link ">Idea submission</Link></li>
                <li><Link className="footer-link ">Affiliate program</Link></li>
                <li><Link className="footer-link ">Counterfeit products</Link></li>
                <li><Link className="footer-link ">Accessibility statement</Link></li>
              </ul>
            </div>

            <div className="col-12 col-md-4 mb-4 text-center text-md-start">
              <h3 className="fw-bold mb-3  text-dark fst-italic ">Fearlessly Independent</h3>
              <Link className="navbar-brand fw-bold text-dark" to="#" style={{ fontFamily: "Verdana, Geneva, sans-serif", }}>
                <svg aria-hidden="true" className="swoosh-svg" focusable="false" viewBox="0 0 24 24" role="img" width="100" height="80" fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd" />
                </svg>
              </Link>
              <p className="small  text-dark footer-text">
                Independent since 1906, we empower people through sport and craftsmanship
                to create positive change in communities around the world.
              </p>
              <div className="d-flex justify-content-md-start gap-3 fs-4 mt-3">
                <Link to="#" className="footer-link-social"><FaInstagram /></Link>
                <Link to="#" className="footer-link-social"><FaXTwitter /></Link>
                <Link to="#" className="footer-link-social"><FaYoutube /></Link>
                <Link to="#" className="footer-link-social"><FaPinterest /></Link>
                <Link to="#" className="footer-link-social"><FaTiktok /></Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className={`subscribe-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header d-flex justify-content-between align-items-center">
          <button className="btn-close" onClick={() => setIsDrawerOpen(false)}></button>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <img
            src="https://www.newbalance.com/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dw3de6aa04/images/homepage/footer/logo.svg"
            alt="NB Logo"
            width="60"
          />
        </div>

        <div className="subscribe-title mx-auto mt-4 mb-5 text-center">
          {status === "form" && (
            <>
              <h4 className="fw-bold">Be the first to know about new arrivals.</h4>
              <p className="mt-3 text-muted">Sign up to get updates delivered to your inbox.</p>
            </>
          )}

          {status === "subscribed" && (
            <h4 className="fw-bold ">Thanks. Keep an eye on your inbox.</h4>
          )}
        </div>

        {status === "form" && (
          <form className="mt-4" onSubmit={handleSubscribe}>
            <label className="fw-bold small">Enter Email Address</label>
            <input
              type="email"
              className="form-control mb-3 border-danger"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="nb-button button-secondary w-100 my-3"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}

        {status === "subscribed" && (
          <div className="mt-4 text-center">
            <p className="text-muted">{email}</p>
            <h6 className="text-success fw-bold">Subscribed!</h6>
          </div>
        )}

        <div className="mt-4 small fs-bold">
          By subscribing, I am agreeing to the New Balance{" "}
          <Link to="#" className="footer-link">Privacy Policy</Link> and{" "}
          <Link to="#" className="footer-link">Terms & Conditions</Link>.
        </div>


        {status === "subscribed" && (
          <div className="mt-3">
            <button
              className="btn btn-link text-decoration-underline text-dark p-0"
              onClick={() => {
                setStatus("form");
                setEmail("");
              }}
            >
              Unsubscribe
            </button>
          </div>
        )}
      </div>

      {isDrawerOpen && <div className="overlay" onClick={() => setIsDrawerOpen(false)}></div>}
    </>
  );
}

export default FooterPage;



