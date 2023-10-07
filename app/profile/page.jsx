import Link from 'next/link';
import React from 'react';

export default function Profile() {
  return (
    <main className="container mx-auto">
      <h1 className="text-center mb-8">Project Name</h1>
      
      <div className='flex flex-col space-y-4 items-center md:flex-row md:justify-center md:space-x-4 md:space-y-0'>
        <Link href="/login">
          <button className="w-48 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
            Login
          </button>
        </Link>
        
        <Link href="/register">
          <button className="w-48 md:w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
            Register
          </button>
        </Link>
      </div>
    </main>
  );
}
