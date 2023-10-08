"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth, fs } from '../config';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);

        // Fetch user's name from Firebase Firestore (assuming user's name is stored in Firestore)
        if (authUser) {
          const docRef = fs.collection('users').doc(authUser.uid);
          docRef.get().then((doc) => {
            if (doc.exists) {
              setUserName(doc.data().FullName);
            }
          });

          // Check if the user is an admin
          const adminDocRef = fs.collection('Admin').doc(authUser.uid);
          adminDocRef.get().then((doc) => {
            if (doc.exists) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          });
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setUserName(null);
        setIsAdmin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <div className=" bg-base-200">
    <div className="w-full p-8 ">
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
      <span className="ml-1 text-sm font-medium text-black-500 md:ml-2 dark:text-black-400">Profile</span>
    </li>
  </ol>
</nav>
<div className='cardcard p-8 w-full bg-base-100 shadow-xl bg-white-300'>



      <h1 className="text-center mb-8 font-extrabold pt-6">Profile</h1>

      <div className="text-center ">
      <div className="avatar">
      <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
 
      <img src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" alt="Dummy Profile Image Jpg, HD Png Download@kindpng.com"/>
</div>
</div>
        {user ? (
          <>
            <p className='font-semibold py-8 text-lg'>Welcome, {userName || "user"}</p>
            {isAdmin ? ( // Conditionally render the Admin button
              <div>
                <Link href="/admin">
                  <button className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    Admin
                  </button>
                </Link>
              </div>
            ) : (
              <div className=''>
               
                <Link href="/donate">
                  <button className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    Donate
                  </button>
                </Link>
              </div>
            )}
            <div className=''>
              <button
                onClick={handleLogout}
                className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
          <div className='py-8'>
            <div >
              <Link href="/login">
                <button className="w-48 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                  Login
                </button>
              </Link>
            </div>
            <div>
              <Link href="/register">
                <button className="w-48 md:w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                  Register
                </button>
              </Link>
            </div>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
    </div>
  );
}
