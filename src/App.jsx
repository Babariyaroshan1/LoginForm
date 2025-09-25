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
          <Route path="/" element={<Loginpage setUser={setUser} />} />
          <Route path="/loginpage" element={<Loginpage setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {user && (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/Home" element={<ThirdKitsSlider />} />
              <Route path="/Home" element={<SportSlider />} />
              <Route path="/Home" element={<Featured />} />
              <Route path="/Home" element={<ShopByCategory />} />
              <Route path="/Home" element={<Poster />} />
              <Route path="/Home" element={<Footer />} />
            </>
          )}
        </Routes>
      </main>

    </>
  );
};

export default App;
