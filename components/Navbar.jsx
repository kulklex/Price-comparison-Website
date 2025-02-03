"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  //State for searchTerm data
  const [searchTerm, setSearchTerm] = useState("");

  //nextjs router
  const router = useRouter();


  //Function to handle the search 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //Redirecting to the search page to view the search results
      router.push(`/search/${searchTerm}`);
    } catch (error) {
      // Handle the error (show an error message)
      console.error("Error during search", error);
    }
  };

  //Function to make sure handleSubmit() is called after user presses 'Enter' key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="block md:flex justify-around items-center px-8 py-2 mt-4 border-b">
      <div id="nav" className="px-2 space-x-8 hidden md:block text-light">
        <Link href="/product" className="text-sm md:text-lg bold">
          Products
        </Link>
        <Link target="__blank" href="https://github.com/kulklex/Price-comparison-Website-FrontEnd/blob/main/Report%20(Price-Comparison%20Website).pdf" className="text-sm md:text-lg bold">
          Project Report
        </Link>
      </div>

      <Link href="/" className="bold text-2xl flex justify-around items-center my-2">
        BudSpot
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md border border-gray-200 bg-white py-4 font-satoshi pl-5 pr-12 text-sm font-medium focus:border-blue focus:outline-none focus:ring-0"
        />
      </form>
    </div>
  );
}
