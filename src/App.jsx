import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StorePage from "./pages/StorePage";
import AdminPage from "./pages/AdminPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Cart from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/storepage" element={<StorePage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route
          path="/productdetailspage/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/cartpage" element={<Cart />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
