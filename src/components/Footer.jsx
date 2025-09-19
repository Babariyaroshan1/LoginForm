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
      <footer className="bg-white text-dark">
        {/* <div className="bg-dark text-white text-center py-3 d-flex justify-content-center align-items-center">
          <span className="me-3">Be the first to know about new arrivals</span>
          <button className="btn btn-danger" onClick={() => setIsDrawerOpen(true)}>
            Sign up
          </button>
        </div> */}

        <div className="container py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3 ">
              <h5 className="fw-bold mb-3">Help</h5>
              <ul className="list-unstyled small">
               <li><Link className="navbar-brand fs-6" to="/Home">Home</Link></li>
               <li><Link className="navbar-brand fs-6" to="#">About Us</Link></li>
               <li><Link className="navbar-brand fs-6" to="#">Service</Link></li>
               <li><Link className="navbar-brand fs-6" to="#">Career</Link></li>
               <li><Link className="navbar-brand fs-6" to="#">Blog</Link></li>
               <li><Link className="navbar-brand fs-6" to="#">Contact Us</Link></li>    
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3">Shop</h5>
              <ul className="list-unstyled small">
                <li><Link>Find a store</Link></li>
                <li><Link>Gift cards</Link></li>
                <li><Link>Shipping information</Link></li>
                <li><Link>Sale exclusions</Link></li>
                <li><Link>Custom uniforms</Link></li>
                <li><Link>Reconsidered</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3">About Us</h5>
              <ul className="list-unstyled small">
                <li><Link>Our Purpose</Link></li>
                <li><Link>Responsible leadership</Link></li>
                <li><Link>New Balance Foundation</Link></li>
                <li><Link>Careers</Link></li>
                <li><Link>The TRACK at New Balance</Link></li>
                <li><Link>Press box</Link></li>
                <li><Link>Medical Plan Information</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5 className="fw-bold mb-3">For You</h5>
              <ul className="list-unstyled small">
                <li><Link>Special discounts</Link></li>
                <li><Link>Idea submission</Link></li>
                <li><Link>Affiliate program</Link></li>
                <li><Link>Counterfeit products</Link></li>
                <li><Link>Accessibility statement</Link></li>
              </ul>
            </div>

            <div className="col-12 col-md-4 mb-4 text-center text-md-start">
              <h3 className="fw-bold mb-3 fst-italic ">Fearlessly Independent</h3>
              {/* <img
                src="https://www.newbalance.com/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dw3de6aa04/images/homepage/footer/logo.svg"
                alt="New Balance Logo"
                width="50"
                className="mb-3"
              />
              <p className="small footer-text">
                Independent since 1906, we empower people through sport and craftsmanship
                to create positive change in communities around the world.
              </p> */}
              <div className="d-flex justify-content-md-start gap-3 fs-4 mt-3">
                <Link to="#"><FaInstagram /></Link>
                <Link to="#"><FaXTwitter /></Link>
                <Link to="#"><FaYoutube /></Link>
                <Link to="#"><FaPinterest /></Link>
                <Link to="#"><FaTiktok /></Link>
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
