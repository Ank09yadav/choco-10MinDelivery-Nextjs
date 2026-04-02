"use client"

import About from "./_components/about";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import Products from "./_components/product";
import SpecialProducts from "./_components/specialProducts";


export default function Home() {
  return (
    <>
     <Header/>
     <Hero/>
     <Products/>
     <SpecialProducts/>
     <About/>
     <Footer/>

    </>
  );
}
