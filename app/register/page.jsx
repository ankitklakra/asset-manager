"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSpinner from '../utils/useSpinner'
import { auth, fs, storage } from '../config'
export default function Register() {
    const router = useRouter()
    var date = new Date();
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loader, showLoader, hideLoader] = useSpinner();

    const handelRegister = (e) => {
        e.preventDefault();
        showLoader();
        const uref = auth.createUserWithEmailAndPassword(email, password)
        uref.then((credentials) => {
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullname,
                Email: email,
                Password: password,
                Created: date
            }).then(() => {
                setSuccessMsg('Registration Successfull.');
                setFullName('');
                setErrorMsg('');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    setSuccessMsg('');
                    hideLoader();
                    router.push('/');

                }, 1000)
            })
        }).catch(err => setErrorMsg(err.message)).then(() => hideLoader());

    }
    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6"></p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" autoComplete="off" onSubmit={handelRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" required
                                    onChange={(e) => setFullName(e.target.value)} value={fullname}></input>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required
                                    onChange={(e) => setEmail(e.target.value)} value={email}></input>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required
                                    onChange={(e) => setPassword(e.target.value)} value={password}></input>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                            <div>
                                Already have an account? <Link href="/login"><a className="link link-info"> login here </a> </Link>
                            </div>
                            {successMsg && <><div className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{successMsg}</span>
                            </div></>}
                            {errorMsg && <><div className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errorMsg}</span>
                            </div></>}
                        </form>
                    </div>
                    {loader}
                </div>
            </div>
        </main>
    )
}
