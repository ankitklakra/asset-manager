"use client"
import React, { useState, useEffect } from 'react';
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import { Products } from './utils/Products';
import { auth, fs, storage } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [searchterm, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const getProducts = async () => {
    const products = await fs.collection('docs').get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data
      });
    }
    setProducts(productsArray);
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

  // Calculate the range of items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = (product) => {
    // Implement your cart logic here
  };

  return (
    <main>
      <Navbar />
      
      <div className="mb-3 ml-5 mr-5 ">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          onChange={(e) => setSearch(e.target.value)} value={searchterm}
        />

        <button
          className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      </div>
      <Products products={currentItems} addToCart={addToCart} />

      <div  className="pagination pagination flex justify-center mb-4 gap-2">
        <button
          className="join-item btn btn-outline ps-4 py-1"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="join-item btn btn-outline "
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= products.length}
        >
          Next Page
        </button>
      </div>
    </main>
  );
}
