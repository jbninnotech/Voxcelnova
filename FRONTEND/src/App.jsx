import React from "react";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import AppRouter from "./pages/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppRouter />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;