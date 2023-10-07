"use client";
import React, { useState, useEffect } from 'react';
import { auth, fs, storage } from '../config';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
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
    // Access the current URL
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

  return (
    <div>
      {copySuccess && <><div className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Link copied to clipboard!</span>
      </div></>}
      {errmsg && <><div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errmsg}</span>
      </div></>}

      <p>Title {title}</p>
      <p>Description {desc}</p>

      <button className="btn btn-outline btn-info" onClick={handleDownload}>Download</button>
      <button className="btn btn-outline btn-success" onClick={handleCopyLink}>Copy Link</button>

      <div className="m-20">
        {docuri && (
          <iframe
            src={docuri}
            width="100%"
            height="600px"
            frameBorder="0"
            title="Document Viewer"
          ></iframe>
        )}
      </div>


    </div>
  );
}
