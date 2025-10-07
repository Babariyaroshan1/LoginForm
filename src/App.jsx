import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Loginpage from "./components/Loginpage";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopByCategory from "./components/ShopByCategory";
import Poster from "./components/Poster";
import SportSlider from "./components/SportSlider";
import Featured from "./components/Featured";
import ThirdKitsSlider from "./components/ThirdKitsSlider";
import ThirdKitsViewAll from "./components/ThirdKitsViewAll";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/loginpage" element={<Loginpage setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {user && (
            <>
              {/* Home Routes */}
              <Route path="/Home" element={<Home />} />
              <Route path="/Home/thirdkits" element={<ThirdKitsSlider />} />
              <Route path="/Home/sport" element={<SportSlider />} />
              <Route path="/Home/featured" element={<Featured />} />
              <Route path="/Home/category" element={<ShopByCategory />} />
              <Route path="/Home/poster" element={<Poster />} />
              <Route path="/Home/footer" element={<Footer />} />
              <Route path="/third-kits" element={<ThirdKitsViewAll />} />

            </>
          )}
        </Routes>
      </main>
    </>
  );
};

export default App;
