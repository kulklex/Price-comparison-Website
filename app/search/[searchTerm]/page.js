"use client";

import SearchCard from "../../../components/SearchCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function page({ params }) {
  const [searchResults, setSearchResults] = useState("");

   // Fetch data based on the searchTerm provided
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/search?q=${encodeURIComponent(
            params.searchTerm
          )}&numitems=20&offset=0`
        );
        const data = await res.data;
        const count = data.results.count;

        // Set the search results inside a state
        setSearchResults(data.results.data);
      } catch (error) {
        // Handle the error (show an error message)
        console.error("Error Fetching data", error);
      }
    }

    fetchData();
  }, [params.searchTerm]);

  if (searchResults.length) {
    return (
      <div className="w-full">
        <h1 className="flex justify-center items-center text-center p-3 pt-2 bold text-2xl">
          Here are the results for "{params.searchTerm}"
        </h1>
        <div>
          {searchResults.map((data) => (
            <SearchCard
              key={data?.id}
              id={data?.id}
              name={data?.name}
              brand={data?.brand}
              imageUrl={data?.image_url}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className="w-full">
        <h1 className="flex justify-center items-center text-center py-8 bold">
          No Result for "{params.searchTerm}"
        </h1>
      </div>
    );
  }
}
