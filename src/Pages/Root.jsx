import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <>
      
      

     
      <div className="flex flex-col min-h-screen">
     <Navbar></Navbar>
      <main className="flex-grow bg-white">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
    </>
  );
};

export default Root;
