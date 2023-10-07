"use client";
import React, { useState, useEffect } from 'react'
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import { Products } from './utils/Products';
import { auth, fs, storage } from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function Home() {

  const [searchterm, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

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

  const handleSearch = async () => {
    const lowerSearchTerm = searchterm.toLowerCase();

    const querySnapshot = await fs.collection('docs').get();

    const searchResults = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        data.ID = doc.id;
        return {
          ...data,
          title: data.title.toLowerCase(),
        };
      })
      .filter((product) => product.title.includes(lowerSearchTerm));

    setProducts(searchResults);
    setCurrentPage(1);
  };
  // Calculate the index range for the current page.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  let Product;
  const addToCart = (product) => {

  }
  return (
    <main>
      <Navbar />
      {/* <Cards/> */}
      <div>
      
        <input type="text" placeholder="Search" className="input input-bordered rounded-lg  w-full max-w-lg"
          onChange={(e) => setSearch(e.target.value)} value={searchterm} />
        <button className='pe-6 mr-4' onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} className='text-gray-500 mr-2' />
        
        </button>
      </div>

      <Products products={products} addToCart={addToCart} />

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
