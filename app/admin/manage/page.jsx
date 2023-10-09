"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSpinner from '../../utils/useSpinner'
import { auth, fs, storage } from '../../config'
import { Products3 } from '../../utils/Products3';
export default function Manage() {
    const router = useRouter()

    const [loader, showLoader, hideLoader] = useSpinner();
    const [searchterm, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    function GetUserUid() {

        const [uid, setUid] = useState(null);
        useEffect(() => {
            showLoader();
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                    const docRef = fs.collection('Admin').doc(user.uid)
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log('success')
                            hideLoader();
                        } else {
                            console.log('not user')
                            router.push('/');
                            hideLoader();
                        }
                    })
                } else {
                    console.log('not user')
                    router.push('/');
                    hideLoader();
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserUid();

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
        productsArray.reverse();
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
                    description: data.description.toLowerCase(),
                };
            })
            .filter((product) => product.title.includes(lowerSearchTerm)|| product.description.includes(lowerSearchTerm) && !product.approved);

        setProducts(searchResults);
        setCurrentPage(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
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
            <nav className="flex py-6 ps-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
                            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li aria-current="page" className="flex items-center">
                        <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="/profile" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
                            <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Profile</span>
                        </a>
                    </li>
                    <li aria-current="page" className="flex items-center">
                        <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="/admin" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
                            <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Admin</span>
                        </a>
                    </li>

                    <li aria-current="page" className="flex items-center">
                        <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>

                        <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Manage</span>

                    </li>
                </ol>
            </nav>
            <div className="m-5" >
            <h1 className='flex justify-center m-5 text-2xl font-bold'>Manage Resources</h1>
                <div className="mb-3 ml-5 mr-5 ">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleKeyPress} // Add this line
                            value={searchterm}
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

                <Products3 products={products} addToCart={addToCart} />

                <div className="pagination pagination flex justify-center mb-4">
                    <button
                        className="btn btn-outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous Page
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastItem >= products.length}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </main>
    )
}
