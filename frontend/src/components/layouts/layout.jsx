import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollProgressBar from "../ScrollProgressBar/ScrollProgressBar";

const Layout = () => {
  const location = useLocation();

  const hiddenPaths = [
    "/login",
    "/loginValidation",
    "/forgotPassOne",
    "/forgotPassTwo",
    "/registerStepOne",
    "/registerStepTwo",
    "/registerStepThree",
    "/userPanel",
  ];

  const hide = hiddenPaths.some((path) => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen">
      {!hide && <ScrollProgressBar />}
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
