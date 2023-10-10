"use client"
import React from 'react';
import konsimg from '../../public/images/kons.png'
import Image from 'next/image'
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Aboutus() {

  return (
    <main>
      <Navbar />
      <div class="flex flex-wrap justify-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-8">
            <h1 class="text-3xl font-bold mb-4 text-center">About Us</h1>
            <p class="text-gray-700 mb-4 text-center">Empowering Education, One Click at a Time!!!</p>
            <p class="text-gray-700 mb-4 text-center">Welcome to Study Share hub, the place where innovation
              meets education. We're a passionate team of Three
              individuals dedicated to simplifying and revolutionizing
              the way you access academic resources. Our mission is to
              bridge the gap between students and the materials they
              need to succeed in their educational journey.</p>
            <p class="text-gray-700 mb-4 text-center">We Koder kons , we form a dynamic team committed to
              making education accessible to all through our innovative
              Asset Manager platform.</p>
          </div>
        </div>
        {/* <div class="w-full md:w-1/2">
        <Image src={konsimg} alt="About Us Image" width={200}
          height={200} class="mt-10"></Image>
      </div> */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div class="p-8">
            <h1 class="text-3xl font-bold mb-4 text-center">Our Vision</h1>
            <p class="text-gray-700 mb-4 text-center">Our vision is simple yet powerful: to empower learners by providing a central hub where they can
              effortlessly access, share, and contribute to a treasure trove of educational materials. We believe that
              education should be inclusive, and everyone should have equal access to knowledge. With this vision, we
              aim to level the playing field, ensuring that no student is left behind due to a lack of resources.</p>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div class="p-8">
            <h1 class="text-3xl font-bold mb-4 text-center">Join Us in the Journey</h1>
            <p class="text-gray-700 mb-4 text-center">We invite you to be a part of this exciting journey of educational empowerment. Whether you're a
              student looking for resources or someone who wants to contribute and make a difference, Study Share
              Hub welcomes you with open arms.</p>
            <p class="text-gray-700 mb-4 text-center">Thank you, for choosing Study Share Hub as your trusted partner in your educational pursuits. Together,
              we'll shape a brighter future through accessible education.</p>
            <p class="text-gray-700 mb-4 text-center">Let's learn, share, and grow together!</p>
          </div>
        </div>
        <div class=" py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
              <p class="text-gray-600">Meet the talented individuals behind the study share hub.</p>
            </div>
            <div class="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <Image width="500" height="500" src="https://media.licdn.com/dms/image/D5603AQH7LpmkeQhSew/profile-displayphoto-shrink_800_800/0/1691935317507?e=1702512000&v=beta&t=G3xo_cSMoN-s0iRYg9WoI89lQuNNItlrHLC9qTsVyC4" alt="Team Member 1" class="w-full h-64 object-cover" />
                <div class="px-6 py-4">
                  <h3 class="text-lg font-semibold text-gray-800">Ankit Lakra</h3>
                  <p class="text-gray-600">Full Stack</p>
                  <div class="mt-5">
                    <Link href="https://www.linkedin.com/in/ankitklakra/">
                      <button className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                        Linkedin
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <Image width="500" height="500" src="https://media.licdn.com/dms/image/D4D35AQE-RfXm_c38wQ/profile-framedphoto-shrink_800_800/0/1668793956410?e=1697544000&v=beta&t=ha39aiADHCsUhlD3dhkBHh8U0eTTex6dn_wbtKUi5zo" alt="Team Member 2" class="w-full h-64 object-cover" />
                <div class="px-6 py-4">
                  <h3 class="text-lg font-semibold text-gray-800">Ankit Pandey</h3>
                  <p class="text-gray-600">Designing</p>
                  <div class="mt-5">
                    <Link href="https://www.linkedin.com/in/ankitpandey1576/">
                      <button className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                        Linkedin
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <Image width="500" height="500" src="https://media.licdn.com/dms/image/D4D03AQFegl_80cA7bw/profile-displayphoto-shrink_800_800/0/1696274306485?e=1702512000&v=beta&t=2A3gdaXy0VSwn8NgDfdSFwOrY69WLGD0pCeGMR7XmuE" alt="Team Member 3" class="w-full h-64 object-cover" />
                <div class="px-6 py-4 ">
                  <h3 class="text-lg font-semibold text-gray-800">Govind Purty</h3>
                  <p class="text-gray-600">Front-End</p>
                  <div class="mt-5" >
                    <Link href="https://www.linkedin.com/in/govindpurty/">
                      <button className="w-45 sm:px-6 sm:py-3 md:w-64 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                        Linkedin
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" py-10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div class="text-center pb-">
              <h2 class="text-3xl font-bold mb-4">Our Commitment</h2>
            </div>
            <div class="flex flex-wrap justify-center py-8">
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">Quality</h3>
                <p>We are committed to
                  maintaining the highest
                  standards of quality. All
                  materials on our platform go
                  through a rigorous review
                  process to ensure their
                  accuracy and relevance.</p>
              </div>
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">Community</h3>
                <p>We value the sense of
                  community and collaboration.
                  Our platform thrives on the
                  collective wisdom and
                  generosity of our users</p>
              </div>
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">Innovation</h3>
                <p>We are dedicated to
                  continuous improvement and
                  innovation. We'll never stop
                  finding new ways to enhance
                  your learning experience</p>
              </div>
            </div>
          </div>
        </div>
        <div class=" py-10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div class="text-center">
              <h2 class="text-3xl font-bold mb-4">FAQs</h2>
            </div>
            <div class="flex flex-wrap justify-center py-8">
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">How can I upload
                  materials to the
                  platform?</h3>
                <p>Uploading materials is easy!
                  First, make sure you're logged
                  in to your account. Then,
                  navigate to the "Upload"
                  section, where you can provide
                  the necessary details about the
                  material, attach the file, and
                  submit it. Our team will review
                  and approve it before making
                  it available to the community.</p>
              </div>
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">What types of
                  materials can I find
                  on this platform?</h3>
                <p>Our platform hosts a wide
                  range of educational resources.
                  You can find lecture notes,
                  past year question papers,
                  textbooks, study guides, and
                  more. We're continuously
                  expanding our library to cater
                  to diverse learning needs.</p>
              </div>
              <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <h3 class="text-xl font-semibold mb-2">Is my personal
                  information safe
                  with you?</h3>
                <p>Yes, your privacy is important
                  to us. We take data security
                  seriously and adhere to strict
                  privacy policies. Your personal
                  information will never be
                  shared or sold to third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
