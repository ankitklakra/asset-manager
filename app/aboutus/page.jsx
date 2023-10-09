"use client"
import React from 'react';
import konsimg from '../../public/images/kons.png'
import Image from 'next/image'

export default function Aboutus() {

  return (
    <div class="flex flex-wrap justify-center h-screen">
      <div class="w-full md:w-1/2 flex flex-col justify-center px-8 ">
        <div class="p-8">
          <h1 class="text-3xl font-bold mb-4">About Us</h1>
          <p class="text-gray-700 mb-4">Empowering Education, One Click at a Time!!!</p>
          <p class="text-gray-700 mb-4">Welcome to Study Share hub, the place where innovation
            meets education. We're a passionate team of Three
            individuals dedicated to simplifying and revolutionizing
            the way you access academic resources. Our mission is to
            bridge the gap between students and the materials they
            need to succeed in their educational journey.</p>
          <p class="text-gray-700 mb-4">We Koder kons , we form a dynamic team committed to
            making education accessible to all through our innovative
            Asset Manager platform.</p>
        </div>
      </div>
      {/* <div class="w-full md:w-1/2">
        <Image src={konsimg} alt="About Us Image" width={200}
          height={200} class="mt-10"></Image>
      </div> */}
      <div class="w-full md:w-1/2 flex flex-col justify-center px-8">
        <h1 class="text-3xl font-bold mb-4 text-center">Our Vision</h1>
        <p class="text-gray-700 mb-4 text-center">Our vision is simple yet powerful: to empower learners by providing a central hub where they can
          effortlessly access, share, and contribute to a treasure trove of educational materials. We believe that
          education should be inclusive, and everyone should have equal access to knowledge. With this vision, we
          aim to level the playing field, ensuring that no student is left behind due to a lack of resources.</p>
        <h2 class="text-2xl font-bold mb-4 text-center">Join Us in the Journey</h2>
        <p class="text-gray-700 mb-4 text-center">We invite you to be a part of this exciting journey of educational empowerment. Whether you're a
          student looking for resources or someone who wants to contribute and make a difference, Study Share
          Hub welcomes you with open arms.</p>
        <p class="text-gray-700 mb-4 text-center">Thank yo,u for choosing Study Share Hub as your trusted partner in your educational pursuits. Together,
          we'll shape a brighter future through accessible education.</p>
        <p class="text-gray-700 mb-4 text-center">Let's learn, share, and grow together!</p>
      </div>
      {/* <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Our Team</h2>
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <Image src="" alt="Profile Image" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold">John Doe</h3>
            <p class="text-gray-500">Role: Developer</p>
            <p class="text-gray-500">Career: 5 years</p>
          </div>
        </div>
        <div class="flex justify-between">
          <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg">View Profile</button>
          <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg">Contact</button>
        </div>
        <p class="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget tellus id ipsum consequat tincidunt. Nulla facilisi. Nunc nec placerat elit, vitae ullamcorper enim.</p>
      </div> */}
    </div>
  );
}
