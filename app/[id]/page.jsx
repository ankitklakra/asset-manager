"use client";
import React, { useState, useEffect } from 'react';
import { auth, fs, storage } from '../config';

export default function Page() {

  const [title, setTitle] = useState('');
  const [desc, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [doctype, setDoctype] = useState('');
  const [docid, setDocid] = useState('');
  const [docuri, setDocuri] = useState(null);
  const [errmsg, setErrorMsg] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    setDocid(lastPart);

    if (docid !== null && docid !== '') {
      fs.collection('docs')
        .doc(docid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setTitle(doc.data().title);
            setDescription(doc.data().description);
            setCategory(doc.data().category);
            setDoctype(doc.data().doctype);
            setDocuri(doc.data().docUri);
          } else {
            setErrorMsg('Document not found');
          }
        })
        .catch(function (error) {
          setErrorMsg(error);
          console.log('Error fetching document:', error);
        });
    }
  }, [docid]);

  const handleDownload = () => {
    // You can open the file in a new tab/window for viewing or download
    if (docuri) {
      window.open(docuri, '_blank');
    }
  };

  const handleCopyLink = () => {
    document.getElementById('my_modal_3').showModal()
    if (docuri) {
      navigator.clipboard.writeText(docuri).then(
        function () {
          setCopySuccess(true);
        },
        function (err) {
          console.error('Unable to copy link: ', err);
        }
      );
    }
  };
  // ...

  const renderFile = () => {
    if (docuri) {
      if (doctype === 'pdf') {
        return (
          <iframe
            src={docuri}
            width="100%"
            height="600px"
            frameBorder="0"
            title="PDF Viewer"
          ></iframe>
        );
      } else if (['jpg', 'jpeg', 'png'].includes(doctype)) {
        return <img src={docuri} width="100%" alt={title} />;
      }
    }
  };

  return (
    <div >
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
            <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">RESOURCES</span>
          </li>
        </ol>
      </nav>
      {errmsg && <><div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errmsg}</span>
      </div></>}
      <p className='text-left justify-start ps-8 py-8 font-bold'> {title}</p>

      <div className="border-4 border-sky-500 mt-10 ml-5 mr-5 mb-5 ">
        {renderFile()}
      </div>

      <p className='text-left font-medium px-8 sm:text-center md:text-right lg:text-justify xl:text-center'>Description: {desc}</p>
      <div className='flex justify-end pr-8'>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none
       focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 
       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={handleDownload}>Download</button>
        <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none 
      focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 
      dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={handleCopyLink}>Copy Link</button>

      </div>
      
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-4">Link copied to clipboard!</p>
        </div>
      </dialog>
    </div>

  );
}
