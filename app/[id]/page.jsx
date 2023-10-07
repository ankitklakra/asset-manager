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
  const [msg, setMsg] = useState('');
  
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
            console.log('Document not found');
          }
        })
        .catch(function (error) {
          setMsg(error);
          console.log('Error fetching document:', error);
        });
    }
  }, [docid]);
  const datafile = [
    { uri: docuri },
  ];

  console.log(datafile);

  return (
    <div>
      <p>Title {title}</p>
      <DocViewer documents={datafile} pluginRenderers={DocViewerRenderers} />
      {msg}
    </div>
  );
}
