import './App.css';
import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";

function App() {

  useEffect(() => {
    WebFont.load({    // Gets google fonts so that you don't have to import them in index.html
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      
      <Route exact path="/" component={Home} /> 
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} /> 
      <Route path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />

      <Footer />
    </Router>
  );
}

export default App;