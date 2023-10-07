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
    <main className="container mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="text-center mb-8">Profile</h1>

      <div className="text-center">
        {user ? (
          <>
            <p>Welcome, {userName || "user"}</p>
            {isAdmin ? ( // Conditionally render the Admin button
              <div>
                <Link href="/admin">
                  <button className="w-48 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    Admin
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/donate">
                  <button className="w-48 md:w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    Donate
                  </button>
                </Link>
              </div>
            )}
            <div>
              <button
                onClick={handleLogout}
                className="w-48 md:w-64 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
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
          </>
        )}
      </div>

    </main>
  );
}
