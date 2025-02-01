"use client";

import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  const brandCard =
    "h-16 w-24 border rounded hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-500";

  return (
    <div>
      <section className="justify-center items-center py-2 mx-10 mt-4 p-4">
        <div className="relative grid pt-2">
          <div className="px-4 m-4 text-gray-800">
            <h2 className="text-lg">
              This project, inspired by Pricerunner, was developed as coursework
              to showcase expertise in Enterprise Java, Multithreading, and
              Spring Framework. It features an implementation of web
              scraping using Selenium and Java, with data securely stored in an
              SQL database. The backend is powered by a REST API built with
              Express.js, seamlessly integrated with a modern Next.js frontend.
            </h2>
            <h2 className="text-lg mt-2">
              Explore the web scraping code here:{" "}
              <a
                target="__blank"
                className="underline text-blue-500 hover:text-black"
                href="https://github.com/kulklex/Price-Comparison-Website-Web-Scrapping-Code/"
              >
                Java Webscraping Code.
              </a>
            </h2>
            <h2 className="text-lg mt-8">
              The data includes price comparisons from popular retailers
              such as eBay, BackMarket, Argos, John Lewis, and Currys. The
              project demonstrates how Next.js effectively manages both
              Express.js and React.js.
            </h2>
            <h2 className="text-lg mt-2">
              Explore the next.js code here:{" "}
              <a
            target="__blank"
                className="underline text-blue-500 hover:text-black"
                href="https://github.com/kulklex/Price-comparison-Website/"
              >
                Nextjs Frontend and Backend Code.
              </a>
            </h2>
            <h2 className="text-lg mt-8">
              Test out the features by making a simple search or clicking any of these popular brands below!
            </h2>
            <div className="pt-2">
              <div className="grid sm:grid-cols-2 md:grid-cols-8 justify-center items-center text-lg pb-2">
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/apple">Apple</Link>
                </button>
                <button className={`${brandCard} p-2 m-4`}>
                  <Link href="/search/samsung">Samsung</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/sony">Sony</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/beats">Beats</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/jbl">Jbl</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/bose">Bose</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/google">Google</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/aukey">Aukey</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/jaybird">Jaybird</Link>
                </button>
                <button className={`${brandCard} p-4 m-4`}>
                  <Link href="/search/belkin">Belkin</Link>
                </button>
              </div>
            </div>

            <Image
              src="/people.jpg"
              alt="banner"
              className="md:w-[100%] md:h-[50%] mt-4"
              width={750}
              height={400}
              priority={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
