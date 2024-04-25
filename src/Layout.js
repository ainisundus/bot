import React from "react";
import { Outlet } from 'react-router-dom';
import Footer from './components/Navigasi/Footer';
import Header from "./components/Navigasi/Header";

const Layout = () =>{
  return(
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
};

export default Layout;
