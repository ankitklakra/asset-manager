"use client";
import React, { useState,useEffect } from 'react'
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import { Products } from './utils/Products';
import { auth, fs, storage } from './config'
export default function Home() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    const products = await fs.collection('docs').get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  let Product;
  const addToCart = (product) => {

  }
  return (
    <main>
      <Navbar/>
      {/* <Cards/> */}
      <Products products={products} addToCart={addToCart} />
    </main>
  )
}
