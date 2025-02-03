"use client";

import SearchCard from "../../components/SearchCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/product`, {
          params: { page: currentPage, pageSize },
        });

        setProducts(res.data.data);
        setTotalProducts(res.data.totalCount);
      } catch (error) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage]);

  // Pagination handlers
  const totalPages = Math.ceil(totalProducts / pageSize);
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full">
      <h1 className="flex justify-center items-center text-center p-3 pt-2 font-bold text-2xl">
        {loading ? "Fetching products..." : "All Products"}
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

      {/* Show Products */}
      {!loading && !error && products.length > 0 && (
        <div>
          <p className="text-center text-gray-600">
            Showing {products.length} of {totalProducts} products
          </p>
          {products.map((product) => (
            <SearchCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      )}

      {/* No Products Found */}
      {!loading && !error && products.length === 0 && (
        <div className="w-full flex justify-center items-center text-center py-8 font-bold">
          No products available
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalProducts > pageSize && (
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
