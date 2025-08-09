import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import CreateSale from "./components/CreateSale/CreateSale";
import MySales from "./components/MySales/MySales";
import EditSale from "./components/EditSale/EditSale";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-sale" element={<CreateSale />} />
          <Route path="/my-sales" element={<MySales />} />
          <Route path="/edit-sale/:id" element={<EditSale />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
