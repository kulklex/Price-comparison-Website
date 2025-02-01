"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductItem({ params }) {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data based on the product ID
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/compare/${params.id}`);
        const data = res.data;

        setProduct(data?.product[0]);
        setComparison(data?.comparison);
      } catch (error) {
        setError("Failed to fetch product data. Please try again.");
        console.error("Error Fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  return (
    <div className="p-4 m-4 block md:flex justify-center rounded-lg">
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

      {/* Show Product Details */}
      {!loading && !error && product && (
        <>
          <Image
            src={product?.image_url}
            alt="product-img"
            className="p-1 m-1 rounded-lg"
            width={500}
            height={400}
          />

          <div className="p-4 m-4">
            <h1 className="text-2xl">{product?.name}</h1>
            <p className="pt-4 text-base">
              <span className="italic">Brand:</span> {product?.brand}
            </p>

            {/* Show Comparison Data */}
            <div className="py-4">
              <h1 className="text-2xl pt-12 px-1">Available on</h1>
              {comparison.length > 0 ? (
                comparison.map((data) => (
                  <div
                    key={data?.id}
                    className="flex justify-between items-center px-4 py-2 border shadow my-4"
                  >
                    <div>
                      <h1 className="text-xl m-2 p-2">{data?.name}</h1>
                      <h1 className="mx-2 px-2">Price: &#163;{data?.price}</h1>
                    </div>

                    <button
                      className="border m-4 p-4 rounded-lg bg-blue-400 text-white"
                      onClick={() => router.push(data?.url)}
                    >
                      Visit Website
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comparisons available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
