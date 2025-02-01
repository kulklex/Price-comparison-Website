"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductItem({ params }) {
  //nextjs router
  const router = useRouter();

  // States for product and comparison data
  const [product, setProduct] = useState();
  const [comparison, setComparison] = useState();

  // Fetch data based on the product ID
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/compare/${params.id}`
        );
        const data = await res.data;
        setProduct(data?.product[0]);
        setComparison(data?.comparison);
      } catch (error) {
        // Handle the error (show an error message)
        console.error("Error Fetching data", error);
      }
    }

    fetchData();
  }, [params.id]);

  return (
    <div>
      <div className="p-4 m-4 block md:flex justify-center rounded-lg">
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

          <div className="py-4">
            <h1 className="text-2xl pt-12 px-1">Available on</h1>
            <div>
              {comparison?.map((data) => (
                <div
                  key={data?.id}
                  className="flex justify-between items-center px-4 py-2 border shadow my-4"
                >
                  <div className="">
                    <h1 className="text-xl m-2 p-2 ">{data?.name}</h1>
                    <h1 className="mx-2 px-2">Price: &#163;{data?.price}</h1>
                  </div>

                  <button
                    className="border m-4 p-4 rounded-lg bg-blue-400 text-white"
                    onClick={() => {
                      router.push(data?.url);
                    }}
                  >
                    Visit Website
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
