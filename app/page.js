"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const brandCard =
    "h-16 w-24 border rounded hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-500";

  return (
    <div>
      <section className="">
        <div className="px-4 m-4 text-gray-800">
          <div>
            <h2 className="text-lg">
              Budspot is a price comparison website specifically for earbuds.
              The project was inspired by{" "}
              <span className="font-bold">PriceRunner</span> and developed as
              coursework to demonstrate expertise in{" "}
              <span className="font-bold">Enterprise Java</span>,{" "}
              <span className="font-bold">Multithreading</span>, and the{" "}
              <span className="font-bold">Spring Framework</span>. Check out a
              specific product by making a simple search.
            </h2>
            {!showMore && (
              <button
                onClick={() => setShowMore(true)}
                className="text-blue-500 hover:text-black mt-2"
              >
                {" "}
                more...
              </button>
            )}

            {showMore && (
              <h2 className="text-lg mt-2">
                It features advanced web scraping using{" "}
                <span className="font-bold">Selenium</span> and{" "}
                <span className="font-bold">Java</span>, with data securely
                stored in an <span className="font-bold">SQL</span> database. To
                ensure efficient handling of large search results, pagination is
                implemented when more than 10 products are found. The backend is
                powered by a <span className="font-bold">REST API</span> built
                with <span className="font-bold">Express.js</span>, seamlessly
                running within the <span className="font-bold">Next.js</span>{" "}
                environment.
                <br />
              </h2>
            )}
          </div>

          <Image
            src="/people.jpg"
            alt="banner"
            className="md:w-[100%] md:h-[50%] mt-4 md:px-24"
            width={750}
            height={400}
            priority={true}
          />
          <hr className="my-4 border-gray-300" />

          <div className="py-4">
            <h2 className="text-2xl flex justify-center items-center">
              Test comparison
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 justify-center items-center text-lg p-2">
             <Link href="/product/147">
                <button className={`${brandCard} p-1 m-4`}>Product 147</button>
              </Link>

              <Link href="/product/149">
                <button className={`${brandCard} p-1 m-4`}>Product 149</button>
              </Link>

              <Link href="/product/150">
                <button className={`${brandCard} p-1 m-4`}>Product 150</button>
              </Link>

              <Link href="/product/192">
                <button className={`${brandCard} p-1 m-4`}>Product 192</button>
              </Link>

              <Link href="/product/193">
                <button className={`${brandCard} p-1 m-4`}>Product 193</button>
              </Link>
            </div>
            <hr className="my-4 border-gray-300" />

            <h2 className="text-2xl flex justify-center items-center pt-4">
              Explore popular brands!
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-6 md:justify-center items-center text-lg py-2">
              <Link href="/product">
                <button className={`${brandCard} p-1 m-4`}>All Products</button>
              </Link>

              <Link href="/search/apple">
                <button className={`${brandCard} p-4 m-4`}>Apple</button>
              </Link>

              <Link href="/search/sony">
                <button className={`${brandCard} p-4 m-4`}>Sony</button>
              </Link>

              <Link href="/search/samsung">
                <button className={`${brandCard} p-1 m-4`}>Samsung</button>
              </Link>

              <Link href="/search/beats">
                <button className={`${brandCard} p-4 m-4`}>Beats</button>
              </Link>

              <Link href="/search/jbl">
                <button className={`${brandCard} p-4 m-4`}>Jbl</button>
              </Link>

              <Link href="/search/bose">
                <button className={`${brandCard} p-4 m-4`}>Bose</button>
              </Link>

              <Link href="/search/google">
                <button className={`${brandCard} p-4 m-4`}>Google</button>
              </Link>

              <Link href="/search/aukey">
                <button className={`${brandCard} p-4 m-4`}>Aukey</button>
              </Link>

              <Link href="/search/jaybird">
                <button className={`${brandCard} p-4 m-4`}>Jaybird</button>
              </Link>

              <Link href="/search/belkin">
                <button className={`${brandCard} p-4 m-4`}>Belkin</button>
              </Link>
            </div>
            <hr className="my-4 border-gray-300" />

            <h2 className="text-lg mt-8">
              By leveraging Next.js’s ability to handle both frontend rendering
              and API routes, this project delivers a smooth, full-stack
              experience with a modern and responsive user interface.The data
              includes price comparisons from popular retailers such as eBay,
              BackMarket, Argos, John Lewis, and Currys. Data is stored in an
              SQL database on a Digital Ocean droplet and may not always be up
              to date since the source websites frequently modify their product
              listings.
            </h2>
            <h2 className="text-lg mt-2">
              Explore the next.js code here:{" "}
              <a
                target="__blank"
                className="underline text-blue-500 hover:text-black"
                href="https://github.com/kulklex/Price-comparison-Website/"
              >
                Nextjs Code.
              </a>
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
