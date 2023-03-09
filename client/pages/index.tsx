import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>General-Purpose Smart Screening Checklist System</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">We are still in the{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">Developing</span>
          </span>{" "}
         Phase.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
        General-Purpose Smart Screening Checklist System: <br/>Text Mining of The Eletronic Medical Record.
        </h2>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

