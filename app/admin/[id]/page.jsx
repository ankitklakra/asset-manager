"use client";
import React, { useState, useEffect } from 'react';
import { auth, fs, storage } from '../../config';
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, DownloadIcon, LinkIcon, TrashIcon } from "@heroicons/react/solid";


export default function Page() {

  const router = useRouter()
  const [title, setTitle] = useState('');
  const [desc, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [doctype, setDoctype] = useState('');
  const [docid, setDocid] = useState('');
  const [docuri, setDocuri] = useState(null);
  const [aprove, setApproved] = useState('');
  const [succmsg, setSuccessMsg] = useState('');
  const [errmsg, setErrorMsg] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Access the current URL
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    setDocid(lastPart);

    if (docid !== null && docid !== '') {
      fs.collection('ndocs')
        .doc(docid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setTitle(doc.data().title);
            setDescription(doc.data().description);
            setCategory(doc.data().category);
            setDoctype(doc.data().doctype);
            setDocuri(doc.data().docUri);
            setApproved(doc.data().approve);
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
  const handleApprove = () => {
    if (docid !== '') {
      // Update the document in the 'ndocs' collection
      fs.collection('ndocs')
        .doc(docid)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            const data = docSnapshot.data();

            // Update the document in the 'ndocs' collection
            fs.collection('ndocs')
              .doc(docid)
              .update({
                approved: true, // Set the 'approve' field to true
              })
              .then(() => {
                // Document successfully updated
                console.log('Document approved successfully.');
                setApproved(true); // Update the local state

                // Copy the document to the 'docs' collection
                fs.collection('docs')
                  .doc(docid)
                  .set(data)
                  .then(() => {
                    fs.collection('docs')
                      .doc(docid)
                      .update({
                        approve: true, // Set the 'approve' field to true
                      }).then(() => {
                        console.log('Document copied to "docs" collection.');
                        setSuccessMsg('Document Approved Successfuly');
                        setTimeout(() => {
                          setSuccessMsg('');
                          router.push('/admin');

                        }, 1000)
                      }).catch((error) => {
                        console.error('Error copying document to "docs" collection:', error);
                        setErrorMsg('Error approving document: ' + error.message);

                      });
                  })
                  .catch((error) => {
                    console.error('Error copying document to "docs" collection:', error);
                    setErrorMsg('Error approving document: ' + error.message);
                  });
              })
              .catch((error) => {
                console.error('Error approving document:', error);
                setErrorMsg('Error approving document: ' + error.message);
              });
          } else {
            setErrorMsg('Document not found');
            setTimeout(() => {
              setErrorMsg('');
              router.push('/admin');
              hideLoader();
            }, 1000)
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
          setErrorMsg('Error fetching document: ' + error.message);
        });
    } else {
      setErrorMsg('Document ID is not valid.');
      setTimeout(() => {
        setErrorMsg('');
        router.push('/admin');
        hideLoader();
      }, 1000)
    }
  };
  const handleDelete = () => {
    if (docid !== '') {
      // Delete the document from 'ndocs' collection
      fs.collection('ndocs')
        .doc(docid)
        .delete()
        .then(() => {
          // Document successfully deleted
          console.log('Document deleted successfully.');

          // If you want to delete it from the 'docs' collection as well, uncomment the following lines:
          // fs.collection('docs')
          //   .doc(docid)
          //   .delete()
          //   .then(() => {
          //     console.log('Document deleted from "docs" collection.');
          //   })
          //   .catch((error) => {
          //     console.error('Error deleting document from "docs" collection:', error);
          //   });

          setSuccessMsg('Document Deleted Successfully');
          setTimeout(() => {
            setSuccessMsg('');
            router.push('/admin');

          }, 1000)
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
          setErrorMsg('Error deleting document: ' + error.message);
        });
    } else {
      setErrorMsg('Document ID is not valid.');
      setTimeout(() => {
        setErrorMsg('');
        router.push('/admin');
      }, 1000)
    }
  };
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
      <nav className="flex py-6 ps-8 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/admin" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-black">
              <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Admin panel
            </a>
          </li>
          <li aria-current="page" className="flex items-center">
            <svg className="w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Resource </span>
          </li>
        </ol>
      </nav>
      {/* {copySuccess && <><div className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Link copied to clipboard!</span>
      </div></>} */}
      {errmsg && <><div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errmsg}</span>
      </div></>}
      {succmsg && <><div className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{succmsg}</span>
      </div></>}

      <p className='text-left justify-start ps-8 py-8 font-bold'>Title: {title}</p>

      <div className="border-4 border-sky-500 mt-10 ml-5 mr-5 mb-5 ">
        {renderFile()}
      </div>
      <p className='text-left font-medium px-8 sm:text-center md:text-right lg:text-justify xl:text-center'>Description: {desc}</p>

      <div className='flex justify-end' >
        <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-3 ps-8 ' onClick={handleApprove} >
          <button
            type="button"
            className="hidden sm:inline-flex items-center text-white bg-purple-700 hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 "

          >
            <CheckCircleIcon className="w-5 h-5 mr-2" /> Approve
          </button>
          <CheckCircleIcon className="w-5 h-5 text-purple-700 sm:hidden" />
        </div>

        <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-3' onClick={handleDownload}>
          <button
            type="button"
            className="hidden sm:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "

          >
            <DownloadIcon className="w-5 h-5 mr-2" /> Download
          </button>
          <DownloadIcon className="w-5 h-5 text-blue-700 sm:hidden" />
        </div>

        <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-3' onClick={handleCopyLink} >
          <button
            type="button"
            className="hidden sm:inline-flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
            <LinkIcon className="w-5 h-5 mr-2" /> Copy Link
          </button>
          <LinkIcon className="w-5 h-5 text-green-700 sm:hidden" />
        </div>

        <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-3' onClick={handleDelete}>
          <button
            type="button"
            className="hidden sm:inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 "

          >
            <TrashIcon className="w-5 h-5 mr-2" /> Delete
          </button>
          <TrashIcon className="w-5 h-5 text-red-700 sm:hidden" />
        </div>
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
