"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSpinner from '../utils/useSpinner'
import { auth, fs, storage } from '../config'
import Select from 'react-select';
import { Products2 } from '../utils/Products2';

const options = [
    { value: 'book', label: 'Book' },
    { value: 'doc', label: 'Doc' },
    { value: 'image', label: 'Image' },
    { value: 'notes', label: 'Notes' },
    { value: 'pdf', label: 'Pdf' },
    { value: 'ppt', label: 'Ppt' },
    { value: 'pyq', label: 'Pyq' },
];

export default function Admin() {
    const router = useRouter()
    const [name, setDocName] = useState('');
    const [description, setDescription] = useState('');
    const [imageError, setImageError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [resource, setFile] = useState(null);
    const [filetype, setFileType] = useState('');
    const [loader, showLoader, hideLoader] = useSpinner();
    const [searchterm, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    const [selectedOption, setSelectedOption] = useState(null);
    const [customInput, setCustomInput] = useState('');

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

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleInputChange = (inputValue) => {
        setCustomInput(inputValue);
    };

    function handleFileChange(event) {
        const file = event.target.files[0];
        setFile(file);

        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop();
            setFileType(fileExtension);
        }
    }

    const uploadData = (e) => {
        e.preventDefault();
        showLoader();

        const storageRef = storage.ref();
        const timeStamp = String(Date.now());
        const filePathAndName = `Doc/Doc_${timeStamp}`;
        const fileRef = storageRef.child(filePathAndName);

        //Upload Doc
        fileRef.put(resource).then((snapshot) => {
            // Get the download URL of the uploaded doc
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                const downloadUri = downloadURL;

                // Create a new document in the Firestore collection "docs"
                // const db = firebase.firestore();
                const docsRef = fs.collection('docs').doc(timeStamp);
                const docsRefId = docsRef.id;

                // Create a data object with the fields to be stored in Firestore
                const data = {
                    docUri: downloadUri,
                    category: selectedOption.value,
                    doctype: filetype,
                    docid: docsRefId,
                    userid: uid,
                    title: name,
                    description: description
                };

                // Upload the data to Firestore
                docsRef.set(data)
                    .then(() => {
                        hideLoader();
                        setSuccessMsg('Document uploaded successfully');
                        setDocName('');
                        setDescription('');
                        setSelectedOption(null);
                        setFile(null);
                        setFileType('')
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000)
                    })
                    .catch((error) => {
                        hideLoader();
                        setErrorMsg('Error', error);
                        setDocName('');
                        setDescription('');
                        setSelectedOption(null);
                        setFile(null);
                        setFileType('')
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000)
                    });
            });
        }).catch((error) => {
            hideLoader();
            setErrorMsg('Error', error);
            setDocName('');
            setDescription('');
            setSelectedOption(null);
            setFile(null);
            setFileType('')
            setImageError('');
            setUploadError('');
            setTimeout(() => {
                setSuccessMsg('');
            }, 3000)
        });
    }

    const handleLogout = () => {
        auth.signOut().then(() => {

        }).catch(function (error) {

        });
    }


    const getProducts = async () => {
        const products = await fs.collection('ndocs').where('approved', '==', false).get();
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
        const querySnapshot = await fs.collection('ndocs').get();
    
        const searchResults = querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                data.ID = doc.id;
                return {
                    ...data,
                    title: data.title.toLowerCase(),
                };
            })
            .filter((product) => product.title.includes(lowerSearchTerm) && !product.approved);
    
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
            <div className="m-5" >
                <h1 className='text-semibold text-xl'> ADMIN PANEL</h1>
                <nav className="flex py-6 " aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <a href="/" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li aria-current="page" className="flex items-center">
      <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
      </svg>
      <a href="/profile" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
      <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Profile</span>
      </a>
    </li>
    <li aria-current="page" className="flex items-center">
      <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
      </svg>
      
      <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Admin</span>
    </li>
  </ol>
</nav>
                <Link href="/admin/upload">
                    <button className="w-48 md:w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                        Upload
                    </button>
                </Link>
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

                <Products2 products={products} addToCart={addToCart} />

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
