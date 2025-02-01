"use client";

import SearchCard from "../../../components/SearchCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page({ params }) {
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `/api/pagination?q=${encodeURIComponent(params.searchTerm)}&page=${currentPage}&pageSize=${pageSize}`
        );
        
        setSearchResults(res.data.data);
        setTotalResults(res.data.totalCount);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.searchTerm, currentPage]);

  // Pagination handlers
  const totalPages = Math.ceil(totalResults / pageSize);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full">
      <h1 className="flex justify-center items-center text-center p-3 pt-2 font-bold text-2xl">
        {loading ? "Fetching results..." : `Results for "${params.searchTerm}"`}
      </h1>

      {/* Show Loader */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></span>
        </div>
      )}

      {/* Show Error */}
      {error && (
        <div className="flex justify-center items-center text-red-500 py-4">
          {error}
        </div>
      )}

      {/* Show Results */}
      {!loading && !error && searchResults.length > 0 && (
        <div>
          <p className="text-center text-gray-600">
            Showing {searchResults.length} of {totalResults} results
          </p>
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
      )}

      {/* No Results Found */}
      {!loading && !error && searchResults.length === 0 && (
        <div className="w-full flex justify-center items-center text-center py-8 font-bold">
          No results found for "{params.searchTerm}"
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalResults > pageSize && (
        <div className="flex justify-center items-center space-x-4 py-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
