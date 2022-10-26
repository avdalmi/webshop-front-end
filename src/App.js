import "./App.css";
import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import Cart from "./pages/Cart";
import { useState } from "react";

function App() {
    const [shoppingCart, setShoppingCart] = useState(undefined);

    return (
        <>
            <NavBar shoppingCart={shoppingCart} />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<Shop />} />
                <Route
                    path="/details/:id/*"
                    element={
                        <DetailsPage
                            shoppingCart={shoppingCart}
                            setShoppingCart={setShoppingCart}
                        />
                    }
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            shoppingCart={shoppingCart}
                            setShoppingCart={setShoppingCart}
                        />
                    }
                />
            </Routes>

            {/* <Footer /> */}
        </>
    );
}

export default App;
