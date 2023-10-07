import Link from 'next/link'
import React from 'react'

export default function Profile() {
  return (
    <main>
        <h1>Profile Page</h1>
        <Link href="/admin">
        <button className="btn btn-outline" >
          Admin 
        </button>
        </Link>
        <Link href="/login">
        <button className="btn btn-outline" >
          Login 
        </button>
        </Link>
        <Link href="/register">
        <button className="btn btn-outline" >
          Register 
        </button>
        </Link>
    </main>
  )
}
