"use client";
import React from 'react'
import { auth, fs, storage } from '../config'
import Link from 'next/link';


export default function Navbar() {
    const handleLogout = () => {
        auth.signOut().then(() => {
            
        }).catch(function (error) {
           
        });
    }
    return (
        <main>
            <div className="navbar bg-base-100">
                
               <div className='flex-1'>  
            <img className='m-5' src="https://firebasestorage.googleapis.com/v0/b/studysharenit.appspot.com/o/logo3.png?alt=media&token=a0fd079d-db10-4ff8-8adb-7bf95da7cdc7&_gl=1*4amk3y*_ga*MTc1ODI1NDk3My4xNjYyNzk1Nzk5*_ga_CW55HF8NVT*MTY5Njc5MTUyNC44Ny4xLjE2OTY3OTI2MTAuNDQuMC4w " alt="Logo" />
            </div>  
                <div className="flex-none gap-2">
                    {/* <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div> */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                              <Link href="/profile"> <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" /> </Link> 
                            </div>
                        </label>
                        {/* <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </main>
    )
}
