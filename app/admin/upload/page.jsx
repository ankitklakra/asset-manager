"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSpinner from '../../utils/useSpinner'
import { auth, fs, storage } from '../../config'
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
    return (
        <main>
            <div className="m-5" >
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
                        <div className="text-black">
                            <Select
                                options={options}
                                isSearchable
                                required
                                value={selectedOption}
                                onChange={handleChange}
                                onInputChange={handleInputChange}
                                className="text-black" 
                            />
                        </div>
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
                {successMsg && <><div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{successMsg}</span>
                </div></>}
                {errorMsg && <><div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorMsg}</span>
                </div></>}
                {loader}
            </div>
        </main>
    )
}
