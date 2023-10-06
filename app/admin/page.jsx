"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSpinner from '../utils/useSpinner'
import { auth, fs, storage } from '../config'
import Select from 'react-select';

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

    const [name, setDocName] = useState('');
    const [description, setDescription] = useState('');
    const [imageError, setImageError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [filetype, setFileType] = useState('');
    const [loader, showLoader, hideLoader] = useSpinner();

    const [selectedOption, setSelectedOption] = useState(null);
    const [customInput, setCustomInput] = useState('');

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleInputChange = (inputValue) => {
        setCustomInput(inputValue);
    };

    function handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop();
            setFileType(fileExtension);
        }
    }

    const uploadData = () => {
        e.preventDefault();
        showLoader();

        const storageRef = storage.ref();
        const timeStamp = String(Date.now());
        const filePathAndName = `${filetype}/${fileName}${timeStamp}`;
        const fileRef = storageRef.child(filePathAndName);

        //Upload Doc
        fileRef.put(file).then((snapshot) => {
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
                    category: selectedOption,
                    doctype: filetype,
                    docid: docsRefId,
                    userid: uid,
                    title: title,
                    description: description
                };

                // Upload the data to Firestore
                docsRef.set(data)
                    .then(() => {
                        hideLoader();
                        setSuccessMsg('Document uploaded successfully');
                        setTitle('');
                        setDescription('');
                        document.getElementById('file').value = '';
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000)
                    })
                    .catch((error) => {
                        console.error('Error uploading document:', error);
                        hideLoader();
                        setTitle('');
                        setDescription('');
                        document.getElementById('file').value = '';
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000)
                    });
            });
        }).catch((error) => {
            console.error('Error uploading image:', error);
            hideLoader();
            setTitle('');
            setDescription('');
            document.getElementById('file').value = '';
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
    return (
        <main>
            <div >
                <br />
                
                <h1> ADMIN PANEL</h1>

                {/* <form className="form-group" onSubmit={handleLogout}>
                    <h1>
                        <span className="badge bg-secondary"> Admin Panel</span>
                        <button type="submit" className="btn btn-danger btn-md float-end">
                            LOGOUT
                        </button>
                    </h1>
                </form> */}
                <hr />
                {successMsg && (
                    <div className="success-msg">{successMsg}</div>
                )}
                <form autoComplete="off" className="form-group" onSubmit={uploadData}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Document Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required
                            onChange={(e) => setDocName(e.target.value)} value={name}></input>
                    </div>
                    <br />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Document Description</span>
                        </label>
                        <input type="text" placeholder="description" className="input input-bordered" required
                            onChange={(e) => setDescription(e.target.value)} value={description}></input>
                    </div>

                    <br />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Document Category</span>
                        </label>
                        <Select
                            options={options}
                            isSearchable
                            required
                            value={selectedOption}
                            onChange={handleChange}
                            onInputChange={handleInputChange}
                        />
                    </div>

                    <br />

                    <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        required onChange={handleFileChange} />

                    {/* {imageError && (
                        <>
                            <br />
                            <div className="error-msg">{imageError}</div>
                        </>
                    )} */}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-success btn-md">
                            SUBMIT
                        </button>
                    </div>
                </form>
                <br />
                {/* {uploadError && (
                    <>
                        <br />
                        <div className="error-msg">{uploadError}</div>
                    </>
                )} */}
                {loader}
            </div>
        </main>
    )
}
